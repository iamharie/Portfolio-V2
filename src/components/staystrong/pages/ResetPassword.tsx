import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_BASE } from "@/config/api";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<
    "loading" | "ready" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("Validating reset token…");
  const [errors, setErrors] = useState<{ password?: string; form?: string }>(
    {},
  );

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing reset token.");
      return;
    }

    // TODO: Optionally validate token with backend before showing form
    // For now, we'll assume token is valid and user can proceed
    setStatus("ready");
    setMessage("");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { password?: string; form?: string } = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      setStatus("success");
      setMessage("Password reset successfully 🎉");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/staystrong", { replace: true });
      }, 2000);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: (err as Error)?.message || "Something went wrong",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="py-16 px-4">
        <div style={{ maxWidth: "28rem", width: "100%", margin: "0 auto" }}>
          <motion.div className="text-center">
            <p className="text-lg text-text-light dark:text-text-dark">
              {message}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="py-16 px-4">
        <div style={{ maxWidth: "28rem", width: "100%", margin: "0 auto" }}>
          <motion.div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
            <p className="text-lg text-text-light dark:text-text-dark mb-6">
              {message}
            </p>
            <a
              href="/staystrong"
              className="text-accent hover:underline font-semibold"
            >
              Back to Login
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="py-16 px-4">
        <div style={{ maxWidth: "28rem", width: "100%", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4 text-green-600">Success!</h2>
            <p className="text-lg text-text-light dark:text-text-dark mb-6">
              {message}
            </p>
            <p className="text-sm text-text-light dark:text-text-dark">
              Redirecting to login...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

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
              Set New Password 🔐
            </h1>
            <p className="text-lg text-text-light dark:text-text-dark">
              Enter your new password below
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="bg-secondary-light dark:bg-secondary p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="Enter new password (min 6 chars)"
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>

            {/* Error message */}
            {errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-sm text-red-500"
              >
                {errors.password}
              </motion.p>
            )}

            {errors.form && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-sm text-red-500"
              >
                {errors.form}
              </motion.p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
