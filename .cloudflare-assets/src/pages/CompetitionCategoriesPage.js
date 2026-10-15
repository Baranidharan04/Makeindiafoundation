var { useState } = React;

const CATEGORIES = [
  {
    code: "ANIM",
    title: "Animal Sciences",
    description: "Investigate animal life, behavior, physiology, ecology, or interactions with the environment. Build solutions or conduct research that protects, monitors, or better understands animal life.",
    subcategories: ["Animal Behavior", "Cellular Studies", "Development", "Ecology", "Genetics", "Nutrition & Growth", "Physiology", "Systematics & Evolution"],
    icon: Bug,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  },
  {
    code: "BEHA",
    title: "Behavioural & Social Sciences",
    description: "Study human thought, behavior, and society. Build tools or systems that address real social, psychological, or community challenges.",
    subcategories: ["Clinical & Developmental Psychology", "Cognitive Psychology", "Neuroscience", "Physiological Psychology", "Sociology & Social Psychology"],
    icon: Users,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    code: "BCHM",
    title: "Biochemistry",
    description: "Explore the chemical processes of living organisms — from metabolism to disease — and develop applications from those findings.",
    subcategories: ["Analytical Biochemistry", "General Biochemistry", "Medicinal Biochemistry", "Structural Biochemistry"],
    icon: Beaker,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  },
  {
    code: "BMED",
    title: "Biomedical & Health Sciences",
    description: "Focus on human health — diagnosing, preventing, or treating disease through research, data, or prototype health tools.",
    subcategories: ["Cell, Organ & Systems Physiology", "Genetics & Molecular Biology of Disease", "Immunology", "Nutrition & Natural Products", "Pathophysiology"],
    icon: Heart,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  },
  {
    code: "ENBM",
    title: "Biomedical Engineering",
    description: "Apply engineering to solve medical problems — from wearable health devices and diagnostic tools to assistive technologies.",
    subcategories: ["Biomaterials & Regenerative Medicine", "Biomechanics", "Biomedical Devices", "Biomedical Sensors & Imaging", "Cell & Tissue Engineering", "Synthetic Biology"],
    icon: Activity,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
  },
  {
    code: "CELL",
    title: "Cellular & Molecular Biology",
    description: "Investigate life at its smallest scale — understanding how cells work, communicate, and respond to real-world problems.",
    subcategories: ["Cell Physiology", "Cellular Immunology", "Genetics", "Molecular Biology", "Neurobiology"],
    icon: Dna,
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400"
  },
  {
    code: "CHEM",
    title: "Chemistry",
    description: "Explore the composition, structure, and reactions of matter to develop chemical solutions for everyday challenges.",
    subcategories: ["Analytical Chemistry", "Computational Chemistry", "Environmental Chemistry", "Inorganic Chemistry", "Materials Chemistry", "Organic Chemistry", "Physical Chemistry"],
    icon: Atom,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    code: "CBIO",
    title: "Computational Biology & Bioinfo",
    description: "Use code, data, and mathematical models to decode biological systems — from disease modeling to genomics.",
    subcategories: ["Computational Biomodeling", "Computational Epidemiology", "Computational Evolutionary Biology", "Computational Neuroscience", "Computational Pharmacology", "Genomics"],
    icon: Database,
    color: "bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400"
  },
  {
    code: "EAEV",
    title: "Earth & Env. Sciences ",
    description: "Study our planet's systems — atmosphere, climate, ecosystems, soil — and build solutions to protect nature.",
    subcategories: ["Atmospheric Science", "Climate Science", "Environmental Effects on Ecosystems", "Geosciences", "Water Science"],
    icon: Globe,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
  },
  {
    code: "EBED",
    title: "Embedded Systems & IoT",
    description: "Design electronic systems — circuits, microcontrollers, sensors — that solve real problems in homes or cities.",
    subcategories: ["Circuits", "Internet of Things", "Microcontrollers", "Networking & Data Communications", "Optics", "Sensors", "Signal Processing"],
    icon: Cpu,
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
  },
  {
    code: "EGSD",
    title: "Energy: Materials & Design",
    description: "Tackle energy challenges — generating, storing, or optimising energy through innovative sustainable processes.",
    subcategories: ["Biological Processes & Design", "Solar Processes & Design", "Energy Storage", "Wind & Water Power Generation", "Hydrogen Generation & Storage", "Thermal Generation", "Triboelectricity & Electrolysis"],
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
  },
  {
    code: "ENMC",
    title: "Engineering Mechanics",
    description: "Apply principles of mechanical, civil, aerospace, or structural engineering to build systems that solve physical challenges.",
    subcategories: ["Aerospace & Aeronautical Engineering", "Civil Engineering", "Computational Mechanics", "Control Theory", "Ground Vehicle Systems", "Industrial Engineering", "Mechanical Engineering", "Naval Systems"],
    icon: Wrench,
    color: "bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400"
  },
  {
    code: "ENEV",
    title: "Environmental Engineering",
    description: "Engineer solutions to pressing environmental problems — clean water, waste management, pollution control.",
    subcategories: ["Bioremediation", "Land Reclamation", "Pollution Control", "Recycling & Waste Management", "Water Resources Management"],
    icon: Leaf,
    color: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400"
  },
  {
    code: "MATS",
    title: "Materials Science",
    description: "Design, test, or develop new materials — from nanomaterials and composites to smart polymers.",
    subcategories: ["Biomaterials", "Ceramics & Glasses", "Composite Materials", "Computation & Theory", "Electronic, Optical & Magnetic Materials", "Nanomaterials", "Polymers"],
    icon: Layers,
    color: "bg-stone-100 text-stone-600 dark:bg-stone-900/30 dark:text-stone-400"
  },
  {
    code: "MATH",
    title: "Mathematics",
    description: "Use the power of numbers, patterns, and logic to model, solve, or explain real-world problems.",
    subcategories: ["Algebra", "Analysis", "Combinatorics, Graph Theory & Game Theory", "Geometry & Topology", "Number Theory", "Probability & Statistics"],
    icon: Calculator,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
  },
  {
    code: "MCRO",
    title: "Microbiology",
    description: "Study microorganisms — bacteria, viruses, fungi — and develop applications in health, agriculture, or tech.",
    subcategories: ["Antimicrobials & Antibiotics", "Applied Microbiology", "Bacteriology", "Environmental Microbiology", "Microbial Genetics", "Virology"],
    icon: Microscope,
    color: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400"
  },
  {
    code: "PHYS",
    title: "Physics & Astronomy",
    description: "Investigate the fundamental laws of the universe — from quantum mechanics to space science.",
    subcategories: ["Atomic, Molecular & Optical Physics", "Astronomy & Cosmology", "Biological Physics", "Condensed Matter & Materials", "Mechanics", "Nuclear & Particle Physics", "Theoretical, Computational & Quantum Physics"],
    icon: Rocket,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    code: "PLNT",
    title: "Plant Sciences",
    description: "Study plants — their growth, genetics, ecology, and diseases — and develop innovations in agriculture.",
    subcategories: ["Agriculture & Agronomy", "Ecology", "Genetics & Breeding", "Growth & Development", "Pathology", "Plant Physiology", "Systematics & Evolution"],
    icon: Sprout,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    code: "ROBO",
    title: "Robotics & AI",
    description: "Design and build robots or autonomous systems using sensors, AI, and mechanical design.",
    subcategories: ["Biomechanics", "Cognitive Systems", "Control Theory", "Machine Learning", "Robot Kinematics"],
    icon: Bot,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  },
  {
    code: "SOFT",
    title: "Systems Software",
    description: "Develop new software, algorithms, or systems — from operating systems to cloud computing and cybersecurity.",
    subcategories: ["Algorithms", "Cybersecurity", "Databases", "Operating Systems", "Programming Languages"],
    icon: Terminal,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    code: "TMED",
    title: "Translational Medical Science",
    description: "Bridge the gap between lab research and clinical practice — focusing on patient health outcomes and treatment efficacy.",
    subcategories: ["Disease Diagnosis and Treatment", "Drug Development and Testing", "Pre-clinical Studies"],
    icon: Activity,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
  }
];

const CompetitionCategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 sm:pt-32">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>
            Competition Categories
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Discover the 21 major categories where you can showcase your innovation.
            Find the perfect track for your scientific curiosity or engineering project.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories (e.g. AI, Biology, Physics...)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.code}
                className="group h-full flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <CardHeader className="relative pb-4">
                  <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <div className="absolute top-6 right-6 text-xs font-black text-muted-foreground/30 group-hover:text-primary/40 transition-colors">
                    {category.code}
                  </div>
                  <CardTitle className="text-2xl font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed text-justify line-clamp-4">
                    {category.description}
                  </p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <div className="h-px bg-border/50 mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.subcategories.slice(0, 3).map((sub) => (
                      <Badge key={sub} variant="secondary" className="bg-muted/50 text-[10px] py-0 px-2 font-medium">
                        {sub}
                      </Badge>
                    ))}
                    {category.subcategories.length > 3 && (
                      <Badge variant="outline" className="text-[10px] py-0 px-2 border-primary/20 text-primary">
                        +{category.subcategories.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-primary font-bold text-sm">
                    View Full Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No categories found</h3>
            <p className="text-muted-foreground">Try adjusting your search query to find what you're looking for.</p>
          </div>
        )}
      </main>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border-primary/20 animate-in zoom-in-95 duration-300">
            <div className={`p-8 ${selectedCategory.color} relative`}>
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 text-current transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-xl">
                  <selectedCategory.icon className="w-10 h-10" />
                </div>
                <div>
                  <div className="text-xs font-black opacity-60 uppercase tracking-widest mb-1">{selectedCategory.code}</div>
                  <h2 className="text-3xl sm:text-4xl font-heading font-bold">{selectedCategory.title}</h2>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Description
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                    {selectedCategory.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Sub-categories
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCategory.subcategories.map((sub) => (
                      <div key={sub} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium text-foreground/90">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Always check full guidelines before starting
                  </div>
                  <Button
                    onClick={() => setSelectedCategory(null)}
                    className="w-full sm:w-auto rounded-full px-8"
                  >
                    Close Details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

window.CompetitionCategoriesPage = CompetitionCategoriesPage;
