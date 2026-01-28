import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDumbbell, FaAppleAlt } from "react-icons/fa";
import Nutrition from "./nutrition/nutrition";
import {
  mensBeginnerWorkoutDays,
  mensIntermediateWorkoutDays,
  womensBeginnerWorkoutDays,
  womensIntermediateWorkoutDays,
} from "./workout/utils/strengthTrainingBlock";
import { WorkoutSection } from "./workout/workout";
import StayStrongFallback from "./StayStrongFallback";

type TabType = "dashboard" | "workout" | "nutrition";
type Gender = "male" | "female" | null;
type Level = "beginner" | "intermediate" | null;

const StayStrongLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedGender, setSelectedGender] = useState<Gender>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level>(null);
  const [showGenderLevelSelector, setShowGenderLevelSelector] = useState(false);

  const handleWorkoutClick = () => {
    setActiveTab("workout");
    setShowGenderLevelSelector(true);
  };

  const handleGenderLevelSelect = (gender: Gender, level: Level) => {
    setSelectedGender(gender);
    setSelectedLevel(level);
    setShowGenderLevelSelector(false);
  };

  const handleBackToDashboard = () => {
    setActiveTab("dashboard");
    setSelectedGender(null);
    setSelectedLevel(null);
    setShowGenderLevelSelector(false);
  };

  const renderWorkoutContent = () => {
    if (showGenderLevelSelector) {
      return (
        <GenderLevelSelector
          onSelect={handleGenderLevelSelect}
          onCancel={() => setActiveTab("dashboard")}
        />
      );
    }

    if (selectedGender && selectedLevel) {
      return (
        <WorkoutWithBackButton
          gender={selectedGender}
          level={selectedLevel}
          onBack={handleBackToDashboard}
        />
      );
    }

    return null;
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Dashboard Tab Content */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-12 text-accent">
              Welcome to StayStrong
            </h1>

            {/* Tab Navigation */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={handleWorkoutClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-lg text-lg"
              >
                <FaDumbbell />
                Start Workout
              </button>
              <button
                onClick={() => setActiveTab("nutrition")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg text-lg"
              >
                <FaAppleAlt />
                Nutrition Plan
              </button>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-text-light dark:text-text-dark text-lg italic">
                Your fitness journey starts here
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Workout Tab Content */}
        {activeTab === "workout" && (
          <AnimatePresence mode="wait">
            <motion.div
              key="workout-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderWorkoutContent()}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Nutrition Tab Content */}
        {activeTab === "nutrition" && (
          <AnimatePresence mode="wait">
            <motion.div
              key="nutrition-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <button
                  onClick={handleBackToDashboard}
                  className="px-6 py-2 bg-secondary-light dark:bg-secondary text-accent rounded-lg hover:bg-secondary dark:hover:bg-secondary-light transition-colors font-semibold"
                >
                  ← Back to Dashboard
                </button>
              </div>
              <StayStrongFallback />
              {/* <Nutrition /> */}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

/**
 * Gender & Level Selector Component
 */
interface GenderLevelSelectorProps {
  onSelect: (
    gender: "male" | "female",
    level: "beginner" | "intermediate",
  ) => void;
  onCancel: () => void;
}
/**
 * Gender & Level Selector Component - Mobile Optimized
 */
// interface GenderLevelSelectorProps {
//   onSelect: (
//     gender: "male" | "female",
//     level: "beginner" | "intermediate",
//   ) => void;
//   onCancel: () => void;
// }

const GenderLevelSelector: React.FC<GenderLevelSelectorProps> = ({
  onSelect,
  onCancel,
}) => {
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | null
  >(null);
  const [selectedLevel, setSelectedLevel] = useState<
    "beginner" | "intermediate" | null
  >(null);

  const handleConfirm = () => {
    if (selectedGender && selectedLevel) {
      onSelect(selectedGender, selectedLevel);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto px-4 sm:px-0"
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-accent mb-3 sm:mb-4">
          Select Your Profile
        </h2>
        <p className="text-sm sm:text-lg text-text-light dark:text-text-dark">
          Choose your gender and fitness level to customize your workout
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-secondary-light dark:bg-secondary p-5 sm:p-8 rounded-2xl shadow-xl space-y-6 sm:space-y-8">
        {/* Gender Selection */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-accent mb-3 sm:mb-4">
            Gender
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {["male", "female"].map((gender) => (
              <motion.button
                key={gender}
                onClick={() => setSelectedGender(gender as "male" | "female")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 sm:p-6 rounded-xl border-2 transition-all capitalize font-semibold text-sm sm:text-lg ${
                  selectedGender === gender
                    ? "border-accent bg-accent/10 shadow-lg text-accent"
                    : "border-secondary dark:border-secondary-light text-text-light dark:text-text-dark hover:border-accent/50"
                }`}
              >
                <div className="text-xl sm:text-3xl mb-1 sm:mb-2">
                  {gender === "male" ? "👨" : "👩"}
                </div>
                {gender}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Level Selection */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-accent mb-3 sm:mb-4">
            Fitness Level
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {["beginner", "intermediate"].map((level) => (
              <motion.button
                key={level}
                onClick={() =>
                  setSelectedLevel(level as "beginner" | "intermediate")
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 sm:p-6 rounded-xl border-2 transition-all capitalize font-semibold text-sm sm:text-lg ${
                  selectedLevel === level
                    ? "border-green-500 bg-green-500/10 shadow-lg text-green-600"
                    : "border-secondary dark:border-secondary-light text-text-light dark:text-text-dark hover:border-green-500/50"
                }`}
              >
                <div className="text-xl sm:text-3xl mb-1 sm:mb-2">
                  {level === "beginner" ? "🟢" : "🔥"}
                </div>
                {level}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Description Cards */}
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-700"
          >
            <p className="text-xs sm:text-sm text-text-light dark:text-text-dark">
              {selectedLevel === "beginner"
                ? "Perfect for those starting their fitness journey with foundational exercises."
                : "For experienced trainers ready for advanced techniques and higher intensity."}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-4 pt-4 sm:pt-6">
          <motion.button
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark border-2 border-secondary dark:border-secondary-light rounded-lg hover:border-accent transition-colors font-semibold text-sm sm:text-base"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleConfirm}
            disabled={!selectedGender || !selectedLevel}
            whileHover={
              selectedGender && selectedLevel ? { scale: 1.02 } : { scale: 1 }
            }
            whileTap={
              selectedGender && selectedLevel ? { scale: 0.98 } : { scale: 1 }
            }
            className={`flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              selectedGender && selectedLevel
                ? "bg-accent text-white hover:bg-blue-600 shadow-lg"
                : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </motion.button>
        </div>

        {/* Mobile Hint */}
        <div className="sm:hidden text-center text-xs text-text-light dark:text-text-dark">
          <p>Tap to select your options</p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Workout Component with Back Button & Filtered Data
 */
interface WorkoutWithBackButtonProps {
  gender: "male" | "female";
  level: "beginner" | "intermediate";
  onBack: () => void;
}

const WorkoutWithBackButton: React.FC<WorkoutWithBackButtonProps> = ({
  gender,
  level,
  onBack,
}) => {
  interface WorkoutPlan {
    level: "Beginner" | "Intermediate";
    icon: React.ReactNode;
    gradient: string;
    workoutDays: any[];
  }

  // Get the appropriate workout plan
  const getWorkoutPlan = (): WorkoutPlan | null => {
    const icon = <FaDumbbell className="text-white text-3xl" />;

    if (gender === "male" && level === "beginner") {
      return {
        level: "Beginner",
        icon,
        gradient: "from-green-500 to-emerald-600",
        workoutDays: mensBeginnerWorkoutDays,
      };
    }
    if (gender === "male" && level === "intermediate") {
      return {
        level: "Intermediate",
        icon,
        gradient: "from-orange-500 to-red-600",
        workoutDays: mensIntermediateWorkoutDays,
      };
    }
    if (gender === "female" && level === "beginner") {
      return {
        level: "Beginner",
        icon,
        gradient: "from-green-500 to-emerald-600",
        workoutDays: womensBeginnerWorkoutDays,
      };
    }
    if (gender === "female" && level === "intermediate") {
      return {
        level: "Intermediate",
        icon,
        gradient: "from-orange-500 to-red-600",
        workoutDays: womensIntermediateWorkoutDays,
      };
    }
    return null;
  };

  const workoutPlan = getWorkoutPlan();

  if (!workoutPlan) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold">Invalid selection</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-secondary-light dark:bg-secondary text-accent rounded-lg hover:bg-secondary dark:hover:bg-secondary-light transition-colors font-semibold"
        >
          ← Back to Profile Selection
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 text-accent">
          {gender === "male" ? "👨" : "👩"} {workoutPlan.level} Workout
        </h1>
        <p className="text-xl text-text-light dark:text-text-dark capitalize">
          {gender} • {level}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Reuse WorkoutSection from workout.tsx */}
        <WorkoutSection plan={workoutPlan} />
      </div>
    </motion.div>
  );
};

export default StayStrongLanding;
