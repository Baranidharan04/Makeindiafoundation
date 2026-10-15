var { useState, createContext, useContext } = React;

const RegistrationContext = createContext(undefined);

const RegistrationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("general");

  const openModal = (track = "general") => {
    setSelectedTrack(track);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <RegistrationContext.Provider value={{ isOpen, selectedTrack, openModal, closeModal }}>
      {children}
    </RegistrationContext.Provider>
  );
};

const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};

window.RegistrationProvider = RegistrationProvider;
window.useRegistration = useRegistration;
