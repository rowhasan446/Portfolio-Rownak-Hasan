export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Animated Letter R */}
      <div className="relative">
        {/* Main R Letter */}
        <div className="text-9xl font-bold text-white animate-pulse-slow">
          <span className="inline-block animate-glitch">R</span>
        </div>
        
        {/* Glowing Ring Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-4 border-blue-500 rounded-full animate-spin-slow opacity-50"></div>
        </div>
        
        {/* Orbiting Particles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-orbit"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-orbit-reverse"></div>
        </div>
        
        {/* Loading Text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm tracking-widest">
          <span className="inline-block animate-fade">LOADING</span>
          <span className="inline-block animate-bounce ml-1">.</span>
          <span className="inline-block animate-bounce animation-delay-200 ml-1">.</span>
          <span className="inline-block animate-bounce animation-delay-400 ml-1">.</span>
        </div>
      </div>
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan"></div>
    </div>
  );
}
