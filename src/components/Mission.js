const experimentImg = 'src/assets/awesome_cool_science_experiments_for_kids.webp';
var fewoImg = 'src/assets/technology.jpg';
const technologyImg = 'src/assets/technology.jpg';
const engineerImg = 'src/assets/engineering.jpg';
const teamPhoto = 'src/assets/team-photo.jpg';

const Mission = () => {
  const [activeCard, setActiveCard] = React.useState(0);

  const STEM_CARDS = [
    {
      title: "Science",
      description: "Experiment safely with data-backed inquiry and real-world scientific thinking.",
      detail: "Science is the foundation for observation, hypothesis, and experimentation—forming the basis for engineering solutions.",
      image: experimentImg,
      theme: "from-indigo-500 via-blue-500 to-cyan-500"
    },
    {
      title: "Technology",
      description: "Build digital platforms, software tools and devices that solve modern challenges.",
      detail: "Technology empowers students to design smart systems, functional prototypes, and secure electronics for India-first products.",
      image: technologyImg,
      theme: "from-slate-800 via-indigo-700 to-cyan-700"
    },
    {
      title: "Engineering",
      description: "Design, test and iterate solutions with hardware, mechanics and systems thinking.",
      detail: "Engineering combines physics, math, and creativity to build robust mechanisms and scalable innovations.",
      image: engineerImg,
      theme: "from-green-600 via-emerald-500 to-cyan-400"
    },
    {
      title: "Mathematics",
      description: "Visualise data, model problems, and use algorithms to solve complex challenges.",
      detail: "Mathematics gives students precision, logic, and computational power to back every STEM project.",
      image: teamPhoto,
      theme: "from-teal-600 via-sky-500 to-indigo-500"
    }
  ];

  return (
    <section className="py-20 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>At MIF STEM Ignites</h2>
          <p className="text-lg text-muted-foreground mx-auto max-w-3xl">
            We inspire the next generation to explore, experiment, and build ideas <br className="hidden sm:inline" />that can change the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.6fr] gap-8">
          <div className="space-y-4">
            {STEM_CARDS.map((card, index) => (
              <button
                key={card.title}
                onMouseEnter={() => setActiveCard(index)}
                onFocus={() => setActiveCard(index)}
                className={`w-full text-left rounded-3xl p-6 border border-border/60 transition-all duration-300 overflow-hidden group relative ${activeCard === index ? "-translate-x-2 shadow-2xl border-primary/70" : "hover:-translate-x-1 hover:shadow-lg"
                  }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.theme} opacity-20 blur-2xl transition-all duration-500 ${activeCard === index ? "opacity-100" : "opacity-0"
                    }`}
                />
                <div className="relative z-10 flex items-center gap-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`w-16 h-16 rounded-xl object-cover transition-transform duration-500 ${activeCard === index ? "scale-110" : "scale-100"
                      }`}
                  />
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-3xl overflow-hidden border border-border/50 bg-background shadow-lg">
            <div className="relative flex items-center justify-center h-96 overflow-hidden">
              <img
                src={STEM_CARDS[activeCard].image}
                alt={STEM_CARDS[activeCard].title}
                className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-3xl font-bold">{STEM_CARDS[activeCard].title}</h3>
                  <p className="text-sm">{STEM_CARDS[activeCard].detail}</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-semibold text-foreground mb-4">Why it matters</h4>
              <p className="text-muted-foreground leading-relaxed">
                {STEM_CARDS[activeCard].detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Mission = Mission;
