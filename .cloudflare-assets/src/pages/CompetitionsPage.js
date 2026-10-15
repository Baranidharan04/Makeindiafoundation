var { useEffect } = React;
// Using simple hash-based Links

const CompetitionsPage = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const quickLinks = [
    {
      icon: MapPin,
      title: "Find a Fair",
      description: "Locate state-level science fairs and competitions",
      link: "/competitions/find-fair",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      icon: FileText,
      title: "Rules & Guidelines",
      description: "Official competition rules and participation guidelines",
      link: "/competitions/rules",
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    },
    {
      icon: BookOpen,
      title: "Project Material Guidelines",
      description: "Requirements for project documentation and materials",
      link: "/competitions/guidelines",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
      icon: HelpCircle,
      title: "Frequently Asked Questions",
      description: "Answers to common questions for students, parents, and teachers",
      link: "/competitions/faq",
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
      icon: Target,
      title: "Categories & Subcategories",
      description: "Definitions and details of competition categories",
      link: "/competitions/categories",
      color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    },
    {
      icon: Search,
      title: "Project Database",
      description: "Searchable database of past competition projects",
      link: "/competitions/database",
      color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
    }
  ];

  const stats = [
    { number: "20+", label: "Competition Tracks", icon: Target },
    { number: "6", label: "Major Categories", icon: Trophy },
    { number: "50K+", label: "Students Expected", icon: Users },
    { number: "₹50L+", label: "Prize Pool", icon: Award }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center lg:justify-start fade-in-up">
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

              <div className="text-center lg:text-left space-y-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Trophy className="w-4 h-4" />
                  MIF Science and Engineering Fair
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
                  India's Premier{" "}
                  <span className="text-primary relative inline-block">
                    Science Competition
                    <Sparkles className="absolute -top-4 -right-8 text-accent w-8 h-8 animate-pulse" />
                  </span>
                </h1>

                <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 text-justify">
                  Join thousands of young innovators across India in the largest science and technology competition.
                  From local fairs to national finals, discover your potential in STEM.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary-dark px-8 py-6 text-lg"
                    onClick={() => document.getElementById("quick-links")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Explore Competition
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg"
                    onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    View Statistics
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="quick-links" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>
              Competition Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about participating in India's largest science competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  to={link.link}
                  className="group block"
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 bg-background hover:-translate-y-1 fade-in-up group-hover:border-primary/50"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {link.description}
                        </p>
                        <div className="flex items-center text-primary text-sm font-medium">
                          Learn More
                          <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready to Start Your Innovation Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students across India in the most prestigious science competition.
            Your breakthrough idea could be the next big innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/competitions/categories">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                View Categories
                <Target className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/competitions/find-fair">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg">
                Find a Fair Near You
                <MapPin className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.CompetitionsPage = CompetitionsPage;
