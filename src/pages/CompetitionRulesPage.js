var { useEffect } = React;

const CompetitionRulesPage = () => {
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

  const eligibilityRules = [
    {
      icon: Users,
      title: "Participation Eligibility",
      rules: [
        "Students must be enrolled in grades 6-12",
        "Individual or team participation (up to 3 members)",
        "Projects must be original student work",
        "Adult supervision required for safety protocols",
        "No professional assistance on core project work"
      ]
    },
    {
      icon: Calendar,
      title: "Timeline & Deadlines",
      rules: [
        "Registration opens: January 2024",
        "Project submission deadline: March 2024",
        "State-level competitions: April-May 2024",
        "National finals: June 2024",
        "Late submissions will not be accepted"
      ]
    },
    {
      icon: Trophy,
      title: "Competition Structure",
      rules: [
        "Three-tier competition: School → State → National",
        "Projects judged on innovation, impact, and feasibility",
        "Winners advance to next level automatically",
        "Special category awards available",
        "Public voting for People's Choice awards"
      ]
    }
  ];

  const prohibitedActivities = [
    "Human or animal testing without proper ethics approval",
    "Projects involving illegal substances or activities",
    "Work that poses significant safety risks",
    "Projects that violate intellectual property rights",
    "Commercial products presented as original work"
  ];

  const judgingCriteria = [
    {
      category: "Innovation & Originality",
      weight: "25%",
      description: "Novel approach, creative problem-solving, and unique solutions"
    },
    {
      category: "Scientific Method",
      weight: "20%",
      description: "Proper research methodology, data collection, and analysis"
    },
    {
      category: "Impact & Relevance",
      weight: "20%",
      description: "Real-world application and potential societal benefit"
    },
    {
      category: "Technical Execution",
      weight: "20%",
      description: "Quality of implementation, materials, and presentation"
    },
    {
      category: "Communication",
      weight: "15%",
      description: "Clarity of explanation, documentation, and demonstration"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-28 pb-20 sm:pt-36 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Official Rules & Guidelines
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>
              Competition Rules &{" "}
              <span className="text-primary">Participation Guidelines</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive rules and guidelines for participating in the Make India Innovation Challenge 2024.
              Please read carefully before registering.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
              Eligibility & Participation Rules
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {eligibilityRules.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card key={section.title} className="p-6 border-border/50 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {section.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {section.rules.map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-justify">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>

            <Card className="p-8 border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20 mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center dark:bg-red-900/30">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Prohibited Activities
                </h3>
              </div>

              <p className="text-muted-foreground mb-4">
                The following types of projects are not permitted and will be disqualified:
              </p>

              <ul className="space-y-3">
                {prohibitedActivities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-justify">{activity}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-12">
              Judging Criteria & Scoring
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {judgingCriteria.map((criteria, index) => (
                <Card key={criteria.category} className="p-6 border-border/50 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {criteria.category}
                    </h3>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                      {criteria.weight}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
                    {criteria.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
              Download Official Documents
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-heading font-bold text-lg mb-1">Complete Rules Handbook</h3>
                    <p className="text-muted-foreground text-sm">PDF • 45 pages • Updated 2024</p>
                  </div>
                  <Download className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
              </Card>

              <Card className="p-6 border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-heading font-bold text-lg mb-1">Ethics & Safety Guidelines</h3>
                    <p className="text-muted-foreground text-sm">PDF • 20 pages • Updated 2024</p>
                  </div>
                  <Download className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
              </Card>
            </div>

            <div className="mt-8">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                View All Competition Documents
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Need Clarification?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our rules committee is here to help. Contact us for any questions about eligibility,
            judging criteria, or competition procedures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6">
              Contact Rules Committee
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-6">
              View FAQ
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.CompetitionRulesPage = CompetitionRulesPage;
