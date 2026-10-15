var { useState, useEffect } = React;

const CompetitionDatabasePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedAward, setSelectedAward] = useState("");

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

  const categories = [
    "All Categories",
    "Animal Sciences",
    "Behavioral & Social Sciences",
    "Biochemistry",
    "Biomedical & Health Sciences",
    "Cellular & Molecular Biology",
    "Chemistry",
    "Computational Biology & Bioinformatics",
    "Earth & Environmental Sciences",
    "Embedded Systems",
    "Energy & Transportation",
    "Engineering Mechanics",
    "Environmental Engineering",
    "Materials Science",
    "Mathematics",
    "Microbiology",
    "Physics & Astronomy",
    "Plant Sciences",
    "Robotics & Intelligent Machines",
    "Systems Software"
  ];

  const years = ["All Years", "2024", "2023", "2022", "2021", "2020"];

  const awards = [
    "All Awards",
    "Grand Prize Winner",
    "Category Winner",
    "Special Award",
    "Honorable Mention",
    "Finalist"
  ];

  const projects = [
    {
      id: 1,
      title: "AI-Powered Crop Disease Detection Using Computer Vision",
      category: "Computational Biology & Bioinformatics",
      year: "2024",
      award: "Grand Prize Winner",
      students: ["Arjun Sharma", "Priya Patel"],
      school: "Delhi Public School, Mumbai",
      abstract: "Developed a machine learning model that can identify crop diseases from leaf images with 94% accuracy, helping farmers detect issues early and reduce crop loss.",
      keywords: ["AI", "Computer Vision", "Agriculture", "Machine Learning"],
      views: 1250,
      downloads: 89
    },
    {
      id: 2,
      title: "Sustainable Water Purification Using Nanotechnology",
      category: "Materials Science",
      year: "2024",
      award: "Category Winner",
      students: ["Rahul Kumar"],
      school: "St. Xavier's College, Kolkata",
      abstract: "Created a low-cost water purification system using graphene oxide membranes that removes 99.9% of contaminants while being reusable and energy-efficient.",
      keywords: ["Nanotechnology", "Water Purification", "Sustainability", "Materials"],
      views: 980,
      downloads: 67
    },
    {
      id: 3,
      title: "Brain-Computer Interface for Motor Rehabilitation",
      category: "Biomedical & Health Sciences",
      year: "2023",
      award: "Special Award",
      students: ["Ananya Singh", "Vikram Rao", "Meera Joshi"],
      school: "IISc, Bangalore",
      abstract: "Designed a BCI system using EEG signals to help stroke patients regain motor control through neurofeedback training and virtual reality therapy.",
      keywords: ["BCI", "EEG", "Rehabilitation", "Neuroscience"],
      views: 1540,
      downloads: 123
    },
    {
      id: 4,
      title: "Quantum Computing Algorithm for Drug Discovery",
      category: "Computational Biology & Bioinformatics",
      year: "2023",
      award: "Category Winner",
      students: ["Karan Mehta"],
      school: "IIT Delhi",
      abstract: "Implemented a quantum algorithm that can simulate molecular interactions 100x faster than classical computers, accelerating drug discovery processes.",
      keywords: ["Quantum Computing", "Drug Discovery", "Algorithms", "Chemistry"],
      views: 890,
      downloads: 45
    },
    {
      id: 5,
      title: "Autonomous Drone Swarm for Disaster Response",
      category: "Robotics & Intelligent Machines",
      year: "2024",
      award: "Finalist",
      students: ["Sanya Gupta", "Arav Jain", "Riya Sharma"],
      school: "BITS Pilani",
      abstract: "Developed a swarm of coordinated drones that can assess disaster areas, locate survivors, and deliver emergency supplies autonomously.",
      keywords: ["Drones", "Swarm Robotics", "AI", "Disaster Response"],
      views: 756,
      downloads: 34
    },
    {
      id: 6,
      title: "CRISPR-Based Gene Therapy for Genetic Disorders",
      category: "Cellular & Molecular Biology",
      year: "2023",
      award: "Honorable Mention",
      students: ["Neha Agarwal", "Rohan Singh"],
      school: "AIIMS, New Delhi",
      abstract: "Investigated the use of CRISPR-Cas9 for treating sickle cell anemia, achieving successful gene editing in human cell lines with minimal off-target effects.",
      keywords: ["CRISPR", "Gene Therapy", "Genetics", "Biotechnology"],
      views: 1120,
      downloads: 78
    },
    {
      id: 7,
      title: "Renewable Energy Storage Using Advanced Batteries",
      category: "Energy & Transportation",
      year: "2024",
      award: "Category Winner",
      students: ["Aditya Verma"],
      school: "IIT Bombay",
      abstract: "Designed a novel solid-state battery with 3x higher energy density than lithium-ion batteries, enabling better renewable energy storage solutions.",
      keywords: ["Batteries", "Renewable Energy", "Materials Science", "Storage"],
      views: 1340,
      downloads: 92
    },
    {
      id: 8,
      title: "Machine Learning for Climate Change Prediction",
      category: "Earth & Environmental Sciences",
      year: "2023",
      award: "Special Award",
      students: ["Ishita Rao", "Dev Patel"],
      school: "TIFR, Mumbai",
      abstract: "Built predictive models using satellite data and climate variables to forecast extreme weather events with 85% accuracy, aiding disaster preparedness.",
      keywords: ["Machine Learning", "Climate Change", "Prediction", "Remote Sensing"],
      views: 987,
      downloads: 56
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "" || selectedCategory === "All Categories" || project.category === selectedCategory;
    const matchesYear = selectedYear === "" || selectedYear === "All Years" || project.year === selectedYear;
    const matchesAward = selectedAward === "" || selectedAward === "All Awards" || project.award === selectedAward;
    return matchesSearch && matchesCategory && matchesYear && matchesAward;
  });

  const stats = [
    { label: "Total Projects", value: "2,847", icon: <BookOpen className="w-5 h-5" /> },
    { label: "Categories", value: "20", icon: <Target className="w-5 h-5" /> },
    { label: "Years", value: "5", icon: <Calendar className="w-5 h-5" /> },
    { label: "Downloads", value: "15,432", icon: <Download className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-28 pb-20 sm:pt-36 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Project Database
            </div>

            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-6" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>
              Past Winning{" "}
              <span className="text-primary">Projects</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore innovative projects from previous competitions. Get inspired by award-winning
              research and learn from successful methodologies.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-heading font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by title, abstract, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-12"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-[200px] h-12"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-[120px] h-12"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  value={selectedAward}
                  onChange={(e) => setSelectedAward(e.target.value)}
                  className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-w-[150px] h-12"
                >
                  {awards.map(award => (
                    <option key={award} value={award}>{award}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Projects ({filteredProjects.length})
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Most Popular
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Highest Rated
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <Card key={project.id} className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-heading font-bold text-foreground mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.year}
                        </Badge>
                        <Badge className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          {project.award}
                        </Badge>
                      </div>
                    </div>
                    <Award className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 text-justify">
                    {project.abstract}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {project.students.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <School className="w-3 h-3" />
                      {project.school}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.keywords.map((keyword, keywordIndex) => (
                      <Badge key={keywordIndex} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {project.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {project.downloads}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or browse different categories.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Lightbulb className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Ready to Create Your Own Winning Project?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 text-justify">
              Use these projects as inspiration for your research. Remember, every great discovery
              starts with curiosity and a willingness to explore the unknown.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-6">
                <Target className="w-5 h-5 mr-2" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Guidelines
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.CompetitionDatabasePage = CompetitionDatabasePage;
