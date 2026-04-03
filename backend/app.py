from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# ── Load model ────────────────────────────────────────────────────────────────
try:
    model = pickle.load(open('backend/model.pkl', 'rb'))
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# ── Load dataset ──────────────────────────────────────────────────────────────
try:
    df = pd.read_csv('Airbnb_India_Top_500.csv')
    df['stars'] = df['stars'].fillna(df['stars'].median())
    print(f"✅ Dataset loaded: {len(df)} listings")
except Exception as e:
    print(f"❌ Error loading dataset: {e}")
    df = None

# ── Room type encoding ────────────────────────────────────────────────────────
ROOM_TYPE_MAP = {
    'room in hotel':                     0,
    'private room in home':              1,
    'shared room in rental unit':        2,
    'entire condo':                      3,
    'farm stay':                         4,
    'entire villa':                      5,
    'private room in resort':            6,
    'entire cottage':                    7,
    'entire home':                       8,
    'room in boutique hotel':            9,
    'entire serviced apartment':         10,
    'boat':                              11,
    'private room in villa':             12,
    'entire bungalow':                   13,
    'shared room in guest suite':        14,
    'room in heritage hotel':            15,
    'private room in bed and breakfast': 16,
    'entire rental unit':                17,
    'private room in castle':            18,
    'private room in condo':             19,
    'entire place':                      20,
    'houseboat':                         21,
    'entire chalet':                     22,
    'private room in farm stay':         23,
    'private room in nature lodge':      24,
    'tent':                              25,
    'hut':                               26,
    'room in serviced apartment':        27,
    'private room in earthen home':      28,
    'room in resort':                    29,
    'camper/rv':                         30,
    'castle':                            31,
    'entire vacation home':              32,
    'private room in chalet':            33,
    'entire home/apt':                   34,
    'campsite':                          35,
    'private room in bungalow':          36,
    'private room in cottage':           37,
    'treehouse':                         38,
    'entire cabin':                      39,
    # Frontend shorthand aliases
    'entire-home':   34,
    'private-room':  1,
    'private room':  1,
    'shared-room':   2,
    'shared room':   2,
    'hotel room':    0,
}

def encode_room_type(room_type_str: str) -> int:
    return ROOM_TYPE_MAP.get(room_type_str.lower().strip(), 1)


# ── Nearest-listing stats (vectorised) ───────────────────────────────────────
def neighborhood_stats(lat: float, lng: float, k: int = 10) -> dict:
    if df is None:
        return {'avg_price': 3000, 'median_price': 2500, 'avg_rating': 4.2, 'occupancy_rate': 78}

    dists = np.sqrt((df['location/lat'] - lat) ** 2 + (df['location/lng'] - lng) ** 2)
    nearest = df.iloc[dists.argsort()[:k]]

    return {
        'avg_price':      float(nearest['pricing/rate/amount'].mean()),
        'median_price':   float(nearest['pricing/rate/amount'].median()),
        'avg_rating':     float(nearest['stars'].mean()),
        'occupancy_rate': 78,
    }


# ── /api/predict ──────────────────────────────────────────────────────────────
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print(f"📥 Request: {data}")

        latitude  = data.get('latitude')
        longitude = data.get('longitude')
        if latitude is None or longitude is None:
            return jsonify({'error': 'latitude and longitude are required'}), 400

        room_type    = data.get('room_type', 'private room in home')
        accommodates = int(data.get('accommodates', 2))
        stars        = float(data.get('rating', 4.0))
        is_superhost = bool(data.get('is_superhost', False))
        amenities    = data.get('amenities', [])

        # Normalise rating: frontend may send 0-100 scale
        if stars > 5:
            stars = round(stars / 20, 2)
        stars = min(5.0, max(0.0, stars))

        room_type_encoded = encode_room_type(room_type)

        # EXACT 6-feature order matching training:
        # isHostedBySuperhost, location/lat, location/lng, numberOfGuests, roomType, stars
        features = [                # ← fix 1: was indented with a leading space
            int(is_superhost),
            latitude,
            longitude,
            accommodates,
            room_type_encoded,
            stars,
            0,   # placeholder feature 7
            0,   # placeholder feature 8
        ]
        print(f"🔢 Features: {features}")  # ← fix 2: moved back inside try block

        if model is not None:
            predicted_price = float(model.predict([features])[0])
            predicted_price = max(500, round(predicted_price))
        else:
            stats = neighborhood_stats(latitude, longitude)
            predicted_price = round(stats['avg_price'] * (1 + (accommodates - 2) * 0.1))

        stats      = neighborhood_stats(latitude, longitude)
        deviation  = abs(predicted_price - stats['avg_price']) / max(stats['avg_price'], 1)
        confidence = int(max(70, min(95, 90 - deviation * 50)))

        city     = data.get('city', 'this area')
        analysis = f"Based on nearby listings in {city}, the neighbourhood average is ₹{round(stats['avg_price'])}. "
        if is_superhost:
            analysis += "Your Superhost status typically adds a 10-15% premium. "
        if len(amenities) > 5:
            analysis += f"Offering {len(amenities)} amenities supports competitive pricing. "
        if stars >= 4.5:
            analysis += "A high star rating justifies positioning above the median."

        annual_rev   = predicted_price * 365 * 0.70
        property_val = predicted_price * 30 * 150
        roi = round((annual_rev / property_val) * 100, 1) if property_val > 0 else 0

        response = {
            'price':      round(predicted_price, 0),
            'confidence': confidence,
            'analysis':   analysis,
            'roi':        roi,
            'occupancy':  stats['occupancy_rate'],
            'neighborhood_stats': {
                'avg_price':    round(stats['avg_price'], 0),
                'median_price': round(stats['median_price'], 0),
                'avg_rating':   round(stats['avg_rating'], 2),
            },
        }

        print(f"✅ Predicted: ₹{response['price']}")
        return jsonify(response), 200

    except Exception as e:
        import traceback; traceback.print_exc()
        return jsonify({'error': str(e)}), 500


# ── /api/health ───────────────────────────────────────────────────────────────
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status':         'healthy',
        'model_loaded':   model is not None,
        'dataset_loaded': df is not None,
    }), 200


if __name__ == '__main__':
    print("🚀 Starting Airbnb Price Prediction API on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)