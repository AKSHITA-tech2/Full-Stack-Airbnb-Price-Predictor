import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    guests: 2,
    roomType: 'entire-home'
  });

  const handleSearch = () => {
    navigate('/predict', { state: searchData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">AirEstimate</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
              <a href="/predict" className="text-gray-700 hover:text-gray-900 font-medium">Predict</a>
              <a href="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">Dashboard</a>
              <a href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
              <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition-shadow">
                List your space
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          Earn more from your Airbnb.
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Use AI-powered insights to predict your property's ideal price and
          maximize your revenue based on neighborhood trends.
        </p>

        {/* Search Form - NOW FUNCTIONAL! */}
        <div className="bg-white rounded-full shadow-xl p-2 max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1 px-6 py-3 border-r border-gray-200">
            <div className="text-xs font-bold text-gray-500 mb-1">LOCATION</div>
            <input
              type="text"
              placeholder="Enter your neighborhood"
              className="w-full text-sm text-gray-900 placeholder-gray-400 outline-none"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex-1 px-6 py-3 border-r border-gray-200">
            <div className="text-xs font-bold text-gray-500 mb-1">GUESTS</div>
            <select
              className="w-full text-sm text-gray-900 outline-none cursor-pointer"
              value={searchData.guests}
              onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
            >
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5+ guests</option>
            </select>
          </div>
          <div className="flex-1 px-6 py-3">
            <div className="text-xs font-bold text-gray-500 mb-1">ROOM TYPE</div>
            <select
              className="w-full text-sm text-gray-900 outline-none cursor-pointer"
              value={searchData.roomType}
              onChange={(e) => setSearchData({ ...searchData, roomType: e.target.value })}
            >
              <option value="entire-home">Entire home/apt</option>
              <option value="private-room">Private room</option>
              <option value="shared-room">Shared room</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why use AirEstimate?</h2>
            <p className="text-xl text-gray-600">
              Our specialized algorithm analyzes over 150,000 local listings to find the
              <br />perfect price for your property.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Maximize Profit</h3>
              <p className="text-gray-600">
                Don't leave money on the table. Our dynamic pricing matches demand spikes for your specific zip code.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">High Occupancy</h3>
              <p className="text-gray-600">
                Find the "sweet spot" price that keeps your calendar full while maintaining a premium rate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deep Insights</h3>
              <p className="text-gray-600">
                Understand exactly how specific amenities like a hot tub or fast Wi-Fi impact your bottom line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-lg font-bold">AirEstimate</span>
              </div>
              <p className="text-gray-400 text-sm">
                Helping hosts navigate the complexity of short-term rental markets through advanced AI modeling.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div>Pricing Predictor</div>
                <div>Market Reports</div>
                <div>API for Developers</div>
                <div>Browser Extension</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div>Hosting Guide</div>
                <div>Profit Calculator</div>
                <div>Case Studies</div>
                <div>FAQ</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div>support@airestimate.ai</div>
                <div>1-800-HOST-AID</div>
                <div>Brooklyn, NY 11201</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex items-center justify-between text-sm text-gray-400">
            <div>© 2024 AirEstimate Inc.</div>
            <div className="flex gap-6">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
