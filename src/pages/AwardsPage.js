const AwardsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-28 pb-20 sm:pt-36 sm:pb-20 border-b border-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground" style={{ textShadow: '2px 2px 0px rgba(80, 20, 100, 0.4)' }}>
              Honoring Excellence
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Outstanding projects will be recognized and rewarded.
              Details regarding the exact prizes and benefits will be announced soon!
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 flex-1 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-primary/5 blur-3xl rounded-full -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            <Card className="relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-primary/20 bg-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
              <CardHeader className="text-center pt-10 pb-4">
                <div className="mx-auto bg-gradient-to-br from-yellow-300 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600">
                  Award 1
                </CardTitle>
                <CardDescription className="text-base mt-2 font-medium text-foreground">
                  Categories & Benefits to be specified
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-10">
                <p className="text-muted-foreground text-sm text-justify">
                  Details about criteria, qualification, prizes, certificates, and potential mentorship opportunities for this tier will be updated here soon.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-primary/20 bg-card sm:-translate-y-4 sm:hover:-translate-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-400/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
              <CardHeader className="text-center pt-10 pb-4">
                <div className="mx-auto bg-gradient-to-br from-slate-300 to-slate-500 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl ring-4 ring-slate-100 dark:ring-slate-800">
                  <Medal className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-600">
                  Award 2
                </CardTitle>
                <CardDescription className="text-base mt-2 font-medium text-foreground">
                  Categories & Benefits to be specified
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-10">
                <p className="text-muted-foreground text-sm text-justify">
                  Details about criteria, qualification, prizes, certificates, and potential mentorship opportunities for this tier will be updated here soon.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-primary/20 bg-card">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-700/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
              <CardHeader className="text-center pt-10 pb-4">
                <div className="mx-auto bg-gradient-to-br from-orange-400 to-orange-700 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700">
                  Award 3
                </CardTitle>
                <CardDescription className="text-base mt-2 font-medium text-foreground">
                  Categories & Benefits to be specified
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-10">
                <p className="text-muted-foreground text-sm text-justify">
                  Details about criteria, qualification, prizes, certificates, and potential mentorship opportunities for this tier will be updated here soon.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

window.AwardsPage = AwardsPage;
