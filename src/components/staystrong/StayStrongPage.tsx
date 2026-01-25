import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaAppleAlt } from "react-icons/fa";
import StayStrongLogin from "./StayStrongLogin";
import StayStrongLanding from "./StayStrongLanding";
import Workout from "./workout/workout";
import Nutrition from "./nutrition/nutrition";

type TabType = "workout" | "nutrition";

const StayStrongPage: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("workout");

  const handleEmailSubmit = (email: string, name: string) => {
    setUserEmail(email);
    setUserName(name);
  };

  return (
    <>
      <StayStrongLogin />

      {/* <Nutrition />
      <Workout /> */}
      {/* {userEmail ? (
        <StayStrongLanding userEmail={userEmail} userName={userName || ""} />
      ) : (
        <StayStrongLogin onEmailSubmit={handleEmailSubmit} />
      )} */}
    </>

    //Uncomment below to implement toggle view --> future work
    // <div className="min-h-screen bg-background-light dark:bg-background">
    //   {/* Tab Navigation */}
    //   <div className="sticky top-[64px] z-40 bg-background-light dark:bg-background">
    //     <div className="container mx-auto px-4 py-6">
    //       <div className="flex justify-center">
    //         <div className="inline-flex bg-secondary-light dark:bg-secondary rounded-xl p-2 shadow-lg">
    //           {/* Workout Tab */}
    //           <button
    //             onClick={() => setActiveTab("workout")}
    //             className={`relative flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
    //               activeTab === "workout"
    //                 ? "text-white"
    //                 : "text-text-light dark:text-text-dark hover:text-accent"
    //             }`}
    //           >
    //             {activeTab === "workout" && (
    //               <motion.div
    //                 layoutId="activeTab"
    //                 className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg"
    //                 transition={{
    //                   type: "spring",
    //                   bounce: 0.2,
    //                   duration: 0.6,
    //                 }}
    //               />
    //             )}
    //             <FaDumbbell className="text-2xl relative z-10" />
    //             <span className="text-lg relative z-10">Workout</span>
    //           </button>

    //           {/* Nutrition Tab */}
    //           <button
    //             onClick={() => setActiveTab("nutrition")}
    //             className={`relative flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
    //               activeTab === "nutrition"
    //                 ? "text-white"
    //                 : "text-text-light dark:text-text-dark hover:text-accent"
    //             }`}
    //           >
    //             {activeTab === "nutrition" && (
    //               <motion.div
    //                 layoutId="activeTab"
    //                 className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg"
    //                 transition={{
    //                   type: "spring",
    //                   bounce: 0.2,
    //                   duration: 0.6,
    //                 }}
    //               />
    //             )}
    //             <FaAppleAlt className="text-2xl relative z-10" />
    //             <span className="text-lg relative z-10">Nutrition</span>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Tab Content */}
    //   <motion.div
    //     key={activeTab}
    //     initial={{ opacity: 0, x: 20 }}
    //     animate={{ opacity: 1, x: 0 }}
    //     exit={{ opacity: 0, x: -20 }}
    //     transition={{ duration: 0.4 }}
    //   >
    //     {activeTab === "workout" ? <Workout /> : <Nutrition />}
    //   </motion.div>

    // </div>
  );
};

export default StayStrongPage;
