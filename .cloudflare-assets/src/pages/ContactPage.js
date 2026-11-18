const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main id="main-content" className="flex-1 pt-[72px] md:pt-[88px]">
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

window.ContactPage = ContactPage;
