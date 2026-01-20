import React, { useState } from "react";
import { motion } from "framer-motion";

interface TestPageProps {
  onEmailSubmit?: (email: string, name: string) => void;
}

const StayStrongLogin: React.FC<TestPageProps> = ({ onEmailSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ name: "", email: "" });

    let hasError = false;
    const newErrors = { name: "", email: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onEmailSubmit) {
        onEmailSubmit(email, name);
      }
    }, 500);
  };

  return (
    <div className="py-16 px-4">
      <div style={{ maxWidth: "28rem", width: "100%", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 text-accent">
              StayStrong 💪🏼
            </h1>
            <p className="text-xl text-text-light dark:text-text-dark">
              ⚠️ Work In Progress ⚠️
            </p>
            {/* <p className="text-xl text-text-light dark:text-text-dark">
              Enter your details to access your fitness journey
            </p> */}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-secondary-light dark:bg-secondary p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="Enter your name"
                disabled={isLoading}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={true}
              // disabled={isLoading}
              className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Validating..." : "Get Started"}
            </button>
          </motion.form>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-sm text-text-light dark:text-text-dark italic">
              "Dedication has no limitation!" - Hariharan Mohan
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StayStrongLogin;
