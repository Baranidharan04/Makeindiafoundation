const DNAHelix = ({ color }) => {
  const rungs = 12;
  return (
    <div className="flex flex-col gap-1 items-center perspective-[500px]">
      {[...Array(rungs)].map((_, i) => (
        <div
          key={i}
          className={cn("w-32 h-[1px] relative animate-dna", color)}
          style={{
            animationDelay: `${i * 0.15}s`,
            transformStyle: "preserve-3d"
          }}
        >
          <div className="absolute left-0 w-2 h-2 bg-current rounded-full translate-y-[-0.5px] opacity-60" />
          <div className="absolute right-0 w-2 h-2 bg-current rounded-full translate-y-[-0.5px] opacity-60" />
          <div className="w-full h-full bg-current/20" />
        </div>
      ))}
    </div>
  );
};

const ScienceHeroBackground = ({ variant = "arise" }) => {
  const isArise = variant === "arise";
  const primaryColor = isArise ? "text-blue-400" : "text-emerald-400/60";
  const glowColor = isArise ? "shadow-blue-500/30" : "shadow-emerald-500/30";

  const elements = [
    { Icon: Atom, size: 48, top: "15%", left: "10%", delay: "0s", duration: "12s" },
    { Icon: Settings, size: 56, top: "25%", left: "85%", delay: "1s", duration: "15s", spin: true },
    { Icon: Zap, size: 32, top: "65%", left: "15%", delay: "2s", duration: "10s" },
    { Icon: Lightbulb, size: 40, top: "75%", left: "80%", delay: "3s", duration: "14s" },
    { Icon: Microscope, size: 52, top: "10%", left: "70%", delay: "4s", duration: "18s" },
    { Icon: Cpu, size: 44, top: "80%", left: "25%", delay: "5s", duration: "16s" },
    { Icon: FlaskConical, size: 36, top: "40%", left: "5%", delay: "6s", duration: "13s" },
    { Icon: Dna, size: 48, top: "50%", left: "90%", delay: "7s", duration: "20s" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute top-1/4 left-1/4 opacity-30 scale-75 transform -rotate-12">
        <DNAHelix color={primaryColor} />
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-30 scale-50 transform rotate-45">
        <DNAHelix color={primaryColor} />
      </div>

      {elements.map((el, i) => (
        <div
          key={i}
          className={cn(
            "absolute animate-drift opacity-30 transition-all duration-[3000ms]",
            primaryColor
          )}
          style={{
            top: el.top,
            left: el.left,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        >
          <el.Icon
            size={el.size}
            className={cn(
              "drop-shadow-2xl",
              el.spin && "animate-spin-slow"
            )}
            strokeWidth={1.5}
          />
        </div>
      ))}

      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className={cn("absolute rounded-full w-1 h-1 animate-pulse", isArise ? "bg-blue-400/50" : "bg-emerald-400/50")}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

window.ScienceHeroBackground = ScienceHeroBackground;
