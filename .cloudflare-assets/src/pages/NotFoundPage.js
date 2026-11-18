// Using hash-based routing

const NotFoundPage = () => {
  const { useEffect } = React;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.hash);
  }, []);

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="#/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </main>
  );
};

window.NotFoundPage = NotFoundPage;
