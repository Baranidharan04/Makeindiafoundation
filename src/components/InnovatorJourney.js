const journeySteps = [
  {
    id: 1,
    icon: Lightbulb,
    emoji: "💡",
    title: "Spark an Idea",
    description: "Every innovation begins with curiosity. Identify a real-world problem and think of a creative solution.",
    gradient: "from-amber-400 to-orange-500",
    iconColor: "text-amber-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    sectionBg: "bg-amber-50/50",
    delay: "0s",
    href: "/"
  },
  {
    id: 2,
    icon: Wrench,
    emoji: "🔧",
    title: "MIF STEM Competition",
    description: "Bring your idea to life. Build, experiment, and present your project at MIF's platform.",
    gradient: "from-blue-500 to-cyan-400",
    iconColor: "text-blue-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    sectionBg: "bg-blue-50/50",
    delay: "0.1s",
    href: "/"
  },
  {
    id: 3,
    icon: Trophy,
    emoji: "🏆",
    title: "MIF Winner",
    description: "Stand out among the best. Winning at MIF gives you recognition, confidence, and the next big opportunity.",
    gradient: "from-emerald-400 to-teal-500",
    iconColor: "text-emerald-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    sectionBg: "bg-emerald-50/50",
    delay: "0.2s",
    href: "/"
  },
  {
    id: 4,
    icon: Globe,
    emoji: "🌐",
    title: "Global Stage",
    description: "Take your innovation beyond borders and compete at an international level inspired by Society for Science Competitions.",
    gradient: "from-violet-500 to-fuchsia-500",
    iconColor: "text-violet-500",
    bgGradient: "from-violet-500/10 to-fuchsia-500/10",
    sectionBg: "bg-violet-50/50",
    delay: "0.3s",
    href: "https://www.societyforscience.org/isef/"
  },
  {
    id: 5,
    icon: Award,
    emoji: "🥇",
    title: "Global Recognition",
    description: "Become a global innovator. Showcase your work among the world's best and make a real impact.",
    gradient: "from-rose-400 to-pink-500",
    iconColor: "text-rose-500",
    bgGradient: "from-rose-500/10 to-pink-500/10",
    sectionBg: "bg-rose-50/50",
    delay: "0.4s",
    href: "/"
  }
];

const InnovatorJourney = () => {
  const [hoveredStep, setHoveredStep] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(1);

  const activeSectionBg = hoveredStep
    ? journeySteps.find(s => s.id === hoveredStep)?.sectionBg
    : "bg-white";

  return (
    <section className={`py-20 ${activeSectionBg} text-foreground relative overflow-hidden transition-colors duration-700 ease-in-out`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full translate-y-64 -translate-x-64 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 text-foreground" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>The Innovator's Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            From a spark of curiosity to global recognition — your path to becoming a STEM innovator
          </p>
        </div>

        <div className="max-w-7xl mx-auto mb-20">
          <div className="hidden lg:block relative">
            <svg className="absolute top-32 left-0 w-full h-24 -z-0" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 100 12 Q 300 12, 400 12 T 800 12 T 1200 12 T 1600 12"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
            </svg>

            <div className="grid grid-cols-5 gap-6">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                const isHovered = hoveredStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="relative h-full"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${step.delay} both`
                    }}
                    onMouseEnter={() => {
                      setHoveredStep(step.id);
                      setActiveStep(step.id);
                    }}
                    onMouseLeave={() => { setHoveredStep(null); setActiveStep(null); }}
                  >
                    <div className="flex justify-center mb-8 relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform transition-all duration-500 ${isActive || isHovered ? 'scale-125 rotate-6' : 'scale-100'
                        }`}>
                        <span className="relative z-10">{step.id}</span>
                        {(isActive || isHovered) && (
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl opacity-60 animate-pulse`}></div>
                        )}
                      </div>
                    </div>

                    <Link to={step.href} target="_blank">
                      <Card className={`relative h-[calc(100%-6rem)] p-8 bg-card/75 backdrop-blur-xl border border-border/40 transition-all duration-500 overflow-hidden group ${isActive || isHovered
                        ? `border-primary/50 shadow-2xl -translate-y-4 bg-gradient-to-br ${step.bgGradient}`
                        : 'shadow-lg -translate-y-2'
                        }`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition-opacity duration-500 ${isActive || isHovered ? 'opacity-5' : ''
                          }`}></div>

                        <div className="relative mb-6 flex justify-center">
                          <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} p-0.5 transition-transform duration-500 ${isActive || isHovered ? 'rotate-12 scale-110' : ''
                            }`}>
                            <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                              <Icon className={`w-10 h-10 bg-gradient-to-br ${step.gradient} bg-clip-text`} strokeWidth={2} />
                            </div>
                          </div>
                        </div>

                        <div className="relative text-center">
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {step.title}
                          </h3>
                          <p className={`text-sm leading-relaxed text-justify transition-colors duration-300 ${isActive || isHovered ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                            {step.description}
                          </p>
                        </div>

                        {(isActive || isHovered) && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                        )}
                      </Card>
                    </Link>

                    {index < journeySteps.length - 1 && (
                      <div className="absolute top-8 -right-3 z-20">
                        <ArrowRight className={`w-6 h-6 transition-all duration-300 ${isActive || isHovered
                          ? `text-transparent bg-clip-text bg-gradient-to-r ${step.gradient} scale-125`
                          : 'text-slate-300'
                          }`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden space-y-8">
            {journeySteps.map((step) => {
              const Icon = step.icon;
              const isHovered = hoveredStep === step.id;

              return (
                <div
                  key={step.id}
                  className="relative"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${step.delay} both`
                  }}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <Card className={`relative p-5 sm:p-8 bg-card/75 backdrop-blur-xl border border-border/40 transition-all duration-500 overflow-hidden ${isHovered
                    ? `border-primary/50 shadow-2xl bg-gradient-to-br ${step.bgGradient}`
                    : 'shadow-lg'
                    }`}>
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-xl transition-transform duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                        {step.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-11 h-11 flex-shrink-0 rounded-2xl bg-white border border-border/40 flex items-center justify-center shadow-sm ${isHovered ? 'rotate-6' : ''}`}>
                            <Icon className={`w-6 h-6 ${step.iconColor}`} strokeWidth={2} />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

window.InnovatorJourney = InnovatorJourney;
