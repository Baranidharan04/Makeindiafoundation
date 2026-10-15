var { useState, useEffect } = React;

// Simple hash-based Link component for navigation

const NAV_ITEMS = [
  {
    id: "competitions",
    label: "Competitions",
    icon: Trophy,
    children: [
      { id: "competitions-guidelines", label: "Guidelines and Rules", href: "/competitions/guidelines" },
      { id: "competitions-arise", label: "ARISE", href: "/competitions/arise" },
      { id: "competitions-ignite", label: "IGNITE", href: "/competitions/ignite" },
      { id: "competitions-categories", label: "Categories and Sub-Categories", href: "/competitions/categories" },
      { id: "competitions-awards", label: "Awards MIF", href: "/competitions/awards" },
    ]
  },
  {
    id: "stem-workshops",
    label: "STEM Hub",
    icon: Blocks,
    children: [
      { id: "stem-workshops-main", label: "STEM Workshops", href: "/stem-workshops" },
      { id: "makers-space", label: "Maker Space", href: "/makers-space" },
    ]
  },
  { id: "about", label: "About Us", icon: Users, href: "/about" },
  { id: "faq", label: "FAQ", icon: HelpCircle, href: "/faq" },
  { id: "contact", label: "Get in Touch", icon: Mail, href: "/contact" },
  { id: "volunteer-registration", label: "Volunteer Registration", icon: Heart, href: "/volunteer-registration" },
];

const NavButton = ({
  item,
  isMobile = false,
  isScrolled,
  isActive,
  onDropdownToggle,
  isDropdownOpen = false
}) => {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  let textColor = "";
  if (isMobile) {
    textColor = "text-foreground hover:text-primary";
  } else {
    if (isScrolled) {
      textColor = isActive ? "text-primary" : "text-foreground hover:text-primary";
    } else {
      textColor = isActive ? "text-primary" : "text-white hover:text-primary";
    }
  }

  const buttonContent = (
    <>
      {Icon && <Icon className="w-4 h-4" />}
      {item.label}
      {hasChildren && <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />}
      {!isMobile && !hasChildren && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      )}
      {!isMobile && !hasChildren && isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
      )}
    </>
  );

  if (hasChildren) {
    return (
      <div className="relative">
        <button
          onClick={() => onDropdownToggle?.(item.id)}
          className={`
            flex items-center gap-2 transition-all duration-200 font-medium relative group
            ${isMobile
              ? `w-full text-left py-3 px-4 ${textColor} hover:bg-primary/5 rounded-lg`
              : `${textColor}`
            }
          `}
        >
          {buttonContent}
        </button>

        {!isMobile && isDropdownOpen && (
          <div className={`
            absolute top-full left-0 mt-2 min-w-[200px] bg-card/95 backdrop-blur-sm rounded-lg shadow-xl border border-border/50 py-2
            ${isMobile ? 'relative top-0 mt-1 bg-card rounded-lg' : ''}
          `}>
            {item.children?.map((child) => (
              <Link
                key={child.id}
                to={child.href || '#'}
                className="block px-4 py-2 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href || '#'}
      className={`
        flex items-center gap-2 transition-all duration-200 font-medium
        ${isMobile
          ? `w-full text-left py-3 px-4 ${textColor} hover:bg-primary/5 rounded-lg`
          : `${textColor} relative group`
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {item.label}
      {!isMobile && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      )}
      {!isMobile && isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
      )}
    </Link>
  );
};

const MobileMenu = ({ isOpen, items, onRegisterClick, openDropdowns, onDropdownToggle }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden animate-fade-in bg-card/95 backdrop-blur-sm rounded-2xl mt-2 p-4 shadow-xl border border-border/50">
      <div className="space-y-1">
        {items.map((item) => (
          <div key={item.id}>
            <NavButton
              item={item}
              isMobile
              isScrolled={true}
              isActive={false}
              onDropdownToggle={onDropdownToggle}
              isDropdownOpen={openDropdowns.includes(item.id)}
            />
            {item.children && openDropdowns.includes(item.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    to={child.href || '#'}
                    className="block py-2 px-4 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pt-4 mt-4 border-t border-border/50">
        <Button
          variant="default"
          className="w-full bg-gradient-to-r from-[#D99A1E] via-[#F5B942] to-[#D99A1E] hover:from-[#C48612] hover:via-[#E8A928] hover:to-[#C48612] text-slate-950 font-bold rounded-full btn-hover-lift py-6 text-base shadow-lg transition-all border-2 border-transparent"
          onClick={onRegisterClick}
        >
          <Trophy className="w-5 h-5 mr-2" />
          Register for Competition
        </Button>
        <div className="text-xs text-muted-foreground text-center mt-3">
          Open to Indian students in Grades 6-12
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (id) => {
    setOpenDropdowns(prev =>
      prev.includes(id)
        ? prev.filter(dropdownId => dropdownId !== id)
        : [...prev, id]
    );
  };

  const { openModal } = useRegistration();

  const handleRegisterClick = () => {
    if (currentHash.includes('/competitions/arise')) {
      openModal("arise");
    } else if (currentHash.includes('/competitions/ignite')) {
      openModal("ignite");
    } else {
      openModal("general");
    }
  };

  const isActive = (href) => {
    if (!href) return false;
    const hashPath = currentHash.replace('#', '') || '/';
    return hashPath === href;
  };

  const registrationButtonClass = currentHash.includes('/competitions/arise')
    ? 'bg-blue-600 hover:bg-blue-500 border-blue-300'
    : currentHash.includes('/competitions/ignite')
      ? 'bg-[#006241] hover:bg-[#008457] border-emerald-300'
      : 'bg-gradient-to-r from-[#D99A1E] via-[#F5B942] to-[#D99A1E] hover:from-[#C48612] hover:via-[#E8A928] hover:to-[#C48612] border-white';
  const registrationButtonTextClass = currentHash.includes('/competitions/arise') || currentHash.includes('/competitions/ignite')
    ? 'text-white'
    : 'text-slate-950';
  const registrationButtonVariant = currentHash.includes('/competitions/arise')
    ? 'arise'
    : currentHash.includes('/competitions/ignite')
      ? 'ignite'
      : 'default';

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8
        ${isScrolled ? "py-3 bg-card/80 backdrop-blur-md shadow-md" : "py-6 bg-transparent"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${isScrolled ? "bg-white/10 backdrop-blur-md border border-white/20" : "bg-white/10 backdrop-blur-md border border-white/20"}`}>
            <img src="public/logo.png" alt="Make India Foundation Logo" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-heading font-bold transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>
              Make India
            </span>
            <span className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase leading-none mt-0.5">
              Foundation
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isScrolled={isScrolled}
              isActive={isActive(item.href)}
              onDropdownToggle={handleDropdownToggle}
              isDropdownOpen={openDropdowns.includes(item.id)}
            />
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            variant={registrationButtonVariant}
            className={`${registrationButtonClass} ${registrationButtonTextClass} font-bold rounded-full btn-hover-lift shadow-lg transition-all border-2 ${isScrolled ? 'border-transparent' : ''}`}
            onClick={handleRegisterClick}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Register Now
          </Button>
        </div>

        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-foreground hover:bg-primary/10" : "text-white hover:bg-white/10"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        items={NAV_ITEMS}
        onRegisterClick={handleRegisterClick}
        openDropdowns={openDropdowns}
        onDropdownToggle={handleDropdownToggle}
      />
    </nav>
  );
};

window.Navigation = Navigation;
