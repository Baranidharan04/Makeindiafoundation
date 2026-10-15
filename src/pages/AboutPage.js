// Using simple hash-based Links

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center lg:justify-start animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="relative">
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-3xl rotate-12 animate-float"></div>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary/10 rounded-3xl -rotate-12 animate-float-delayed"></div>

                    <div className="relative w-48 h-48 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl flex items-center justify-center">
                      <img
                        src="public/logo.png"
                        alt="Make India Foundation Logo"
                        className="w-36 h-36 rounded-2xl object-cover shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-right-8 duration-700" style={{ animationDelay: "0.2s" }}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
                    About{" "}
                    <span className="text-primary relative inline-block">
                      Make India
                      <Sparkles className="absolute -top-4 -right-8 text-accent w-8 h-8 animate-pulse" />
                    </span>{" "}
                    Foundation
                  </h1>

                  <div className="space-y-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-justify">
                    <p>
                      Make India Foundation (MIF) was born from a simple but urgent truth: India has the talent to lead the world in technology - it just needs the right platform to build it.
                    </p>
                    <p>
                      Founded by a team of educators, entrepreneurs, and engineers united by one belief, MIF exists to transform India's brightest young minds from consumers of technology into confident creators of it. Through competitions, programs, and community-driven initiatives, we challenge students to move beyond textbooks - to design, build, innovate, and share solutions that matter.
                    </p>
                    <p>
                      MIF bridges two worlds: the global best practices of STEM education from the United States and the rich, untapped potential of India's student community. We are not just running programs - we are building a movement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stand-for" className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">What We Stand For</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-primary/20">
                <CardContent className="p-8 text-center sm:text-left sm:flex items-start gap-6">
                  <div className="mx-auto sm:mx-0 bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6 sm:mb-0 group-hover:scale-105 transition-transform">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      To ignite India's next generation of innovators by building a hands-on culture of designing and making - empowering students to create indigenous, world-class technological solutions that drive India from dependency to self-reliance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border-primary/20">
                <CardContent className="p-8 text-center sm:text-left sm:flex items-start gap-6">
                  <div className="mx-auto sm:mx-0 bg-amber-100 text-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6 sm:mb-0 group-hover:scale-110 transition-transform">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      An India that is not just a services powerhouse, but a product nation - where students from every corner of the country have the skills, the mindset, and lower constraints to design, build, and share technology that solves real problems at national scale.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Founder</h2>
            </div>
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="grid md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr]">
                <div className="bg-gradient-to-br from-primary/80 to-white-600 p-8 flex flex-col items-center justify-center text-brown text-center">
                  <div className="w-36 h-36 mb-4 rounded-full bg-white/15 border-4 border-white/20 shadow-inner flex items-center justify-center" aria-label="Kumar Ram">
                    <span className="text-4xl font-bold tracking-wide"><img
                    src="src/assets/kumarram.jpeg"
                    alt="Kumar Ram"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                    onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Murugan&background=fed7aa&color=c2410c&bold=true&size=150" }}
                  /></span>
                  </div>
                  <h3 className="text-2xl font-bold">Kumar Ram</h3>
                  <p className="text-primary-foreground/80 mt-2 font-medium text-sm">Founder, Make India Foundation</p>
                  <p className="text-primary-foreground/80 text-sm">Founder & CEO, Bytes & Bots, USA</p>
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <p className="text-muted-foreground leading-relaxed text-justify mb-4">
                    Kumar Ram is the driving force behind Make India Foundation. Based in the United States, he is the founder of Bytes & Bots - a K–12 STEM education company widely recognized for its distinctive project-based curriculum and hands-on teaching methodology.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    Having built a successful STEM program in the US, Kumar turned his attention back to India - not as a distant observer, but as an active builder. He established MIF with a clear conviction: that Indian students deserve access to the same quality of innovation-first education that shapes the world's top engineers and entrepreneurs. His vision of <strong>Design · Build · Innovate · Share</strong> is not a tagline - it is the lived philosophy behind every MIF initiative.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Users className="text-primary" /> Board of Directors
              </h2>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
              <Card className="group flex flex-col items-center text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-none bg-white dark:bg-slate-900/40 shadow-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors"></div>
                  <img
                    src="src/assets/Vishnu.PNG"
                    alt="Vishnu Varadan V"
                    className="relative w-32 h-32 rounded-full object-cover object-[center_15%] border-4 border-white dark:border-slate-800 shadow-xl"
                    onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Vishnu+V&background=dcfce7&color=15803d&bold=true&size=150" }}
                  />
                </div>
                <h3 className="text-m font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Vishnu Varadan V</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Chief Executive Officer</p>
                <p className="text-sm text-muted-foreground font-medium">AIC–PEC Foundation</p>
                <div className="w-12 h-1 bg-primary/20 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
              </Card>

              <Card className="group flex flex-col items-center text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-none bg-white dark:bg-slate-900/40 shadow-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors"></div>
                  <img
                    src="src/assets/DR%20sunadaramoorthy.PNG"
                    alt="Dr. R. Sundaramurthy"
                    className="relative w-32 h-32 rounded-full object-cover object-[center_15%] border-4 border-white dark:border-slate-800 shadow-xl"
                    onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Dr+S&background=f3e8ff&color=7e22ce&bold=true&size=150" }}
                  />
                </div>
                <h3 className="text-m font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Dr. R. Sundaramurthy</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Professor & Dean</p>
                <p className="text-sm text-muted-foreground font-medium">Puducherry Technological University</p>
                <div className="w-12 h-1 bg-primary/20 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
              </Card>

              <Card className="group flex flex-col items-center text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-none bg-white dark:bg-slate-900/40 shadow-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors"></div>
                  <img
                    src="src/assets/murugan.PNG"
                    alt="Murugan"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                    onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Murugan&background=fed7aa&color=c2410c&bold=true&size=150" }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Murugan</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Director</p>
                <p className="text-sm text-muted-foreground font-medium">Board Member</p>
                <div className="w-12 h-1 bg-primary/20 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
              </Card>

              <Card className="group flex flex-col items-center text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-none bg-white dark:bg-slate-900/40 shadow-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors"></div>
                  <img
                    src="src/assets/shelley-seagraves.jpg"
                    alt="Shelley Seagraves"
                    className="relative w-32 h-32 rounded-full object-cover object-[center_30%] border-4 border-white dark:border-slate-800 shadow-xl"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Shelley Seagraves</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Scientific Research Methods Advisor</p>
                <p className="text-sm text-muted-foreground font-medium">ISEF</p>
                <div className="w-12 h-1 bg-primary/20 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Sparkles className="text-primary" /> Our Partners
              </h2>
              <p className="text-muted-foreground mt-3">Helping Make India Foundation share its work with the world.</p>
            </div>

            <Card className="group flex flex-col items-center text-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-none bg-white dark:bg-slate-900/40 shadow-sm">
              <img src="src/assets/adplix-logo.png" alt="ADPLIX" className="w-36 h-36 rounded-full object-contain shadow-md mb-5" />
              <h3 className="text-2xl font-bold text-foreground">ADPLIX MEDIA</h3>
              <p className="text-sm font-bold text-primary uppercase tracking-wider mt-2">Media Partner</p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

window.AboutPage = AboutPage;
