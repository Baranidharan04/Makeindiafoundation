var { useState, useEffect } = React;

const FindFairPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");

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

  const states = [
    "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry"
  ];

  const fairs = [
    {
      id: 1,
      name: "Delhi State Science Fair 2024",
      state: "Delhi",
      city: "New Delhi",
      venue: "India Habitat Centre",
      date: "March 15-17, 2024",
      registrationDeadline: "February 28, 2024",
      categories: ["All Categories"],
      participants: "500+ expected",
      contact: "delhi@stemspark.in",
      status: "Registration Open"
    },
    {
      id: 2,
      name: "Maharashtra Innovation Challenge",
      state: "Maharashtra",
      city: "Mumbai",
      venue: "IIT Bombay Campus",
      date: "March 22-24, 2024",
      registrationDeadline: "March 10, 2024",
      categories: ["All Categories"],
      participants: "800+ expected",
      contact: "maharashtra@stemspark.in",
      status: "Registration Open"
    },
    {
      id: 3,
      name: "Karnataka Young Innovators Fair",
      state: "Karnataka",
      city: "Bangalore",
      venue: "IISc Campus",
      date: "April 5-7, 2024",
      registrationDeadline: "March 20, 2024",
      categories: ["All Categories"],
      participants: "600+ expected",
      contact: "karnataka@stemspark.in",
      status: "Coming Soon"
    },
    {
      id: 4,
      name: "Tamil Nadu Science & Technology Expo",
      state: "Tamil Nadu",
      city: "Chennai",
      venue: "Anna University",
      date: "April 12-14, 2024",
      registrationDeadline: "March 25, 2024",
      categories: ["All Categories"],
      participants: "700+ expected",
      contact: "tamilnadu@stemspark.in",
      status: "Coming Soon"
    },
    {
      id: 5,
      name: "West Bengal Innovation Summit",
      state: "West Bengal",
      city: "Kolkata",
      venue: "Science City",
      date: "April 19-21, 2024",
      registrationDeadline: "April 5, 2024",
      categories: ["All Categories"],
      participants: "550+ expected",
      contact: "westbengal@stemspark.in",
      status: "Coming Soon"
    }
  ];

  const filteredFairs = fairs.filter(fair => {
    const matchesSearch = fair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fair.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fair.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "" || selectedState === "All States" || fair.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-28 pb-20 sm:pt-36 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Find a Fair
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>
              Locate State-Level{" "}
              <span className="text-primary">Science Fairs</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find science fairs and competitions in your state. Register for local events
              that serve as qualifying rounds for the national competition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by city, state, or fair name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-[200px]"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                State-Level Fairs ({filteredFairs.length})
              </h2>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Registration Open
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-orange-600">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  Coming Soon
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {filteredFairs.map((fair, index) => (
                <Card key={fair.id} className="p-6 border-border/50 hover:border-primary/50 transition-colors fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                            {fair.name}
                          </h3>
                          <div className="flex items-center gap-4 text-muted-foreground text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {fair.city}, {fair.state}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {fair.participants}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${fair.status === 'Registration Open'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                          {fair.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">Event Date</p>
                            <p className="text-sm text-muted-foreground">{fair.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">Registration Deadline</p>
                            <p className="text-sm text-muted-foreground">{fair.registrationDeadline}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapIcon className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">Venue</p>
                            <p className="text-sm text-muted-foreground">{fair.venue}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-foreground">Categories:</span>
                        <span className="text-muted-foreground">{fair.categories.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                      <Button
                        className="w-full bg-primary hover:bg-primary-dark"
                        disabled={fair.status !== 'Registration Open'}
                      >
                        {fair.status === 'Registration Open' ? 'Register Now' : 'Coming Soon'}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredFairs.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">No fairs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or check back later for more events.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Can't Find a Fair in Your Area?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Help us expand! If there's no science fair in your state or city,
            contact us to organize one. Together we can bring STEM opportunities to every corner of India.
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-6">
            <Trophy className="w-5 h-5 mr-2" />
            Propose a New Fair
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.FindFairPage = FindFairPage;
