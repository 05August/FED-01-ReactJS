import React from "react";

const FeatureContext = React.createContext(null);

const FeatureProvider = ({ children }) => {
  return (
    <FeatureContext.Provider
      value={{
        success: (alertText) => {
          alert(alertText);
        },
        error: (alertText) => {
          alert(alertText);
        },
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export { FeatureProvider };
export default FeatureContext;
