import { useState, ChangeEvent, FormEvent } from "react";
import { API_BASE } from "@/config/api";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      const response = await fetch(
        // Added `.json` at the end for Firebase Realtime DB
        `${API_BASE}/portfolio-contact/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Convert form data to JSON
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setSuccessMessage("Form submitted successfully!");
        // Reset form fields
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormData({ name: "", email: "", message: "" });
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark"
            placeholder="Your email"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark h-32"
            placeholder="Your message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-accent px-8 py-3 rounded-lg text-white font-semibold hover:bg-opacity-90 transition-colors"
        >
          Send Message
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
    </div>
  );
}
