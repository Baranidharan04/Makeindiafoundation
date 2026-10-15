var { useState, useEffect } = React;

const CompetitionFAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const faqCategories = [
    {
      id: "participation",
      title: "Participation & Eligibility",
      icon: Users,
      faqs: [
        {
          question: "Who can participate in the competition?",
          answer: "Students enrolled in grades 6-12 across India can participate. Both individual students and teams (up to 3 members) are welcome. Projects must be original student work with appropriate adult supervision."
        },
        {
          question: "Is there an age limit for participants?",
          answer: "There is no strict age limit, but participants must be enrolled in grades 6-12. The competition is designed for middle and high school students aged approximately 11-18 years."
        },
        {
          question: "Can international students participate?",
          answer: "Currently, the competition is open only to students enrolled in Indian schools. We are exploring international participation for future editions."
        },
        {
          question: "Do I need to be in a specific stream (Science/Commerce/Arts)?",
          answer: "No specific stream is required. Students from all streams are encouraged to participate. Many categories like Social Sciences and Mathematics are perfect for non-science stream students."
        },
        {
          question: "Can teachers or parents help with the project?",
          answer: "Adult guidance is encouraged for safety and learning, but the core research, design, and execution must be student-driven. Professional assistance on technical work is not permitted."
        }
      ]
    },
    {
      id: "registration",
      title: "Registration & Fees",
      icon: BookOpen,
      faqs: [
        {
          question: "Is there a registration fee?",
          answer: "Registration is completely free for all participants. We believe in removing financial barriers to encourage maximum participation across India."
        },
        {
          question: "How do I register for the competition?",
          answer: "Registration will open in January 2024. You can register online through our portal. Schools can also register multiple teams at once."
        },
        {
          question: "Can I change my category after registration?",
          answer: "Yes, you can modify your category and subcategory until the project submission deadline. However, major changes may require re-evaluation."
        },
        {
          question: "What information do I need to provide during registration?",
          answer: "You'll need to provide student details (name, grade, school), team information if applicable, and your preferred category. Contact information for follow-up is also required."
        },
        {
          question: "Is there a deadline for registration?",
          answer: "Registration deadlines vary by state. Early registration is recommended as slots may fill up. National finals registration closes in March 2024."
        }
      ]
    },
    {
      id: "competition",
      title: "Competition Process",
      icon: Trophy,
      faqs: [
        {
          question: "How does the three-tier competition work?",
          answer: "The competition has three levels: 1) School-level projects, 2) State-level competitions where top projects present, 3) National finals for the best projects from each state."
        },
        {
          question: "How are winners selected?",
          answer: "Projects are judged by expert panels based on innovation, scientific method, impact, technical execution, and communication skills. Each criterion is weighted for fair evaluation."
        },
        {
          question: "What are the prizes for winners?",
          answer: "National winners receive cash prizes (₹50,000-₹2,00,000), incubation support, and mentorship. State-level winners get scholarships and STEM kits. Special category awards are also available."
        },
        {
          question: "Can I participate in multiple categories?",
          answer: "Each team/project can only enter one category. However, you can participate with different projects in different years."
        },
        {
          question: "What happens if my project doesn't win?",
          answer: "All participants receive certificates of participation. Many projects get recognized through special awards, and all finalists gain valuable experience and networking opportunities."
        }
      ]
    },
    {
      id: "projects",
      title: "Projects & Guidelines",
      icon: Calendar,
      faqs: [
        {
          question: "What types of projects are accepted?",
          answer: "We accept projects across 6 major categories: Life Sciences, Physical Sciences, Earth & Environmental Sciences, Computer Science, Engineering & Robotics, and Social Sciences."
        },
        {
          question: "Are there restrictions on project topics?",
          answer: "Projects must be safe, ethical, and legal. Human/animal testing, illegal substances, and projects posing significant safety risks are prohibited. All projects must follow our ethics guidelines."
        },
        {
          question: "How long should my project be?",
          answer: "Most projects take 3-6 months of development. The research and development phase is followed by documentation and presentation preparation."
        },
        {
          question: "Do I need expensive equipment?",
          answer: "No! Many winning projects use simple, locally available materials. We encourage innovative use of affordable materials. Budget constraints should not limit participation."
        },
        {
          question: "Can I use online resources and AI tools?",
          answer: "Online research is encouraged, but the core innovation and execution must be your own work. AI can be used as a tool, but not to generate your entire project idea or implementation."
        }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      detail: "competition@stemspark.in",
      description: "For general questions and registration support"
    },
    {
      icon: Phone,
      title: "Phone Support",
      detail: "+91 1800-XXX-XXXX",
      description: "Mon-Fri, 9 AM - 6 PM IST"
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-28 pb-20 sm:pt-36 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>
              Your Questions,{" "}
              <span className="text-primary">Answered</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions about participation, registration, projects, and competition procedures.
            </p>

            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or browse all categories below.</p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.id} className="fade-in-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-foreground">
                          {category.title}
                        </h2>
                      </div>

                      <Accordion type="single" collapsible className="space-y-3">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`${category.id}-${faqIndex}`}
                            className="border border-border/50 rounded-lg hover:border-primary/50 transition-colors bg-card"
                          >
                            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-primary/5 transition-colors">
                              <span className="font-medium text-foreground pr-4">
                                {faq.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4">
                              <p className="text-muted-foreground leading-relaxed text-justify">
                                {faq.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <Card key={contact.title} className="p-6 border-border/50 hover:border-primary/50 transition-colors fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-heading font-bold text-lg mb-1">{contact.title}</h3>
                        <p className="text-primary font-medium mb-1">{contact.detail}</p>
                        <p className="text-muted-foreground text-sm">{contact.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary-dark">
              Contact Support Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.CompetitionFAQPage = CompetitionFAQPage;
