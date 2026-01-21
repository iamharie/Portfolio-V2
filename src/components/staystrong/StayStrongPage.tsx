import React, { useState } from "react";
import StayStrongLogin from "./StayStrongLogin";
import StayStrongLanding from "./StayStrongLanding";
import Workout from "./workout/workout";
import Nutrition from "./nutrition/nutrition";

const StayStrongPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const handleEmailSubmit = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
  };

  return (
    <>
      <Nutrition />
      <Workout />
      {/* {userEmail ? (
        <StayStrongLanding userEmail={userEmail} userName={userName || ""} />
      ) : (
        <StayStrongLogin onEmailSubmit={handleEmailSubmit} />
      )} */}
    </>
  );
};

export default StayStrongPage;
