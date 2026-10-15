
const makersSpaceHero = 'src/assets/hero/makerhero.png';
var workshopHero = 'src/assets/hero/hero_2.png';
var hero1 = 'src/assets/hero/hero1.png';
const buildingImg = 'src/assets/competitions/building.jpg';
const droneImg = 'src/assets/competitions/drone.jpg';

const MakersSpacePage = () => {
  const openComingSoon = () => {
    window.sessionStorage.setItem("comingSoonReturnPath", "/makers-space");
    window.location.hash = "/coming-soon";
  };


  const focusAreas = [
    { icon: Lightbulb, text: "Core Focus Areas" },
    { icon: Zap, text: "Rapid Prototyping (3D Printing, Laser Cutting)" },
    { icon: CircuitBoard, text: "Electronics & IoT Development (PCBs, Microcontrollers)" },
    { icon: Wrench, text: "Mechanical Assembly & Workshop Tools" },
    { icon: Rocket, text: "Mentorship for Product Development" }
  ];

  const makerSteps = [
    { icon: Lightbulb, title: "Submit Your Idea", desc: "Submit your ideas to us and choose your prototyping direction." },
    { icon: GraduationCap, title: "Visit the Lab", desc: "Join the lab orientation and understand safety and tools." },
    { icon: Blocks, title: "Access & Prototype", desc: "Access prototyping equipment and develop your first iteration." },
    { icon: Rocket, title: "Build Your Product", desc: "Build your MVP with creative guidance and mentor support." }
  ];

  const makerProjects = [
    { title: "Student Team Working on a Drone", image: droneImg },
    { title: "Finalizing a Smart City Prototype", image: buildingImg }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#e6d4c1] text-[#1f1713]">
      <Navigation />

      <section className="relative h-[440px] md:h-[560px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <img
          src={makersSpaceHero}
          alt="Students working inside a maker lab"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#168b84]/[0.49] border border-white/20 px-4 py-2 text-xs font-semibold shadow-lg mb-6">
              <Wrench className="w-3.5 h-3.5" />
              Maker's Space
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-heading font-extrabold leading-[1.05] mb-5">
              Turn Your Ideas into Innovations
            </h1>
            <p className="text-sm sm:text-lg text-white/95 max-w-2xl mx-auto mb-7 leading-relaxed">
              Access world-class prototyping tools and expert guidance at our<br className="hidden sm:block" /> Maker's Lab, located within the Atal Incubation Centre, PTU.
            </p>
            <button onClick={openComingSoon} className="inline-flex items-center gap-2 rounded-md bg-[#168b84] hover:bg-[#0f756f] text-white px-8 py-4 text-sm font-bold shadow-lg transition-colors">
              Explore the Lab <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">


          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-[0_10px_28px_rgba(0,0,0,0.16)]">
            <div className="grid sm:grid-cols-[1fr_0.95fr]">
              <div className="p-7 md:p-10">
                <div className="w-10 h-10 rounded-md bg-[#e3f2ee] text-[#138981] flex items-center justify-center mb-5">
                  <Wrench className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold mb-4">What is Makeslab?</h2>
                <p className="text-xs md:text-sm text-[#372f2a] leading-relaxed text-justify mb-4">
                  Makeslab is a practical innovation space where students can move from idea to prototype using guided tools, electronics, coding, and workshop support. It is built for young creators who want to test, build, and improve real solutions.
                </p>
                <p className="text-xs md:text-sm text-[#372f2a] leading-relaxed text-justify">
                  Start with a simple concept, sketch your model, select the right tools, and work with mentors to create a working prototype. The lab gives students the environment to turn curiosity into a real product journey.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#0e7c75] to-[#1d9a8c] text-white p-7 md:p-10 flex flex-col justify-center">
                <div className="space-y-4 text-sm md:text-base">
                  {focusAreas.map((area) => (
                    <p key={area.text} className="flex items-start gap-3">
                      <area.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
                      <span>{area.text}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#eadccb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold mb-3">How it Works</h2>
            <p className="text-sm text-[#6f6056]">Learn more about the makerspace journey in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {makerSteps.map((step, index) => (
              <div key={step.title} className="group relative pt-16">
                <span className="absolute -top-2 -left-1 sm:-left-3 text-[6.4rem] sm:text-[7.8rem] font-black text-[#bde9df] leading-none [-webkit-text-stroke:1px_#0f7f78] drop-shadow-[0_8px_12px_rgba(37,99,235,0.22)] z-0 transition-all duration-300 group-hover:text-[#c8f2ff] group-hover:[-webkit-text-stroke:1px_#0f7f78] group-hover:translate-y-[-4px]">{index + 1}</span>
                <Card className="relative z-10 ml-3 sm:ml-5 min-h-[150px] sm:min-h-[168px] rounded-lg border border-[#0f7f78] bg-white shadow-[5px_7px_0_#138981,0_14px_28px_rgba(37,99,235,0.18)] overflow-visible transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:border-[#2563eb] group-hover:shadow-[7px_10px_0_#2563eb,0_20px_36px_rgba(37,99,235,0.32)]">
                  <CardContent className="p-2.5 sm:p-4 pt-7 sm:pt-8 text-center">
                    <div className="mx-auto w-9 h-9 sm:w-11 sm:h-11 rounded-md bg-[#e3f2ee] text-[#138981] flex items-center justify-center mb-3 border border-[#c8e5df] shadow-[0_8px_18px_rgba(37,99,235,0.16)] transition-all duration-300 group-hover:bg-[#e8f2ff] group-hover:text-[#2563eb] group-hover:border-[#93c5fd] group-hover:scale-110 group-hover:rotate-3">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="font-extrabold text-[10px] sm:text-sm leading-tight mb-1.5">{step.title}</h3>
                    <p className="text-[8px] sm:text-[10px] leading-snug text-[#372f2a]">{step.desc}</p>
                  </CardContent>
                </Card>
                {index < makerSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute right-[-15px] lg:right-[-20px] top-[132px] z-20 w-4 h-4 text-[#0f7f78] transition-all duration-300 group-hover:text-[#2563eb] group-hover:translate-x-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="maker-projects" className="py-16 bg-[#dbc8b4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold mb-3">Apply For Maker's Space</h2>
            <p className="text-sm text-[#6f6056]">Join our innovation hub and start building your future today</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {makerProjects.map((project) => (
              <button
                key={project.title}
                onClick={openComingSoon}
                className="group overflow-hidden rounded-lg border border-[#7d6a5b] bg-[#e1cdb8] p-3 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="aspect-[16/9] rounded-md border border-[#b7a390] bg-[#d5c1ad] overflow-hidden flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-75 grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="px-3 pt-4 pb-2 text-center text-xl font-semibold leading-snug text-black">
                  {project.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.MakersSpacePage = MakersSpacePage;
