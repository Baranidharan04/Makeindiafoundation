// Using simple hash-based Links

const IgnitePage = () => {
  const { openModal } = useRegistration();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen relative bg-slate-900 text-white overflow-hidden py-24 sm:py-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#006241]/30 via-slate-900 to-slate-900" />
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none scale-110">
          <ScienceHeroBackground variant="ignite" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 bg-[#006241]/20 border border-[#006241]/30 text-[#40b58a] px-4 py-2 rounded-full text-sm font-bold mb-8 tracking-wide">
            <Sparkles className="w-4 h-4" />
            GRADES 6-8
          </div>

          <h1 className="text-foreground text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8" style={{ textShadow: '2px 2px 0px rgba(0, 48, 32, 0.4)' }}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006241] to-[#00a86b]">IGNITE Competition</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            A beginner-friendly innovation track where middle school students first discover the magic of scientific inquiry and creativity.
          </p>
          <div className="animate-float">
            <Button
              variant="ignite"
              size="lg"
              className="group relative overflow-hidden rounded-full px-10 py-8 text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,98,65,0.4)]"
              onClick={() => openModal("ignite")}
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
              <span className="relative flex items-center gap-2">
                Register for IGNITE
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Content Section */}
      <section className="py-20 flex-1 bg-slate-50 dark:bg-slate-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex overflow-x-auto md:grid md:grid-cols-5 w-full h-auto p-2 bg-white dark:bg-slate-950 shadow-md mb-12 border border-slate-200 dark:border-slate-800 whitespace-nowrap custom-scrollbar gap-1">
              <TabsTrigger value="overview" className="py-3 sm:py-4 rounded-xl text-sm sm:text-base data-[state=active]:bg-[#006241] data-[state=active]:text-white transition-all flex-shrink-0">Overview</TabsTrigger>
              <TabsTrigger value="motivation" className="py-3 sm:py-4 rounded-xl text-sm sm:text-base data-[state=active]:bg-[#006241] data-[state=active]:text-white transition-all flex-shrink-0">Motivation</TabsTrigger>
              <TabsTrigger value="guidelines" className="py-3 sm:py-4 rounded-xl text-sm sm:text-base data-[state=active]:bg-[#006241] data-[state=active]:text-white transition-all flex-shrink-0">Rules</TabsTrigger>
              <TabsTrigger value="awards" className="py-3 sm:py-4 rounded-xl text-sm sm:text-base data-[state=active]:bg-[#006241] data-[state=active]:text-white transition-all flex-shrink-0">Awards</TabsTrigger>
              <TabsTrigger value="process" className="py-3 sm:py-4 rounded-xl text-sm sm:text-base data-[state=active]:bg-[#006241] data-[state=active]:text-white transition-all flex-shrink-0">How to Apply</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-xl bg-white dark:bg-slate-950 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-[#006241]/10 dark:bg-[#006241]/30 text-[#006241] rounded-2xl flex items-center justify-center mb-6">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold mb-6">What is IGNITE?</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg text-justify mb-6">
                      IGNITE is specifically crafted for younger students in middle school (Grades 6-8). The goal is not to solve uncrackable global crises, but to spark an undying curiosity for asking "Why?" and "How can I build this?".
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                      Start with something simple: test a science theory, build a basic model, write a small piece of code, or invent a gadget. IGNITE provides a supportive environment for your very first scientific project!
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[#004d33] to-[#006241] p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-2xl font-bold mb-6 flex items-center"><Lightbulb className="w-6 h-6 mr-3" /> Core Focus Areas</h3>
                    <ul className="space-y-4 text-lg">
                      <li className="flex items-center"><Blocks className="w-5 h-5 mr-3 text-emerald-100" /> Building & Prototyping Fun Ideas</li>
                      <li className="flex items-center"><Compass className="w-5 h-5 mr-3 text-emerald-100" /> Exploring Scientific Inquiry</li>
                      <li className="flex items-center"><PenTool className="w-5 h-5 mr-3 text-emerald-100" /> Learning the Scientific Method</li>
                      <li className="flex items-center"><Sparkles className="w-5 h-5 mr-3 text-emerald-100" /> Cultivating Unbound Creativity</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="motivation" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10 mt-6">
                <h2 className="text-3xl font-bold">Why participate in IGNITE?</h2>
                <p className="text-muted-foreground mt-4 text-lg">Discover the thrill of making something out of nothing.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Blocks, title: "Hands-on Learning", desc: "Break away from textbook boredom. Get your hands messy building models, writing code, or running mini-experiments." },
                  { icon: Compass, title: "Find Your Spark", desc: "Unsure what you're passionate about? IGNITE lets you try Biology, Coding, Robotics or Math in a fun, low-pressure way." },
                  { icon: Medal, title: "Win Cool Prizes", desc: "Earn awesome certificates, medals, and potentially STEM kits to kickstart your next big project!" }
                ].map((item, i) => (
                  <Card key={i} className="group hover:-translate-y-2 hover:shadow-xl transition-all border-none shadow-md">
                    <CardHeader className="text-center pb-2">
                      <div className="mx-auto w-16 h-16 bg-emerald-50 dark:bg-[#006241]/20 text-[#006241] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                      {item.desc}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guidelines" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-xl overflow-hidden p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                  <ShieldCheck className="w-10 h-10 text-[#006241]" />
                  <div>
                    <h2 className="text-3xl font-bold">Rules & Eligibility</h2>
                    <p className="text-muted-foreground">The essentials you need to know before starting your project.</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-foreground">Eligibility</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start"><CheckCircle2 className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" /> <span className="text-muted-foreground">Must be enrolled in <strong>Grades 6-8</strong>.</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" /> <span className="text-muted-foreground">Indian-origin students studying in South India schools.</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" /> <span className="text-muted-foreground">Must have a teacher or parent mentor/supervisor.</span></li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-foreground">Project Standards</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start"><CheckCircle2 className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" /> <span className="text-muted-foreground">Must be a basic, student-led inquiry or model. Copying textbook experiments is not allowed.</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" /> <span className="text-muted-foreground">Submission requires Hypothesis, Experiment, Data, and Conclusion clearly stated.</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" /> <span className="text-muted-foreground">Requires a short report and up to a 90-second explanation video.</span></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t text-center">
                  <Button variant="outline" asChild className="rounded-full">
                    <Link to="/competitions/guidelines">Read Full Guidelines <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="awards" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-none shadow-xl bg-gradient-to-br from-[#004d33] to-[#002f1f] text-white overflow-hidden p-8 md:p-12 text-center relative">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
                <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-lg" />
                <h2 className="text-4xl font-extrabold mb-6" style={{ textShadow: '2px 2px 0px rgba(0, 48, 32, 0.4)' }}>IGNITE Rewards</h2>
                <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                  We reward pure curiosity! Winners of the IGNITE track take home exciting prizes that help continue their STEM journey.
                </p>
                <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                    <h4 className="text-xl font-bold text-yellow-300 mb-2">STEM Kits</h4>
                    <p className="text-white/80 text-sm">Robotics and Science kits to build at home.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                    <h4 className="text-xl font-bold text-yellow-300 mb-2">Medals</h4>
                    <p className="text-white/80 text-sm">Official IGNITE medals and physical certificates.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                    <h4 className="text-xl font-bold text-yellow-300 mb-2">School Recognition</h4>
                    <p className="text-white/80 text-sm">Trophies awarded to your school highlighting your success.</p>
                  </div>
                </div>
                <Button variant="secondary" size="lg" asChild className="rounded-full font-bold text-[#006241]">
                  <Link to="/competitions/awards">View Award Page</Link>
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-10 text-center mt-6">
                <h2 className="text-3xl font-bold">Registration Process</h2>
                <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">Ready to begin your innovation journey? Follow these 4 simple steps to submit your project to the IGNITE committee.</p>
              </div>
              <div className="max-w-4xl mx-auto relative py-8">
                <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
                <div className="space-y-12">
                  {[
                    { title: "Find a Mentor", desc: "Identify a teacher or guide at your school to certify and oversee your research." },
                    { title: "Choose a Track", desc: "Select one of the 21 Competition Categories that fits your project's focus (e.g., Robotics, Chemistry)." },
                    { title: "Prepare Documents", desc: "Write your Abstract, Methodology, Results, and record your 90-second pitch video." },
                    { title: "Submit Online", desc: "Create an account on the MIF portal, fill the form, and upload your files before the deadline." },
                  ].map((step, i) => (
                    <div key={i} className="relative flex items-center w-full group min-h-[100px]">
                      <div className={`w-full sm:w-5/12 ${i % 2 === 0 ? "sm:mr-auto sm:text-right sm:pr-8" : "sm:ml-auto sm:text-left sm:pl-8"} pl-20 sm:pl-0`}>
                        <Card className="border-none shadow-md group-hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <h4 className="text-lg font-bold mb-2 text-foreground">Step {i + 1}: {step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="absolute left-8 sm:left-1/2 w-16 h-16 bg-emerald-50 text-[#006241] rounded-full border-4 border-background flex items-center justify-center font-bold text-xl top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 shadow-md transition-transform group-hover:scale-110">
                        <PenTool className="w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-16 animate-float">
                <Button
                  variant="ignite"
                  size="lg"
                  className="group relative overflow-hidden rounded-full px-12 py-8 text-2xl font-bold shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,98,65,0.5)]"
                  onClick={() => openModal("ignite")}
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  <span className="relative flex items-center gap-2">
                    Start Registration Now
                    <Rocket className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.IgnitePage = IgnitePage;
