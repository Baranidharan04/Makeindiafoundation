const App = () => {
  const [currentPath, setCurrentPath] = React.useState(window.location.hash.slice(1) || "/");

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || "/");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderPage = () => {
    const path = currentPath;
    if (path === "/" || path === "") return <IndexPage />;
    if (path === "/about") return <AboutPage />;
    if (path === "/workshop" || path === "/stem-workshops") return <WorkshopPage />;
    if (path === "/makers-space") return <MakersSpacePage />;
    if (path === "/competitions/arise") return <ArisePage />;
    if (path === "/competitions/ignite") return <IgnitePage />;
    if (path === "/competitions/guidelines") return <GuidelinesPage />;
    if (path === "/competitions" || path === "competitions/index.html") return <CompetitionsPage />;
    if (path === "/competitions/categories") return <CompetitionCategoriesPage />;
    if (path === "/competitions/rules") return <CompetitionRulesPage />;
    if (path === "/competitions/faq") return <CompetitionFAQPage />;
    if (path === "/competitions/find-fair") return <FindFairPage />;
    if (path === "/competitions/database") return <CompetitionDatabasePage />;
    if (path === "/competitions/awards") return <AwardsPage />;
    if (path === "/faq") return <GeneralFAQPage />;
    if (path === "/contact") return <ContactPage />;
    if (path === "/volunteer-registration") return <VolunteerRegistrationPage />;
    if (path === "/coming-soon") return <ComingSoonPage />;
    return <NotFoundPage />;
  };

  return (
    <RegistrationProvider>
      <ScrollToTop currentPath={currentPath} />
      {renderPage()}
      <RegistrationModal />
    </RegistrationProvider>
  );
};

window.App = App;
