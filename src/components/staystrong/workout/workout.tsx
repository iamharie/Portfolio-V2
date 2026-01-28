import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaFire, FaExternalLinkAlt } from "react-icons/fa";
import {
  mensIntermediateWorkoutDays,
  mensBeginnerWorkoutDays,
  womensBeginnerWorkoutDays,
  womensIntermediateWorkoutDays,
} from "./utils/strengthTrainingBlock";

export interface Exercise {
  id: string;
  name: string;
  equipment: string;
  setType: string;
  sets: number | string;
  reps: string;
  rest: number;
  notes: string;
}

export interface WorkoutDay {
  day: string;
  variations: string; // NEW
  link?: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  level: "Beginner" | "Intermediate";
  daysPerWeek?: number;
  icon: React.ReactNode;
  gradient: string;
  workoutDays: WorkoutDay[];
}
// Male Workout Section
const maleBeginnerWorkouts: WorkoutPlan = {
  level: "Beginner",
  // daysPerWeek: 4,
  icon: <FaDumbbell className="text-white text-3xl" />,
  gradient: "from-green-500 to-emerald-600",
  workoutDays: mensBeginnerWorkoutDays,
};

const maleIntermediateWorkouts: WorkoutPlan = {
  level: "Intermediate",
  daysPerWeek: 7,
  icon: <FaFire className="text-white text-3xl" />,
  gradient: "from-orange-500 to-red-600",
  workoutDays: mensIntermediateWorkoutDays,
};

// Female Workout Section
const femaleBeginnerWorkouts: WorkoutPlan = {
  level: "Beginner",
  // daysPerWeek: 40,
  icon: <FaDumbbell className="text-white text-3xl" />,
  gradient: "from-green-500 to-emerald-600",
  workoutDays: womensBeginnerWorkoutDays,
};

const femaleIntermediateWorkouts: WorkoutPlan = {
  level: "Intermediate",
  daysPerWeek: 70,
  icon: <FaFire className="text-white text-3xl" />,
  gradient: "from-orange-500 to-red-600",
  workoutDays: womensIntermediateWorkoutDays,
};
interface ExerciseTableProps {
  exercises: Exercise[];
  dayLabel: string;
  variations: string;
  link?: string;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({
  exercises,
  dayLabel,
  variations,
  link,
}) => {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
        {dayLabel} - {variations}
      </h3>
      {/* Open in StrongApp Link */}
      {link && (
        <div className="mb-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-blue-600 font-medium transition-colors"
            title="Open workout in StrongApp"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            Open in StrongApp
          </a>
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-secondary dark:border-secondary-light shadow-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 border-b border-secondary dark:border-secondary-light">
              <th className="py-3 px-4 text-left font-semibold text-text-light dark:text-text-dark">
                Exercise
              </th>
              <th className="py-3 px-4 text-left font-semibold text-text-light dark:text-text-dark">
                Equipment
              </th>
              <th className="py-3 px-4 text-left font-semibold text-text-light dark:text-text-dark">
                Set Type
              </th>
              <th className="py-3 px-4 text-center font-semibold text-text-light dark:text-text-dark">
                Sets
              </th>
              <th className="py-3 px-4 text-center font-semibold text-text-light dark:text-text-dark">
                Reps
              </th>
              <th className="py-3 px-4 text-center font-semibold text-text-light dark:text-text-dark">
                Rest (sec)
              </th>
              <th className="hidden md:table-cell py-3 px-4 text-left font-semibold text-text-light dark:text-text-dark">
                Notes
              </th>
              {/* Expand button for mobile */}
              <th className="md:hidden py-3 px-4 text-center font-semibold text-text-light dark:text-text-dark">
                Info
              </th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <React.Fragment key={exercise.id}>
                <motion.tr
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border-b border-secondary dark:border-secondary-light transition-colors ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900/30"
                      : "bg-gray-50 dark:bg-gray-800/20"
                  } hover:bg-gray-100 dark:hover:bg-gray-800/50`}
                >
                  {/* Exercise Name */}
                  <td className="py-3 px-4">
                    <span className="font-medium text-text-light dark:text-text-dark">
                      {exercise.name}
                    </span>
                  </td>

                  {/* Equipment */}
                  <td className="py-3 px-4 text-text-light dark:text-text-dark">
                    {exercise.equipment}
                  </td>

                  {/* Set Type */}
                  <td className="py-3 px-4">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
                      {exercise.setType}
                    </span>
                  </td>

                  {/* Sets */}
                  <td className="py-3 px-4 text-center font-semibold text-text-light dark:text-text-dark">
                    {exercise.sets}
                  </td>

                  {/* Reps */}
                  <td className="py-3 px-4 text-center font-semibold text-text-light dark:text-text-dark">
                    {exercise.reps}
                  </td>

                  {/* Rest */}
                  <td className="py-3 px-4 text-center font-semibold text-text-light dark:text-text-dark">
                    {exercise.rest}
                  </td>

                  {/* Notes */}
                  <td className="hidden md:table-cell py-3 px-4 text-text-light dark:text-text-dark max-w-xs">
                    <p className="whitespace-normal leading-relaxed text-xs">
                      {exercise.notes}
                    </p>
                  </td>
                  {/* Expand button - Mobile only */}
                  <td className="md:hidden py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        setExpandedExercise(
                          expandedExercise === exercise.id ? null : exercise.id,
                        )
                      }
                      className="text-accent hover:text-blue-600 font-bold transition-colors"
                      title={
                        expandedExercise === exercise.id
                          ? "Hide notes"
                          : "Show notes"
                      }
                    >
                      {expandedExercise === exercise.id ? "−" : "+"}
                    </button>
                  </td>
                </motion.tr>
                {/* Expandable Notes Row - Mobile only */}
                {expandedExercise === exercise.id && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden bg-blue-50 dark:bg-blue-900/20 border-b border-secondary dark:border-secondary-light"
                  >
                    <td colSpan={7} className="py-3 px-4">
                      <div>
                        <p className="text-xs font-semibold text-text-light dark:text-text-dark mb-2">
                          Notes:
                        </p>
                        <p className="text-xs text-text-light dark:text-text-dark leading-relaxed whitespace-normal">
                          {exercise.notes || "No notes"}
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

interface WorkoutSectionProps {
  plan: WorkoutPlan;
  // plan: any;
}

export const WorkoutSection: React.FC<WorkoutSectionProps> = ({ plan }) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(
    plan.workoutDays[0].day,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-secondary-light dark:bg-secondary rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${plan.gradient} p-6`}>
        <div className="flex items-center justify-center gap-3">
          {plan.icon}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{plan.level}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Day Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {plan.workoutDays.map((workoutDay) => (
            <motion.button
              key={workoutDay.day}
              onClick={() =>
                setExpandedDay(
                  expandedDay === workoutDay.day ? null : workoutDay.day,
                )
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                expandedDay === workoutDay.day
                  ? "bg-accent text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {workoutDay.day}
            </motion.button>
          ))}
        </div>

        {/* Exercise Tables */}
        <div>
          {plan.workoutDays.map((workoutDay) => (
            <motion.div
              key={workoutDay.day}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: expandedDay === workoutDay.day ? 1 : 0,
                height: expandedDay === workoutDay.day ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {expandedDay === workoutDay.day && (
                <ExerciseTable
                  exercises={workoutDay.exercises}
                  dayLabel={workoutDay.day}
                  variations={workoutDay.variations}
                  link={workoutDay.link}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Workout: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
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

        <div className="grid grid-cols-1 gap-8">
          <WorkoutSection plan={maleBeginnerWorkouts} />
          <WorkoutSection plan={maleIntermediateWorkouts} />
          <WorkoutSection plan={femaleBeginnerWorkouts} />
          <WorkoutSection plan={femaleIntermediateWorkouts} />
        </div>
      </div>
    </div>
  );
};

export default Workout;
