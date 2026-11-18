var hero1 = 'src/assets/hero/hero1.webp';
var hero2 = 'src/assets/hero/hero2.webp';
const hero3 = 'src/assets/hero/hero3.webp';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const { openModal } = useRegistration();

  const slides = [
    {
      image: hero1,
      title: "Young minds,",
      subtitle: "Local Ideas",
      highlight: "Global Market",
      description: "India's premier youth innovation challenge in STEM",
      align: "left"
    },
    {
      image: hero2,
      title: "Design. Build.",
      subtitle: "Innovate.",
      highlight: "Share.",
      description: "Join thousands of students building products for India's tech sovereignty",
      align: "left"
    },
    {
      image: hero3,
      title: "Think Local,",
      subtitle: "Create National",
      highlight: "Impact Global",
      description: "Developing indigenous technology to lead the world from the heart of India.",
      align: "left"
    }
  ];

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  React.useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused, prefersReducedMotion]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      aria-label="STEM Innovation Hero Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {slides.map((slide, index) => (
          <div
            key={index}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image}
              alt=""
              role="presentation"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              width="1376"
              height="768"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-6xl mx-auto h-full flex items-center">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={index}
                  aria-hidden={!isActive}
                  inert={!isActive ? "" : undefined}
                  className={`absolute w-full transition-all duration-1000 ease-in-out ${isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-10 pointer-events-none"
                    } ${slide.align === "left" ? "left-0 text-left" : "right-0 text-right"}`}
                >
                  <div
                    className={`max-w-2xl ${slide.align === "left" ? "pl-4 sm:pl-8 lg:pl-16" : "pr-4 sm:pr-8 lg:pr-16"
                      }`}
                  >
                    <div
                      className="animate-fade-in-up"
                      style={{
                        animation:
                          isActive
                            ? "fadeInUp 0.8s ease-out 0.1s forwards"
                            : "none",
                        opacity: isActive ? 1 : 0
                      }}
                    >
                      {isActive ? (
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-2 drop-shadow-lg">
                          {slide.title}
                        </h1>
                      ) : (
                        <p className="text-3xl sm:text-5xl lg:text-7xl font-heading font-bold text-white leading-tight mb-2 drop-shadow-lg">
                          {slide.title}
                        </p>
                      )}
                      <p className="text-2xl sm:text-4xl lg:text-6xl font-heading font-bold text-[#F7941E] leading-tight mb-2 drop-shadow-lg">
                        {slide.subtitle}
                      </p>
                      <p className="text-2xl sm:text-4xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-lg">
                        {slide.highlight}
                      </p>
                    </div>

                    <div
                      style={{
                        animation:
                          isActive
                            ? "fadeInUp 0.8s ease-out 0.3s forwards"
                            : "none",
                        opacity: isActive ? 1 : 0
                      }}
                    >
                      <p className="text-base sm:text-lg lg:text-2xl text-white/90 font-body mb-8 leading-relaxed drop-shadow-lg">
                        {slide.description}
                      </p>
                    </div>

                    <div
                      className="flex gap-4 flex-wrap"
                      style={{
                        animation:
                          isActive
                            ? "fadeInUp 0.8s ease-out 0.5s forwards"
                            : "none",
                        opacity: isActive ? 1 : 0
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => openModal("general")}
                        className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 border border-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-6">
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-2">
          <button
            type="button"
            onClick={prevSlide}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isPaused ? "Resume slide rotation" : "Pause slide rotation"}
          >
            {isPaused ? <Icon name="Play" size={20} aria-hidden="true" /> : <Icon name="Pause" size={20} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("about")}
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
        aria-label="Scroll to next section"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </button>

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
      `}</style>
    </section>
  );
};

window.Hero = Hero;
