import React from "react";
import { motion } from "framer-motion";

interface StayStrongLandingProps {
  userEmail: string;
  userName: string;
}

const StayStrongLanding: React.FC<StayStrongLandingProps> = ({
  userEmail,
  userName,
}) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-accent">
            Welcome to StayStrong, {userName}!
          </h1>
          <p className="text-xl mb-8 text-text-light dark:text-text-dark">
            Logged in as:{" "}
            <span className="text-accent font-semibold">{userEmail}</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-secondary-light dark:bg-secondary p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                Your Progress
              </h2>
              <ul className="space-y-2 text-text-light dark:text-text-dark">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Workouts Completed: 42</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Current Streak: 7 days</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Total Weight Lifted: 12,450 lbs</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-secondary-light dark:bg-secondary p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                Today's Goals
              </h2>
              <ul className="space-y-2 text-text-light dark:text-text-dark">
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span>Complete upper body workout</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span>Track nutrition intake</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span>10,000 steps walked</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-text-light dark:text-text-dark italic">
              Keep pushing forward! Your dedication is your power.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StayStrongLanding;
