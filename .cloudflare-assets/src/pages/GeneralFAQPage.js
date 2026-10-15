const GeneralFAQPage = () => {
  const faqs = [
    {
      question: "What is Make India Foundation?",
      answer: "Make India Foundation is a non-profit organization dedicated to fostering STEM education and innovation among school students across India."
    },
    {
      question: "Who can participate in the competitions?",
      answer: "Our competitions are open to students from grades 6 to 12 across India. specific eligibility criteria may apply for different tracks like ARISE and IGNITE."
    },
    {
      question: "Are the workshops free?",
      answer: "Yes, our online workshops and STEM hub resources are completely free for registered students."
    },
    {
      question: "How can my school partner with you?",
      answer: "Schools can reach out to us via the 'Get in Touch' page to collaborate on Maker Spaces and host local STEM fairs."
    },
    {
      question: "Do I need prior experience to join?",
      answer: "Not at all! Our programs are designed to take you from beginner to innovator. Just bring your curiosity and passion for learning."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">Find answers to common questions about our programs, competitions, and more.</p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border/30">
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-12 text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold mb-3 text-foreground">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">Can't find the answer you're looking for? Please reach out to our team.</p>
            <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:-translate-y-0.5 duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

window.GeneralFAQPage = GeneralFAQPage;
