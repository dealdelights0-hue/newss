import React from 'react';

interface LiveTVPageProps {
  onGoHome: () => void;
}

const LiveTVPage: React.FC<LiveTVPageProps> = ({ onGoHome }) => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Live TV</h1>
            <button
            onClick={onGoHome}
            className="px-4 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
            &larr; Back to Home
            </button>
        </div>

        {/* Video Player Placeholder */}
        <div className="relative w-full rounded-lg shadow-lg overflow-hidden" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    <p className="text-xl font-semibold">Live TV Feed</p>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-red-500 text-sm font-bold uppercase">LIVE</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Up Next</h2>
            <p className="text-gray-600">Join us for "Global Insights" at the top of the hour, followed by "Market Movers".</p>
        </div>
      </div>
    </div>
  );
};

export default LiveTVPage;
