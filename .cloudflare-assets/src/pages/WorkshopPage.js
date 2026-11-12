
var workshopHero = 'src/assets/hero/hero_2.png';
var fewoImg = 'src/assets/keerthan-dm-XA92214FLiM-unsplash.jpg';
var hero2 = 'src/assets/hero/hero2.png';
var stemPilotPhotos = [
  { src: 'src/assets/workshops/stem-pilot-electronics.jpg', alt: 'Students building electronics together' },
  { src: 'src/assets/workshops/stem-pilot-mentor-session.jpg', alt: 'Mentor guiding students during a STEM session' },
  { src: 'src/assets/workshops/stem-pilot-components.jpg', alt: 'Components arranged for a collaborative workshop build' },
  { src: 'src/assets/workshops/stem-pilot-3d-printer.jpg', alt: 'Student working with a 3D printer' },
  { src: 'src/assets/workshops/stem-pilot-components-sorting.jpg', alt: 'Students sorting workshop components' },
  { src: 'src/assets/workshops/stem-pilot-collaboration.jpg', alt: 'Students collaborating on a project' }
];
var stemPilotInstagramUrl = 'https://www.instagram.com/p/DdikQcmkyfq/?cplk=a3dkbjE3dzdsY2Qw&img_index=1';
var stemPilotAlbumUrl = 'https://drive.google.com/drive/folders/1wMMWlywJqkaZqNRmC26A8j9telb89cQQ?usp=sharing';

const WorkshopPage = () => {
  const openComingSoon = () => {
    window.sessionStorage.setItem("comingSoonReturnPath", "/stem-workshops");
    window.location.hash = "/coming-soon";
  };
  const steps = [
    { icon: Lightbulb, title: "Browse and Select", desc: "Submit your ideas to us and choose a workshop path." },
    { icon: GraduationCap, title: "Register", desc: "Join the selected class and begin exploring the subject." },
    { icon: Blocks, title: "Receive Kit & Materials", desc: "Access prototyping resources and learning material." },
    { icon: Rocket, title: "Attend and Make", desc: "Build your MVP with creative guidance and support." },
  ];

  const workshops = [
    {
      title: "Offline Drone Building Workshop",
      grade: "9-12th Std",
      image: workshopHero,
      icon: Bot,
      mode: "Hands-on Onsite",
      duration: "2-day intensive"
    },
    {
      title: "Online coding class",
      grade: "6-8th Std",
      image: hero2,
      icon: Terminal,
      mode: "Live Online",
      duration: "Weekend cohort"
    }
  ];



  return (
    <div className="min-h-screen flex flex-col bg-[#e6d4c1] text-[#1f1713]">
      <Navigation />

      <section className="relative h-[440px] md:h-[560px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        <img
          src={workshopHero}
          alt="Students participating in a STEM workshop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#168b84]/[0.49] border border-white/20 px-4 py-2 text-xs font-semibold shadow-lg mb-6">
              <Blocks className="w-3.5 h-3.5" />
              STEM Workshops
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-heading font-extrabold leading-[1.05] mb-5">
              Empower Young Minds with STEM
            </h1>
            <p className="text-sm sm:text-lg text-white/95 max-w-2xl mx-auto mb-7 leading-relaxed">
              Hands-on learning for the future, Explore our diverse range of<br className="hidden sm:block" /> online and offline STEM workshops.
            </p>
            <button onClick={openComingSoon} className="inline-flex items-center gap-2 rounded-md bg-[#168b84] hover:bg-[#0f756f] text-white px-8 py-4 text-sm font-bold shadow-lg transition-colors">
              Explore Workshops <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* <div className="absolute left-[4%] bottom-6 z-10 hidden sm:block w-44 lg:w-72 rounded-lg border-[8px] lg:border-[10px] border-[#171717] bg-[#111] shadow-2xl">
          <div className="aspect-video overflow-hidden rounded-sm bg-slate-200">
            <img src={fewoImg} alt="Online mentor session" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div> */}
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">


          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-[0_10px_28px_rgba(0,0,0,0.16)]">
            <div className="grid sm:grid-cols-[1fr_0.95fr]">
              <div className="p-7 md:p-10">
                <div className="w-10 h-10 rounded-md bg-[#e3f2ee] text-[#138981] flex items-center justify-center mb-5">
                  <Blocks className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold mb-4">What are STEM Workshops?</h2>
                <p className="text-xs md:text-sm text-[#372f2a] leading-relaxed text-justify mb-4">
                  STEM Workshops is specifically crafted for younger students in middle school Grades 5. The goal is not to solve unsolvable global crises, but to spark an undying curiosity for asking "Why?" and "How can I build this?".
                </p>
                <p className="text-xs md:text-sm text-[#372f2a] leading-relaxed text-justify">
                  Start with something simple: test a science theory, build a basic model, write a small piece of code, or invent a gadget. STEM Workshops provides a supportive environment for your very first scientific project.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#0e7c75] to-[#1d9a8c] text-white p-7 md:p-10 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold mb-4">Workshop Modes</h3>
                <div className="space-y-3 text-sm md:text-base mb-6">
                  <p className="flex items-center gap-3"><Video className="w-4 h-4 md:w-5 md:h-5" /> Live Online</p>
                  <p className="flex items-center gap-3"><Wrench className="w-4 h-4 md:w-5 md:h-5" /> Hands-on Onsite</p>
                </div>
                <div className="h-px bg-white/25 mb-6" />
                <h3 className="text-xl md:text-2xl font-bold mb-4">Age Groups</h3>
                <div className="space-y-3 text-sm md:text-base">
                  <p className="flex items-center gap-3"><School className="w-4 h-4 md:w-5 md:h-5" /> Middle School: 6-8th Standard</p>
                  <p className="flex items-center gap-3"><GraduationCap className="w-4 h-4 md:w-5 md:h-5" /> High School: 9-12th Standard</p>
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
            <p className="text-sm text-[#6f6056]">Learn more about the workshop journey in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {steps.map((step, index) => (
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
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute right-[-15px] lg:right-[-20px] top-[132px] z-20 w-4 h-4 text-[#0f7f78] transition-all duration-300 group-hover:text-[#2563eb] group-hover:translate-x-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workshop-list" className="py-16 bg-[#dbc8b4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold mb-3">Apply for Workshops</h2>
            <p className="text-sm text-[#6f6056]">Choose your path and start your STEM journey with our expert-led sessions</p>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {workshops.map((workshop) => (
              <button
                key={workshop.title}
                onClick={openComingSoon}
                className="group overflow-hidden rounded-lg border border-[#7d6a5b] bg-[#e1cdb8] p-3 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="aspect-[16/9] rounded-md border border-[#b7a390] bg-[#d5c1ad] overflow-hidden flex items-center justify-center">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover opacity-75 grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="px-3 pt-4 pb-2 text-center text-xl font-semibold leading-snug text-black">
                  {workshop.title} <br className="hidden sm:block" />({workshop.grade})
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>
       <section className="bg-white py-16" aria-labelledby="recent-workshops-title">
         <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
           <div className="mb-10 max-w-2xl">
             <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#168b84]">Recent workshops</p>
             <h2 id="recent-workshops-title" className="mb-4 text-3xl font-extrabold sm:text-4xl">Learning by making</h2>
             <p className="text-sm leading-relaxed text-[#6f6056] sm:text-base">A look back at PILOT-1, where students explored STEM through practical, hands-on learning.</p>
           </div>
            <div className="grid gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-start">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {stemPilotPhotos.map((photo) => <div key={photo.src} className="aspect-[4/3] overflow-hidden rounded-lg border border-[#b7a390] bg-[#e1cdb8] shadow-sm"><img src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>)}
             </div>
             <aside className="rounded-lg border border-[#7d6a5b] bg-[#eadccb] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.12)] sm:p-8">
               <h3 className="mb-3 text-2xl font-extrabold">PILOT-1</h3>
               <p className="mb-6 text-sm leading-relaxed text-[#6f6056]">A one-day workshop bringing students, mentors and volunteers together at Thamarai Learning Centre, Auroville.</p>
               <dl className="space-y-5 text-sm"><div><dt className="font-bold text-[#168b84]">Date</dt><dd className="mt-1">13 September 2026</dd></div><div><dt className="font-bold text-[#168b84]">Time</dt><dd className="mt-1">9:30 AM - 4:30 PM</dd></div><div><dt className="font-bold text-[#168b84]">Location</dt><dd className="mt-1">Thamarai Learning Centre, Auroville</dd></div><div><dt className="font-bold text-[#168b84]">Participants</dt><dd className="mt-1">42 participants (30 students and 12 volunteers)</dd></div></dl>
               <div className="mt-8 flex flex-col items-start gap-4 border-t border-[#b7a390] pt-6 text-sm font-bold sm:flex-row sm:flex-wrap sm:items-center"><a href={stemPilotInstagramUrl} target="_blank" rel="noreferrer" className="rounded-md text-[#0f756f] underline decoration-transparent underline-offset-4 transition hover:decoration-current focus:outline-none focus:ring-2 focus:ring-[#168b84] focus:ring-offset-2">View Instagram post <span aria-hidden="true">↗</span></a><a href={stemPilotAlbumUrl} target="_blank" rel="noreferrer" className="rounded-md text-[#0f756f] underline decoration-transparent underline-offset-4 transition hover:decoration-current focus:outline-none focus:ring-2 focus:ring-[#168b84] focus:ring-offset-2">Open photo album <span aria-hidden="true">↗</span></a></div>
             </aside>
           </div>
         </div>
       </section>
      <Footer />
    </div>
  );
};

window.WorkshopPage = WorkshopPage;
