export default function DashboardPage() {
  const stats = [
    { label: "Listings Analysed", value: "500+", icon: "🏠" },
    { label: "Indian Cities Covered", value: "40+", icon: "📍" },
    { label: "Model Accuracy", value: "87%", icon: "🎯" },
    { label: "Predictions Made", value: "1,200+", icon: "✨" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">AirEstimate</span>
          </a>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <a href="/predict" className="hover:text-gray-900">Predict</a>
            <a href="/dashboard" className="text-pink-500 font-semibold">Dashboard</a>
            <a href="/about" className="hover:text-gray-900">About</a>
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Why Trust AirEstimate?</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Here is exactly how our model works.</p>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to get your price?</h2>
          <a href="/predict" className="inline-block bg-white text-pink-600 font-bold px-8 py-3 rounded-full">Try the Predictor</a>
        </div>
      </div>
    </div>
  );
}
