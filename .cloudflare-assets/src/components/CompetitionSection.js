const c1 = 'src/assets/competitions/c1.png';
const c2 = 'src/assets/competitions/c2.png';

const competitions = [
  {
    id: "arise",
    title: "ARISE",
    subtitle: "Annual Regional Innovation in Science & Engineering",
    description: "",
    image: c2,
    category: "High school",
    keyPoint: "Regional champions qualify for national finals",
    icons: [FlaskConical, Gauge, Brain],
    href: "/competitions/arise",
  },
  {
    id: "ignite",
    title: "IGNITE",
    subtitle: "",
    description: "",
    image: c1,
    category: "Middle school",
    keyPoint: "Mentorship and seed funding for top projects",
    icons: [Cpu, CircuitBoard, Bot],
    href: "/competitions/ignite",
  },
];

const CompetitionSection = () => {
  return (
    <section className="py-20 bg-card text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 text-foreground" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>Brains &gt; Brawn</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            No muscles needed—just bold ideas, smart thinking, and a little bit of genius.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {competitions.map((item) => (
            <Link key={item.id} to={item.href}>
              <Card
                className="group flex flex-col h-full relative overflow-hidden border border-border/40 bg-card/75 backdrop-blur-xl rounded-3xl hover:-translate-y-1 transition-all duration-300 shadow-[0_0px_10px_rgba(0,0,0,0.8)] hover:shadow-[0_0px_20px_rgba(0,0,0,1)]"
              >
                <div className="group relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg transform transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <Badge style={{ color: 'hsl(30deg 92.37% 42.24%)' }} className="bg-white px-3 py-1 text-xs uppercase font-semibold">{item.category}</Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    {item.icons.map((Icon, i) => (
                      <Icon key={i} className="w-5 h-5" />
                    ))}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.subtitle}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

window.CompetitionSection = CompetitionSection;
