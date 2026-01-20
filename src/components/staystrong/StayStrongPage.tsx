import React, { useState } from "react";
import StayStrongLogin from "./StayStrongLogin";
import StayStrongLanding from "./StayStrongLanding";

const StayStrongPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const handleEmailSubmit = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
  };

  return (
    <>
      {userEmail ? (
        <StayStrongLanding userEmail={userEmail} userName={userName || ""} />
      ) : (
        <StayStrongLogin onEmailSubmit={handleEmailSubmit} />
      )}
    </>
  );
};

export default StayStrongPage;
