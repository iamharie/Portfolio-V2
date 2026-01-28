import { useState } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "@/config/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setMessage(data.message || "Reset link sent to your email");
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError((err as Error)?.message || "Something went wrong");
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
            <h1 className="text-4xl font-bold mb-4 text-accent">
              Reset Password 🔐
            </h1>
            <p className="text-lg text-text-light dark:text-text-dark">
              Enter your email to receive a password reset link
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-secondary-light dark:bg-secondary p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Email */}
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
                disabled={isLoading || submitted}
              />
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-sm text-red-500"
              >
                {error}
              </motion.p>
            )}

            {/* Success message */}
            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-sm text-green-600"
              >
                {message}
              </motion.p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || submitted}
              className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Sending..."
                : submitted
                  ? "Link Sent ✓"
                  : "Send Reset Link"}
            </button>

            {/* Back to login link */}
            <div className="mt-4 text-center">
              <a
                href="/staystrong"
                className="text-sm text-accent hover:underline"
              >
                Back to Login
              </a>
            </div>
          </motion.form>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-sm text-text-light dark:text-text-dark italic">
              Check your email for the reset link
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
