const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email",
    details: [
      "students@makeindiafoundation.org",
      "schools@makeindiafoundation.org",
      "mentors@makeindiafoundation.org"
    ],
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    details: [
      "1800-MAKE-INDIA (Toll Free)",
      "+91-9876543210 (WhatsApp for Students)",
      "+91-9876543211 (Schools Helpline)"
    ],
    color: "bg-secondary/10 text-secondary",
    action: {
      text: "Chat with us on WhatsApp",
      href: "https://wa.me/919876543210"
    }
  },
  {
    icon: MapPin,
    title: "Regional Centers",
    details: [
      "Delhi (Headquarters)",
      "Bengaluru (Tech Hub)",
      "Mumbai | Hyderabad",
      "Pune | Chennai | Kolkata"
    ],
    color: "bg-accent/20 text-accent-dark"
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [
      "Monday - Saturday: 9:00 AM - 6:00 PM IST",
      "Sunday: 10:00 AM - 2:00 PM IST",
      "24/7 WhatsApp Support for Students"
    ],
    color: "bg-primary/10 text-primary"
  }
];

const INTEREST_CATEGORIES = [
  "Middle School Competition",
  "High School Competition",
  "Start a School Club",
  "Teacher/Coordinator Training",
  "Become a Mentor",
  "Corporate Partnership",
  "Hardware Donations",
  "Other"
];

const validateForm = (formData) => {
  const errors = [];
  if (!formData.name.trim()) errors.push("Name is required");
  if (!formData.email.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("Invalid email format");
  }
  if (formData.phone && !/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
    errors.push("Invalid phone number");
  }
  if (!formData.category) errors.push("Please select an interest category");
  if (!formData.message.trim()) errors.push("Message is required");
  return errors;
};

const ContactInfoCard = ({ info }) => {
  const Icon = info.icon;
  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <div className={`w-14 h-14 ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
            {info.title}
          </h4>
          <div className="space-y-1">
            {info.details.map((detail, index) => (
              <p key={index} className="text-muted-foreground text-justify">
                {detail}
              </p>
            ))}
          </div>
          {info.action && (
            <a
              href={info.action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {info.action.text} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState({ type: "", text: "" });
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    category: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    const errors = validateForm(formData);
    if (errors.length > 0) {
      setStatus({ type: "error", text: "Please fix the following: " + errors.join(". ") });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          message: formData.message
        })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send message.");
      }
      setStatus({ type: "success", text: "Message sent successfully! Our student coordinator will contact you within 24 hours." });
      setFormData({
        name: "",
        email: "",
        phone: "",
        school: "",
        grade: "",
        category: "",
        message: "",
      });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
            Contact Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            We're Here to <span className="text-primary">Help You Innovate</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have questions about the competition, workshops, or how to get started?
            Our dedicated support team is ready to assist you on your STEM journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            {CONTACT_INFO.map((info, index) => (
              <ContactInfoCard key={index} info={info} />
            ))}
          </div>

          <div className="lg:col-span-2">
            <Card className="p-8 md:p-10 border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-primary" aria-hidden="true" />
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-describedby={status.text ? "contact-form-status" : undefined}>
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium text-foreground block">
                    Full Name <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Arjun Sharma"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground block">
                    Email Address <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="arjun@email.com"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-sm font-medium text-foreground block">
                    Phone Number
                  </label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-category" className="text-sm font-medium text-foreground block">
                    Interest Category <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground"
                  >
                    <option value="">Select a category</option>
                    {INTEREST_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground block">
                    How can we help? <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your query or project idea..."
                    className="min-h-[150px] bg-background/50"
                  />
                </div>
                {status.text && (
                  <div
                    id="contact-form-status"
                    role="status"
                    aria-live="polite"
                    className={`md:col-span-2 p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}
                  >
                    {status.text}
                  </div>
                )}
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-6 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl btn-hover-lift disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Zap className="w-5 h-5" aria-hidden="true" />
                        Send Message
                      </span>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4 italic text-center md:text-left">
                    * Required fields. We value your privacy and will never share your details.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Contact = Contact;
