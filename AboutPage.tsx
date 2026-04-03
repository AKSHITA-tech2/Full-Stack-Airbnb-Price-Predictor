export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">AirEstimate</span>
          </a>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <a href="/predict" className="hover:text-gray-900">Predict</a>
            <a href="/dashboard" className="hover:text-gray-900">Dashboard</a>
            <a href="/about" className="text-pink-500 font-semibold">About</a>
          </div>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-block bg-pink-100 text-pink-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">About the Project</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Built for Indian Hosts</h1>
          <p className="text-xl text-gray-500 leading-relaxed">AirEstimate is an AI-powered Airbnb price prediction tool built as a research project by an AI/ML undergraduate at VIT Chennai.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem We are Solving</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Most Airbnb pricing tools are built on US or European data. Indian hosts are left guessing.</p>
          <p className="text-gray-600 leading-relaxed">AirEstimate uses a dataset of 500+ verified Indian Airbnb listings across 40+ cities.</p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-10 text-white mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">👩‍💻</div>
            <div>
              <div className="text-white/70 text-sm font-medium mb-1">Built by</div>
              <h3 className="text-2xl font-bold mb-1">Akshita Raghavan</h3>
              <p className="text-white/80 text-sm">B.Tech AI/ML · VIT Chennai · Student ID: 24BAI1043</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 text-center">
          <p className="text-yellow-800 text-sm">AirEstimate is a research project and should be used as a starting reference only.</p>
        </div>
      </div>
    </div>
  );
}
