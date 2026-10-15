var { useState, useEffect, useRef, useMemo, useCallback } = React;

// Simple hash-based Link component for hash routing
const Link = ({ to, children, className, ...props }) => {
  const href = to.startsWith('#') ? to : `#${to}`;
  return <a href={href} className={className} {...props}>{children}</a>;
};

// Helper
const cn = (...classes) => classes.filter(Boolean).join(' ');

const customIcons = {
    Instagram: [
        ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5' }],
        ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }],
        ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5' }]
    ],
    Youtube: [
        ['path', { d: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z' }],
        ['polygon', { points: '9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02' }]
    ],
    Linkedin: [
        ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }],
        ['rect', { width: '4', height: '12', x: '2', y: '9' }],
        ['circle', { cx: '4', cy: '4', r: '2' }]
    ],
    Twitter: [
        ['path', { d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' }]
    ],
    Facebook: [
        ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' }]
    ],
    MessageCircle: [
        ['path', { d: 'm3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z' }]
    ]
};

// ========== ICONS ==========
const Icon = ({ name, className, size = 24, strokeWidth = 2, ...props }) => {
    const icon = customIcons[name] || window.lucide?.icons?.[name] || window.lucide?.[name] || window.lucide?.icons?.HelpCircle || window.lucide?.HelpCircle;
    if (!icon) return null;

    return React.createElement(
        'svg',
        {
            xmlns: 'http://www.w3.org/2000/svg',
            width: size,
            height: size,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            className,
            ...props
        },
        icon.map(([tag, attrs], index) => React.createElement(tag, { key: index, ...attrs }))
    );
};

// Icon Shorthands
const Pill = (props) => <Icon name="Pill" {...props} />;
const Users = (props) => <Icon name="Users" {...props} />;
const AlertTriangle = (props) => <Icon name="AlertTriangle" {...props} />;
const Search = (props) => <Icon name="Search" {...props} />;
const MessageCircle = (props) => <Icon name="MessageCircle" {...props} />;
const X = (props) => <Icon name="X" {...props} />;
const Microscope = (props) => <Icon name="Microscope" {...props} />;
const CircuitBoard = (props) => <Icon name="CircuitBoard" {...props} />;
const XCircle = (props) => <Icon name="XCircle" {...props} />;
const Phone = (props) => <Icon name="Phone" {...props} />;
const Filter = (props) => <Icon name="Filter" {...props} />;
const Wrench = (props) => <Icon name="Wrench" {...props} />;
const TrendingUp = (props) => <Icon name="TrendingUp" {...props} />;
const Battery = (props) => <Icon name="Battery" {...props} />;
const Cpu = (props) => <Icon name="Cpu" {...props} />;
const Atom = (props) => <Icon name="Atom" {...props} />;
const Calculator = (props) => <Icon name="Calculator" {...props} />;
const NavIcon = (props) => <Icon name="Navigation" {...props} />;
const ChevronRight = (props) => <Icon name="ChevronRight" {...props} />;
const Medal = (props) => <Icon name="Medal" {...props} />;
const Video = (props) => <Icon name="Video" {...props} />;
const GraduationCap = (props) => <Icon name="GraduationCap" {...props} />;
const ListChecks = (props) => <Icon name="ListChecks" {...props} />;
const Gauge = (props) => <Icon name="Gauge" {...props} />;
const Smartphone = (props) => <Icon name="Smartphone" {...props} />;
const ChevronDown = (props) => <Icon name="ChevronDown" {...props} />;
const Building = (props) => <Icon name="Building" {...props} />;
const Bot = (props) => <Icon name="Bot" {...props} />;
const Satellite = (props) => <Icon name="Satellite" {...props} />;
const Heart = (props) => <Icon name="Heart" {...props} />;
const Blocks = (props) => <Icon name="Blocks" {...props} />;
const School = (props) => <Icon name="School" {...props} />;
const Terminal = (props) => <Icon name="Terminal" {...props} />;
const BookOpen = (props) => <Icon name="BookOpen" {...props} />;
const CheckCircle2 = (props) => <Icon name="CheckCircle2" {...props} />;
const PenTool = (props) => <Icon name="PenTool" {...props} />;
const Mail = (props) => <Icon name="Mail" {...props} />;
const Bug = (props) => <Icon name="Bug" {...props} />;
const Shield = (props) => <Icon name="Shield" {...props} />;
const Lightbulb = (props) => <Icon name="Lightbulb" {...props} />;
const ExternalLink = (props) => <Icon name="ExternalLink" {...props} />;
const Menu = (props) => <Icon name="Menu" {...props} />;
const Linkedin = (props) => <Icon name="Linkedin" {...props} />;
const Twitter = (props) => <Icon name="Twitter" {...props} />;
const Trophy = (props) => <Icon name="Trophy" {...props} />;
const Download = (props) => <Icon name="Download" {...props} />;
const MapIcon = (props) => <Icon name="Map" {...props} />;
const Zap = (props) => <Icon name="Zap" {...props} />;
const Clock = (props) => <Icon name="Clock" {...props} />;
const FlaskConical = (props) => <Icon name="FlaskConical" {...props} />;
const Award = (props) => <Icon name="Award" {...props} />;
const Compass = (props) => <Icon name="Compass" {...props} />;
const CheckCircle = (props) => <Icon name="CheckCircle" {...props} />;
const Sprout = (props) => <Icon name="Sprout" {...props} />;
const MapPin = (props) => <Icon name="MapPin" {...props} />;
const HelpCircle = (props) => <Icon name="HelpCircle" {...props} />;
const Info = (props) => <Icon name="Info" {...props} />;
const Target = (props) => <Icon name="Target" {...props} />;
const Star = (props) => <Icon name="Star" {...props} />;
const Beaker = (props) => <Icon name="Beaker" {...props} />;
const ShieldCheck = (props) => <Icon name="ShieldCheck" {...props} />;
const Youtube = (props) => <Icon name="Youtube" {...props} />;
const Facebook = (props) => <Icon name="Facebook" {...props} />;
const Brain = (props) => <Icon name="Brain" {...props} />;
const Dna = (props) => <Icon name="Dna" {...props} />;
const FileText = (props) => <Icon name="FileText" {...props} />;
const Calendar = (props) => <Icon name="Calendar" {...props} />;
const Leaf = (props) => <Icon name="Leaf" {...props} />;
const UserX = (props) => <Icon name="UserX" {...props} />;
const Rocket = (props) => <Icon name="Rocket" {...props} />;
const ChevronLeft = (props) => <Icon name="ChevronLeft" {...props} />;
const Activity = (props) => <Icon name="Activity" {...props} />;
const User = (props) => <Icon name="User" {...props} />;
const Database = (props) => <Icon name="Database" {...props} />;
const MessageSquare = (props) => <Icon name="MessageSquare" {...props} />;
const ArrowRight = (props) => <Icon name="ArrowRight" {...props} />;
const Instagram = (props) => <Icon name="Instagram" {...props} />;
const Globe = (props) => <Icon name="Globe" {...props} />;
const Layers = (props) => <Icon name="Layers" {...props} />;
const Eye = (props) => <Icon name="Eye" {...props} />;
const Sparkles = (props) => <Icon name="Sparkles" {...props} />;
const Settings = (props) => <Icon name="Settings" {...props} />;

// ========== UI COMPONENTS ==========
const Button = ({ className, variant = 'default', size = 'default', children, asChild, ...props }) => {
    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        arise: "bg-blue-600 text-white hover:bg-blue-500",
        ignite: "bg-[#006241] text-white hover:bg-[#008457]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
    };
    const sizes = {
        default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", lg: "h-12 rounded-md px-8 text-lg", icon: "h-10 w-10",
    };
    const classes = cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant] || variants.default, sizes[size] || sizes.default, className
    );
    return <button className={classes} {...props}>{children}</button>;
};

const Badge = ({ children, className, variant = "default", ...props }) => (
    <span className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "outline" ? "border-foreground text-foreground" : "bg-primary text-primary-foreground border-transparent",
        className
    )} {...props}>
        {children}
    </span>
);

const Card = ({ children, className, ...props }) => <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)} {...props}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</h3>;
const CardDescription = ({ children, className }) => <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
const CardContent = ({ children, className }) => <div className={cn("p-6 pt-0", className)}>{children}</div>;
const CardFooter = ({ children, className }) => <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>;

const Tabs = ({ children, defaultValue, className }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return <div className={className}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { activeTab, setActiveTab }) : child)}</div>;
};
const TabsList = ({ children, className, activeTab, setActiveTab }) => (
    <div className={className}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { activeTab, setActiveTab }) : child)}</div>
);
const TabsTrigger = ({ children, value, className, activeTab, setActiveTab }) => (
    <button onClick={() => setActiveTab(value)} className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        activeTab === value ? "bg-background text-foreground shadow-sm" : "hover:text-foreground", className
    )}>{children}</button>
);
const TabsContent = ({ children, value, activeTab, className }) =>
    activeTab === value ? <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>{children}</div> : null;

const Accordion = ({ children, className, type, collapsible }) => {
    const [openValue, setOpenValue] = useState(null);
    return <div className={className}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { openValue, setOpenValue }) : child)}</div>;
};
const AccordionItem = ({ children, value, className, openValue, setOpenValue }) => (
    <div className={cn("border-b", className)}>{React.Children.map(children, child => React.isValidElement(child) ? React.cloneElement(child, { isOpen: openValue === value, onToggle: () => setOpenValue(openValue === value ? null : value) }) : child)}</div>
);
const AccordionTrigger = ({ children, className, isOpen, onToggle }) => (
    <button onClick={onToggle} className={cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline", className)}>
        {children}
        <Icon name="ChevronDown" className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
);
const AccordionContent = ({ children, className, isOpen }) =>
    isOpen ? <div className={cn("overflow-hidden text-sm transition-all pb-4 pt-0", className)}>{children}</div> : null;

const Input = ({ className, ...props }) => (
    <input className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
);

const Textarea = ({ className, ...props }) => (
    <textarea className={cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
);

const Dialog = ({ open, onOpenChange, children }) => open ? <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => onOpenChange(false)}><div onClick={(e) => e.stopPropagation()} className="relative z-50 w-full max-w-lg bg-background rounded-xl shadow-lg border border-border p-6">{children}</div></div> : null;
const DialogContent = ({ className, children }) => <div className={cn("relative", className)}>{children}</div>;
const DialogHeader = ({ className, children }) => <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>{children}</div>;
const DialogTitle = ({ className, children }) => <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h2>;
const DialogDescription = ({ className, children }) => <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;

// ========== REGISTRATION MODAL ==========
const RegistrationModal = () => {
    const { isOpen, closeModal, selectedTrack } = useRegistration();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [formTrack, setFormTrack] = useState(selectedTrack);

    useEffect(() => {
        if (isOpen) {
            setFormTrack(selectedTrack);
            setIsSubmitted(false);
            setIsSubmitting(false);
            setError("");
        }
    }, [isOpen, selectedTrack]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fd = new FormData(form);
        const data = {
            fullName: fd.get("fullName"),
            grade: fd.get("grade"),
            track: formTrack,
            stream: fd.get("stream"),
            school: fd.get("school"),
            email: fd.get("email"),
            mobile: fd.get("mobile"),
            projectIdea: fd.get("projectIdea")
        };

        setIsSubmitting(true);
        setError("");
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || "Registration failed. Please try again.");
            }
            setIsSubmitted(true);
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-slate-950 text-white border border-slate-800 rounded-[2rem] w-full max-w-[500px] shadow-2xl p-6 sm:p-10 relative overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-16 translate-x-16" />
                <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"><Icon name="X" size={24} /></button>
                
                {!isSubmitted ? (
                    <>
                        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                            {selectedTrack === "arise" ? <Icon name="Rocket" className="text-blue-400 w-6 h-6" /> : <Icon name="Sparkles" className="text-emerald-400 w-6 h-6" />}
                            Register for Competition
                        </h2>
                        <p className="text-slate-400 mb-6 text-sm">Join the largest STEM movement in India. Fill out the details below to start your journey.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-slate-300 text-sm">Full Name</label>
                                <Input required name="fullName" placeholder="Enter your full name" className="bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-slate-300 text-sm">Grade</label>
                                    <select required name="grade" className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                        <option value="">Select</option>
                                        {[6, 7, 8, 9, 10, 11, 12].map(g => <option key={g} value={g}>Grade {g}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-slate-300 text-sm">Track</label>
                                    <select required value={formTrack} onChange={(e) => setFormTrack(e.target.value)} disabled={selectedTrack === "arise" || selectedTrack === "ignite"} className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed">
                                        <option value="general">General</option>
                                        <option value="arise">ARISE (9-12)</option>
                                        <option value="ignite">IGNITE (6-8)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-slate-300 text-sm">Stream of Study</label>
                                <select required name="stream" className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                    <option value="">Select Stream</option>
                                    <option value="science">Science (PCM/PCB)</option>
                                    <option value="commerce">Commerce</option>
                                    <option value="arts">Arts / Humanities</option>
                                    <option value="general">General (Middle School)</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-slate-300 text-sm">School Name</label>
                                <Input required name="school" placeholder="Enter your school name" className="bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-slate-300 text-sm">Email Address</label>
                                <Input required name="email" type="email" placeholder="your@email.com" className="bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-slate-300 text-sm">Mobile Number</label>
                                <Input required name="mobile" type="tel" placeholder="Enter your mobile number" className="bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-slate-300 text-sm">Brief Project Idea (Optional)</label>
                                <Textarea name="projectIdea" placeholder="Tell us what you want to build..." className="bg-slate-900 border-slate-700 text-white resize-none h-20" />
                            </div>
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                            <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 font-bold py-6 text-lg rounded-xl mt-4 disabled:opacity-60 disabled:cursor-not-allowed">
                                {isSubmitting ? "Submitting..." : "Complete Registration"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="py-12 flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                            <Icon name="CheckCircle2" className="text-emerald-500 w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold">Awesome!</h2>
                            <p className="text-slate-400">You've successfully registered for the competition. Check your email for next steps and project guidelines.</p>
                        </div>
                        <Button onClick={closeModal} className="bg-white text-black hover:bg-slate-200 rounded-full px-8">Close Window</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ScrollToTop
const ScrollToTop = ({ currentPath }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [currentPath]);

  return null;
};

// Export to window
window.cn = cn;
window.Link = Link;
window.Icon = Icon;
window.Button = Button;
window.Badge = Badge;
window.Card = Card;
window.CardHeader = CardHeader;
window.CardTitle = CardTitle;
window.CardDescription = CardDescription;
window.CardContent = CardContent;
window.CardFooter = CardFooter;
window.Tabs = Tabs;
window.TabsList = TabsList;
window.TabsTrigger = TabsTrigger;
window.TabsContent = TabsContent;
window.Accordion = Accordion;
window.AccordionItem = AccordionItem;
window.AccordionTrigger = AccordionTrigger;
window.AccordionContent = AccordionContent;
window.Input = Input;
window.Textarea = Textarea;
window.Dialog = Dialog;
window.DialogContent = DialogContent;
window.DialogHeader = DialogHeader;
window.DialogTitle = DialogTitle;
window.DialogDescription = DialogDescription;
window.RegistrationModal = RegistrationModal;
window.ScrollToTop = ScrollToTop;

// Icon shorthands
window.Pill = Pill; window.Users = Users; window.AlertTriangle = AlertTriangle; window.Search = Search;
window.MessageCircle = MessageCircle; window.X = X; window.Microscope = Microscope; window.CircuitBoard = CircuitBoard;
window.XCircle = XCircle; window.Phone = Phone; window.Filter = Filter; window.Wrench = Wrench;
window.TrendingUp = TrendingUp; window.Battery = Battery; window.Cpu = Cpu; window.Atom = Atom;
window.Calculator = Calculator; window.NavIcon = NavIcon; window.ChevronRight = ChevronRight; window.Medal = Medal;
window.Video = Video; window.GraduationCap = GraduationCap; window.ListChecks = ListChecks; window.Gauge = Gauge;
window.Smartphone = Smartphone; window.ChevronDown = ChevronDown; window.Building = Building; window.Bot = Bot;
window.Satellite = Satellite; window.Heart = Heart; window.Blocks = Blocks; window.School = School;
window.Terminal = Terminal; window.BookOpen = BookOpen; window.CheckCircle2 = CheckCircle2; window.PenTool = PenTool;
window.Mail = Mail; window.Bug = Bug; window.Shield = Shield; window.Lightbulb = Lightbulb;
window.ExternalLink = ExternalLink; window.Menu = Menu; window.Linkedin = Linkedin; window.Twitter = Twitter;
window.Trophy = Trophy; window.Download = Download; window.MapIcon = MapIcon; window.Zap = Zap;
window.Clock = Clock; window.FlaskConical = FlaskConical; window.Award = Award; window.Compass = Compass;
window.CheckCircle = CheckCircle; window.Sprout = Sprout; window.MapPin = MapPin; window.HelpCircle = HelpCircle; window.Info = Info;
window.Target = Target; window.Star = Star; window.Beaker = Beaker; window.ShieldCheck = ShieldCheck;
window.Youtube = Youtube; window.Facebook = Facebook; window.Brain = Brain; window.Dna = Dna;
window.FileText = FileText; window.Calendar = Calendar; window.Leaf = Leaf; window.UserX = UserX;
window.Rocket = Rocket; window.ChevronLeft = ChevronLeft; window.Activity = Activity; window.User = User;
window.Database = Database; window.MessageSquare = MessageSquare; window.ArrowRight = ArrowRight; window.Instagram = Instagram;
window.Globe = Globe; window.Layers = Layers; window.Eye = Eye; window.Sparkles = Sparkles; window.Settings = Settings;
