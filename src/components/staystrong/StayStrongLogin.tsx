import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser, registerUser } from "../../api/auth";

type FormMode = "login" | "register";

interface Errors {
  email?: string;
  password?: string;
  name?: string;
  form?: string;
}

interface TestPageProps {
  onEmailSubmit?: (email: string, name: string) => void;
}

const StayStrongLogin: React.FC<TestPageProps> = ({ onEmailSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<FormMode>("login");
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setInfoMessage("");

    const newErrors: Errors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "login") {
        const data = await loginUser(email, password);

        // store token
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/staystrong/app");

        if (onEmailSubmit) {
          onEmailSubmit(data.user.email, data.user.name || "");
        }
      } else {
        const data = await registerUser(email, password, name || undefined);

        setInfoMessage(
          data?.message || "Account created successfully. Please log in.",
        );
        setMode("login");
        setPassword("");
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: (err as Error)?.message || "Something went wrong",
      }));
    } finally {
      setIsLoading(false);
    }
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
          </div>

          {/* Mode toggle */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => setMode("login")}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md border ${
                mode === "login"
                  ? "bg-accent text-white"
                  : "bg-transparent text-text-light dark:text-text-dark"
              } disabled:opacity-50`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md border ${
                mode === "register"
                  ? "bg-accent text-white"
                  : "bg-transparent text-text-light dark:text-text-dark"
              } disabled:opacity-50`}
            >
              Create Account
            </button>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-secondary-light dark:bg-secondary p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Name (register only, optional) */}
            {mode === "register" && (
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
                >
                  Name (optional)
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
            )}

            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
              >
                Email
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

            {/* Password */}
            {/* add password visiblity for user to toggle */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder={
                    mode === "login"
                      ? "Enter your password"
                      : "Create a password (min 6 chars)"
                  }
                  disabled={isLoading}
                />
                {/* Eye Icon Button */}
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-light dark:text-text-dark hover:text-accent transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </motion.button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Form-level errors or info */}
            {errors.form && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-sm text-red-500"
              >
                {errors.form}
              </motion.p>
            )}
            {infoMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-sm text-green-600"
              >
                {infoMessage}
              </motion.p>
            )}

            {/* Forgot password link (login mode only) */}
            {mode === "login" && (
              <div className="mb-4 text-right">
                <a
                  href="/staystrong/forgot-password"
                  className="text-sm text-accent hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? mode === "login"
                  ? "Logging in..."
                  : "Creating account..."
                : mode === "login"
                  ? "Log In"
                  : "Create Account"}
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
