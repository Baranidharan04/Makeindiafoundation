const ComingSoonPage = () => {
  const returnPath = window.sessionStorage.getItem("comingSoonReturnPath") || "/";
  return (
    <div className="min-h-screen flex flex-col bg-[#e6d4c1] text-[#1f1713]">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_10px_28px_rgba(0,0,0,0.16)] overflow-hidden text-center p-10 border border-black/10">
          <div className="w-20 h-20 bg-[#e3f2ee] rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-10 h-10 text-[#138981]" />
          </div>
          <h2 className="text-3xl font-heading font-extrabold mb-4 text-[#1f1713]">Coming Soon!</h2>
          <p className="text-[#372f2a] mb-8 leading-relaxed">
            We are working hard to bring this experience to life. Stay tuned for exciting updates!
          </p>
          <a href={`#${returnPath}`} className="inline-flex items-center gap-2 rounded-md bg-[#168b84] hover:bg-[#0f756f] text-white px-8 py-3 text-sm font-bold shadow-lg transition-colors">
            Return to Previous Page <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div> 
      
      <Footer />
    </div>
  );
};

window.ComingSoonPage = ComingSoonPage;
