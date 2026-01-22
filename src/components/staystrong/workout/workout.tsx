import React from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaFire } from "react-icons/fa";

interface WorkoutPlan {
  day: string;
  link: string;
}

const beginnerWorkouts: WorkoutPlan[] = [
  { day: "Day 1", link: "https://link.strong.app/vxzzzjvc" },
  { day: "Day 2", link: "https://example.com/beginner-day2" },
  { day: "Day 3", link: "https://example.com/beginner-day3" },
];

const intermediateWorkouts: WorkoutPlan[] = [
  { day: "Day 1", link: "https://example.com/intermediate-day1" },
  { day: "Day 2", link: "https://example.com/intermediate-day2" },
  { day: "Day 3", link: "https://example.com/intermediate-day3" },
  { day: "Day 4", link: "https://example.com/intermediate-day4" },
  { day: "Day 5", link: "https://example.com/intermediate-day5" },
  { day: "Day 6", link: "https://example.com/intermediate-day6" },
];

const Workout: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-accent">Workout Plans</h1>
          <p className="text-xl text-text-light dark:text-text-dark">
            Choose your fitness level and start your journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Beginner Table */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary-light dark:bg-secondary rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <div className="flex items-center justify-center gap-3">
                <FaDumbbell className="text-white text-3xl" />
                <h2 className="text-3xl font-bold text-white">Beginner</h2>
              </div>
              <p className="text-center text-white/90 mt-2">3 Days per Week</p>
            </div>

            <div className="p-6">
              <div className="overflow-hidden rounded-lg border border-secondary dark:border-secondary-light">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="py-4 px-6 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Day
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Workout
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {beginnerWorkouts.map((workout, index) => (
                      <motion.tr
                        key={workout.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="border-t border-secondary dark:border-secondary-light hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-4 px-6 font-medium text-text-light dark:text-text-dark">
                          {workout.day}
                        </td>
                        <td className="py-4 px-6">
                          <a
                            href={workout.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent hover:text-blue-600 font-semibold transition-colors"
                          >
                            View Workout
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Intermediate Table */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary-light dark:bg-secondary rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6">
              <div className="flex items-center justify-center gap-3">
                <FaFire className="text-white text-3xl" />
                <h2 className="text-3xl font-bold text-white">Intermediate</h2>
              </div>
              <p className="text-center text-white/90 mt-2">6 Days per Week</p>
            </div>

            <div className="p-6">
              <div className="overflow-hidden rounded-lg border border-secondary dark:border-secondary-light">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      <th className="py-4 px-6 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Day
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Workout
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {intermediateWorkouts.map((workout, index) => (
                      <motion.tr
                        key={workout.day}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="border-t border-secondary dark:border-secondary-light hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-4 px-6 font-medium text-text-light dark:text-text-dark">
                          {workout.day}
                        </td>
                        <td className="py-4 px-6">
                          <a
                            href={workout.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent hover:text-blue-600 font-semibold transition-colors"
                          >
                            View Workout
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
