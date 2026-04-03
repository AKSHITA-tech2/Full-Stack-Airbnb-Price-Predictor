import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  location: string;
  guests: number;
  roomType: string;
}

interface PredictionResult {
  price: number;
  confidence: number;
  analysis: string;
  roi: number;
  occupancy: number;
  neighborhood_stats: {
    avg_price: number;
    median_price: number;
    avg_rating: number;
  };
}

// Indian city coordinates lookup
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'mumbai':    { lat: 19.0760, lng: 72.8777 },
  'delhi':     { lat: 28.6139, lng: 77.2090 },
  'bangalore': { lat: 12.9716, lng: 77.5946 },
  'bengaluru': { lat: 12.9716, lng: 77.5946 },
  'goa':       { lat: 15.2993, lng: 74.1240 },
  'jaipur':    { lat: 26.9124, lng: 75.7873 },
  'chennai':   { lat: 13.0827, lng: 80.2707 },
  'kolkata':   { lat: 22.5726, lng: 88.3639 },
  'hyderabad': { lat: 17.3850, lng: 78.4867 },
  'pune':      { lat: 18.5204, lng: 73.8567 },
  'manali':    { lat: 32.2396, lng: 77.1887 },
  'shimla':    { lat: 31.1048, lng: 77.1734 },
  'agra':      { lat: 27.1767, lng: 78.0081 },
  'udaipur':   { lat: 24.5854, lng: 73.7125 },
  'kerala':    { lat: 10.8505, lng: 76.2711 },
  'mysore':    { lat: 12.2958, lng: 76.6394 },
  'mysuru':    { lat: 12.2958, lng: 76.6394 },
  'varanasi':  { lat: 25.3176, lng: 82.9739 },
  'rishikesh': { lat: 30.0869, lng: 78.2676 },
  'ooty':      { lat: 11.4102, lng: 76.6950 },
};

function getCoordsFromLocation(location: string): { lat: number; lng: number } {
  const lower = location.toLowerCase();
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    if (lower.includes(city)) return coords;
  }
  // Default to India center if not found
  return { lat: 20.5937, lng: 78.9629 };
}

export default function PredictPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [form, setForm] = useState({
    location: state?.location || '',
    guests: state?.guests || 2,
    roomType: state?.roomType || 'entire-home',
    stars: 4.5,
    is_superhost: false,
    amenities: [] as string[],
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const AMENITIES_LIST = [
    'WiFi', 'Air conditioning', 'Kitchen', 'Parking', 'Pool',
    'Hot tub', 'Gym', 'TV', 'Washer', 'Dryer',
    'Heating', 'Workspace', 'Elevator', 'Balcony', 'Garden',
  ];

  const toggleAmenity = (a: string) => {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter(x => x !== a)
        : [...f.amenities, a],
    }));
  };

  const handlePredict = async () => {
    if (!form.location.trim()) {
      setError('Please enter a location.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    const { lat, lng } = getCoordsFromLocation(form.location);

    try {
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          room_type: form.roomType,
          accommodates: form.guests,
          rating: form.stars,
          is_superhost: form.is_superhost,
          amenities: form.amenities,
          city: form.location,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(`Failed to get prediction: ${err.message}. Make sure the Flask server is running.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">AirEstimate</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <a href="/predict" className="text-pink-500 font-semibold">Predict</a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Price Predictor</h1>
        <p className="text-gray-500 mb-10">Fill in your property details to get an AI-powered price estimate.</p>

        <div className="grid grid-cols-2 gap-8">
          {/* ── Form ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="e.g. Goa, Mumbai, Manali..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-300"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </div>

            {/* Room type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type</label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-300"
                value={form.roomType}
                onChange={e => setForm({ ...form, roomType: e.target.value })}
              >
                <option value="entire home/apt">Entire home / apt</option>
                <option value="entire home">Entire home</option>
                <option value="entire condo">Entire condo</option>
                <option value="entire villa">Entire villa</option>
                <option value="private room in home">Private room in home</option>
                <option value="private room in resort">Private room in resort</option>
                <option value="room in hotel">Room in hotel</option>
                <option value="room in boutique hotel">Room in boutique hotel</option>
                <option value="shared room in rental unit">Shared room</option>
                <option value="farm stay">Farm stay</option>
                <option value="houseboat">Houseboat</option>
                <option value="treehouse">Treehouse</option>
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Guests: <span className="text-pink-500">{form.guests}</span>
              </label>
              <input
                type="range" min="1" max="10"
                value={form.guests}
                onChange={e => setForm({ ...form, guests: parseInt(e.target.value) })}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1</span><span>10</span></div>
            </div>

            {/* Stars */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Star Rating: <span className="text-pink-500">{form.stars}★</span>
              </label>
              <input
                type="range" min="1" max="5" step="0.1"
                value={form.stars}
                onChange={e => setForm({ ...form, stars: parseFloat(e.target.value) })}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1★</span><span>5★</span></div>
            </div>

            {/* Superhost */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="superhost"
                checked={form.is_superhost}
                onChange={e => setForm({ ...form, is_superhost: e.target.checked })}
                className="w-4 h-4 accent-pink-500"
              />
              <label htmlFor="superhost" className="text-sm font-semibold text-gray-700">I am a Superhost</label>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Amenities <span className="text-gray-400 font-normal">({form.amenities.length} selected)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES_LIST.map(a => (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      form.amenities.includes(a)
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow disabled:opacity-60"
            >
              {loading ? 'Predicting...' : '✨ Get Price Prediction'}
            </button>
          </div>

          {/* ── Result ── */}
          <div className="space-y-4">
            {!result && !loading && (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-400">
                <div className="text-5xl mb-4">🏠</div>
                <p className="font-medium">Fill in your details and click predict to see your estimated nightly price.</p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Analysing nearby listings...</p>
              </div>
            )}

            {result && (
              <>
                {/* Main price card */}
                <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-8 text-white">
                  <div className="text-sm font-medium opacity-80 mb-1">Estimated Nightly Price</div>
                  <div className="text-6xl font-bold mb-1">₹{result.price.toLocaleString()}</div>
                  <div className="text-sm opacity-80">per night · {result.confidence}% confidence</div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">₹{result.neighborhood_stats.avg_price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 mt-1">Area Avg Price</div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.occupancy}%</div>
                    <div className="text-xs text-gray-500 mt-1">Est. Occupancy</div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{result.roi}%</div>
                    <div className="text-xs text-gray-500 mt-1">Annual ROI</div>
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">📊 Analysis</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{result.analysis}</p>
                </div>

                {/* Neighbourhood stats */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">🏘️ Neighbourhood Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Average price</span>
                      <span className="font-semibold">₹{result.neighborhood_stats.avg_price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Median price</span>
                      <span className="font-semibold">₹{result.neighborhood_stats.median_price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Average rating</span>
                      <span className="font-semibold">{result.neighborhood_stats.avg_rating}★</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}