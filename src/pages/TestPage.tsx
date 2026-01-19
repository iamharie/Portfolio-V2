import React from "react";
import { motion } from "framer-motion";

/**
 * TestPage Component
 *
 * This component is designed to be extracted as a separate Micro Frontend (MFE).
 * It's currently integrated into the main app but structured for future modularization.
 *
 * MFE Migration Path:
 * 1. Extract this component to a separate repository
 * 2. Set up Module Federation with Webpack/Vite
 * 3. Expose this component as a remote module
 * 4. Import it dynamically in the host application
 */
const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary-light dark:bg-primary text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-accent">TEST Module</h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            This is a standalone module ready for Micro Frontend architecture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-secondary-light dark:bg-secondary p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                Module Features
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Independent deployment capability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Shared theme context support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Isolated business logic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  <span>Framework-agnostic design</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-secondary-light dark:bg-secondary p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                MFE Benefits
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span>Independent team ownership</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span>Technology flexibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span>Faster deployment cycles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span>Scalable architecture</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 bg-secondary-light dark:bg-secondary p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-accent">
              Implementation Status
            </h2>
            <p className="text-lg mb-4">
              This module is currently integrated into the monolithic
              application but is structured to be easily extracted into a
              separate micro frontend.
            </p>
            <div className="bg-primary-light dark:bg-primary p-4 rounded-md">
              <code className="text-sm">
                <div className="mb-2">// Future Module Federation Config:</div>
                <div className="text-green-500">
                  exposes: &#123;'./TestModule': './src/pages/TestPage'&#125;
                </div>
              </code>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-gray-600 dark:text-gray-400 italic">
              "Dedication has no limitation!" - Hariharan Mohan
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestPage;
