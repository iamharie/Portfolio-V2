import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaAppleAlt,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
  FaCopy,
  FaCheckCircle,
  FaCalendarCheck,
  FaCalendarAlt,
  FaCalendar,
} from "react-icons/fa";
import { generateNutritionPrompt } from "../../../utils/nutritionPrompt";

interface Supplement {
  name: string;
  brand?: string;
}
interface FormData {
  goal: string;
  gender: string;
  age: string;
  weight: { value: string; unit: "kg" | "lbs" };
  height: { value: string; unit: "cm" | "ft"; feet?: string; inches?: string };
  region: {
    nativeRegion: string;
    nativeCustomCountry: string;
    currentRegion: string;
    currentCustomCountry: string;
  };
  trainingExperience: {
    type: string;
    breakDuration?: string;
  };
  dietType: string;
  allergies: string[];
  preferredFoods: string[];
  mealsPerDay: string;
  mealVariety: string;
  supplements: {
    common: string[];
    custom: Supplement[];
  };
}

const Nutrition: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    goal: "",
    gender: "",
    age: "",
    weight: { value: "", unit: "kg" },
    height: { value: "", unit: "cm" },
    region: {
      nativeRegion: "",
      nativeCustomCountry: "",
      currentRegion: "",
      currentCustomCountry: "",
    },
    trainingExperience: {
      type: "",
      breakDuration: undefined,
    },
    dietType: "",
    allergies: [],
    preferredFoods: [],
    mealsPerDay: "",
    mealVariety: "",
    supplements: {
      common: [],
      custom: [],
    },
  });

  const [nativeCustomInput, setNativeCustomInput] = useState("");
  const [currentCustomInput, setCurrentCustomInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [preferredFoodInput, setPreferredFoodInput] = useState("");
  const [supplementNameInput, setSupplementNameInput] = useState("");
  const [supplementBrandInput, setSupplementBrandInput] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const totalSteps = 11;

  // Validation function for each step
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.goal !== "";
      case 2:
        return (
          formData.gender !== "" &&
          formData.age !== "" &&
          parseInt(formData.age) >= 12 &&
          parseInt(formData.age) <= 80
        );
      case 3:
        if (formData.height.unit === "cm") {
          return formData.weight.value !== "" && formData.height.value !== "";
        } else {
          return (
            formData.weight.value !== "" &&
            formData.height.feet !== "" &&
            formData.height.inches !== ""
          );
        }
      case 4:
        if (formData.region.nativeRegion === "") return false;
        if (
          formData.region.nativeRegion === "Other" &&
          formData.region.nativeCustomCountry.trim() === ""
        )
          return false;

        // If current region is shown and selected, validate it
        if (
          formData.region.currentRegion !== "" &&
          formData.region.currentRegion === "Other" &&
          formData.region.currentCustomCountry.trim() === ""
        )
          return false;
        return true;
      case 5:
        if (formData.trainingExperience.type === "") return false;
        // If "Previously Trained" is selected, validate break duration
        if (
          formData.trainingExperience.type ===
            "Previously Trained (Returning After a Break)" &&
          !formData.trainingExperience.breakDuration
        )
          return false;
        return true;
      case 6:
        return formData.dietType !== "";
      case 7:
        return true; // Allergies are optional
      case 8:
        return true; // Preferred foods are optional
      case 9:
        return formData.mealsPerDay !== "";
      case 10:
        return formData.mealVariety !== "";
      case 11:
        return true; // Supplements are optional
      default:
        return false;
    }
  };

  // Handler for adding chips
  const addChip = (type: "allergies" | "preferredFoods") => {
    const input = type === "allergies" ? allergyInput : preferredFoodInput;
    if (input.trim() === "") return;

    const currentList = formData[type];
    // Prevent duplicates
    if (currentList.includes(input.trim())) return;

    setFormData({
      ...formData,
      [type]: [...currentList, input.trim()],
    });

    // Clear input
    if (type === "allergies") {
      setAllergyInput("");
    } else {
      setPreferredFoodInput("");
    }
  };

  // Handler for removing chips
  const removeChip = (type: "allergies" | "preferredFoods", item: string) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((i) => i !== item),
    });
  };

  // Add these functions after the removeChip function:

  const toggleCommonSupplement = (supplement: string) => {
    const currentCommon = formData.supplements.common;
    if (currentCommon.includes(supplement)) {
      setFormData({
        ...formData,
        supplements: {
          ...formData.supplements,
          common: currentCommon.filter((s) => s !== supplement),
        },
      });
    } else {
      setFormData({
        ...formData,
        supplements: {
          ...formData.supplements,
          common: [...currentCommon, supplement],
        },
      });
    }
  };

  const addCustomSupplement = () => {
    if (supplementNameInput.trim() === "") return;

    const newSupplement: Supplement = {
      name: supplementNameInput.trim(),
      brand: supplementBrandInput.trim() || undefined,
    };

    // Check for duplicates
    const isDuplicate = formData.supplements.custom.some(
      (s) =>
        s.name.toLowerCase() === newSupplement.name.toLowerCase() &&
        s.brand?.toLowerCase() === newSupplement.brand?.toLowerCase(),
    );

    if (isDuplicate) return;

    setFormData({
      ...formData,
      supplements: {
        ...formData.supplements,
        custom: [...formData.supplements.custom, newSupplement],
      },
    });

    // Clear inputs
    setSupplementNameInput("");
    setSupplementBrandInput("");
  };

  const removeCustomSupplement = (index: number) => {
    setFormData({
      ...formData,
      supplements: {
        ...formData.supplements,
        custom: formData.supplements.custom.filter((_, i) => i !== index),
      },
    });
  };

  const nextStep = () => {
    if (isStepValid(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (isStepValid(currentStep)) {
      // Show toast
      setShowToast(true);

      // Generate prompt after 3 seconds
      setTimeout(() => {
        const prompt = generateNutritionPrompt(formData);
        setGeneratedPrompt(prompt);
        setShowToast(false);
        setShowPrompt(true);
      }, 3000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              What's Your Goal?
            </h2>
            <p className="text-text-light dark:text-text-dark mb-6">
              Choose your primary fitness objective
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Fat Loss", "Muscle Gain", "Maintenance"].map((goal) => (
                <motion.button
                  key={goal}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, goal })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.goal === goal
                      ? "border-accent bg-accent/10 shadow-lg"
                      : "border-secondary dark:border-secondary-light hover:border-accent/50"
                  }`}
                >
                  <div className="text-xl font-semibold text-text-light dark:text-text-dark">
                    {goal}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Basic Profile
            </h2>

            <div>
              <label className="block text-sm font-medium mb-3 text-text-light dark:text-text-dark">
                Gender
              </label>
              <div className="flex gap-4">
                {["Male", "Female"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender })}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      formData.gender === gender
                        ? "border-accent bg-accent/10"
                        : "border-secondary dark:border-secondary-light"
                    }`}
                  >
                    <span className="font-semibold text-text-light dark:text-text-dark">
                      {gender}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Age
              </label>
              <input
                type="number"
                min="12"
                max="80"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="e.g. 25"
                className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Age must be between 12 and 80
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Body Measurements
            </h2>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Body Weight
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.weight.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weight: { ...formData.weight, value: e.target.value },
                    })
                  }
                  placeholder="72"
                  className="flex-1 px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="flex border border-secondary dark:border-secondary-light rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        weight: { ...formData.weight, unit: "kg" },
                      })
                    }
                    className={`px-4 py-3 ${formData.weight.unit === "kg" ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"}`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        weight: { ...formData.weight, unit: "lbs" },
                      })
                    }
                    className={`px-4 py-3 ${formData.weight.unit === "lbs" ? "bg-accent text-white" : "bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"}`}
                  >
                    lbs
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Height
              </label>
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      height: { value: "", unit: "cm", feet: "", inches: "" },
                    })
                  }
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${formData.height.unit === "cm" ? "bg-accent text-white" : "bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark hover:bg-accent/20"}`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      height: { value: "", unit: "ft", feet: "", inches: "" },
                    })
                  }
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${formData.height.unit === "ft" ? "bg-accent text-white" : "bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark hover:bg-accent/20"}`}
                >
                  ft
                </button>
              </div>

              {formData.height.unit === "cm" ? (
                <input
                  type="number"
                  value={formData.height.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      height: { ...formData.height, value: e.target.value },
                    })
                  }
                  placeholder="170"
                  className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                />
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.height.feet || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          height: { ...formData.height, feet: e.target.value },
                        })
                      }
                      placeholder="5"
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark font-medium">
                      ft
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.height.inches || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          height: {
                            ...formData.height,
                            inches: e.target.value,
                          },
                        })
                      }
                      placeholder="10"
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark font-medium">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        const regionOptions = ["India", "USA", "Australia", "Other"];

        // Helper function to get the actual region value
        const getActualRegion = (region: string, customCountry: string) => {
          return region === "Other" ? customCountry : region;
        };

        const actualNativeRegion = getActualRegion(
          formData.region.nativeRegion,
          formData.region.nativeCustomCountry,
        );

        const actualCurrentRegion = getActualRegion(
          formData.region.currentRegion,
          formData.region.currentCustomCountry,
        );

        // Only show current region section if native region is selected and they're different
        const showCurrentRegion =
          formData.region.nativeRegion !== "" &&
          (formData.region.currentRegion === "" ||
            actualNativeRegion !== actualCurrentRegion);

        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Food Culture & Location
            </h2>

            {/* Native Region Section */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Which region's food do you mostly eat?{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                This helps us understand your food preferences.
              </p>

              <select
                value={formData.region.nativeRegion}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({
                    ...formData,
                    region: {
                      ...formData.region,
                      nativeRegion: value,
                      nativeCustomCountry: value === "Other" ? "" : "",
                      // Don't reset current region anymore
                    },
                  });
                  setNativeCustomInput("");
                }}
                className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Select a region</option>
                {regionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {/* Native Custom Country Input */}
              {formData.region.nativeRegion === "Other" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3"
                >
                  <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                    Enter country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nativeCustomInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNativeCustomInput(value);
                      setFormData({
                        ...formData,
                        region: {
                          ...formData.region,
                          nativeCustomCountry: value.trim(),
                        },
                      });
                    }}
                    placeholder="e.g. Canada"
                    autoFocus
                    className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </motion.div>
              )}
            </div>

            {/* Current Region Section - Only show if needed */}
            {showCurrentRegion && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="pt-4 border-t border-secondary dark:border-secondary-light"
              >
                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                  Where are you currently living?
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  This helps us recommend ingredients that are easy to find
                  locally.
                </p>

                <select
                  value={formData.region.currentRegion}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({
                      ...formData,
                      region: {
                        ...formData.region,
                        currentRegion: value,
                        currentCustomCountry: value === "Other" ? "" : "",
                      },
                    });
                    setCurrentCustomInput("");
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Same as above</option>
                  {regionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {/* Current Custom Country Input */}
                {formData.region.currentRegion === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3"
                  >
                    <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                      Enter country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentCustomInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCurrentCustomInput(value);
                        setFormData({
                          ...formData,
                          region: {
                            ...formData.region,
                            currentCustomCountry: value.trim(),
                          },
                        });
                      }}
                      placeholder="e.g. Canada"
                      autoFocus
                      className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        );
      case 5:
        const trainingTypes = [
          {
            id: "Complete Beginner",
            title: "Complete Beginner",
            description: "Never trained consistently before",
          },
          {
            id: "Beginner (New to Structured Training)",
            title: "Beginner (New to Structured Training)",
            description: "Some exposure, but less than 6 months total",
          },
          {
            id: "Previously Trained (Returning After a Break)",
            title: "Previously Trained (Returning After a Break)",
            description: "Trained seriously in the past, restarting now",
          },
          {
            id: "Experienced Lifter",
            title: "Experienced Lifter",
            description: "Training consistently for 1+ years",
          },
        ];

        const breakDurations = [
          "Less than 3 months",
          "3–6 months",
          "6–12 months",
          "1+ year",
        ];

        const showBreakDuration =
          formData.trainingExperience.type ===
          "Previously Trained (Returning After a Break)";

        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Training Background
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              This helps us adjust calories, recovery, and progression safely.
            </p>

            {/* Question 1 - Experience Type */}
            <div>
              <label className="block text-sm font-medium mb-3 text-text-light dark:text-text-dark">
                How would you describe your training background?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {trainingTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        trainingExperience: {
                          type: type.id,
                          breakDuration:
                            type.id ===
                            "Previously Trained (Returning After a Break)"
                              ? formData.trainingExperience.breakDuration
                              : undefined,
                        },
                      })
                    }
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      formData.trainingExperience.type === type.id
                        ? "border-accent bg-accent/10 shadow-lg"
                        : "border-secondary dark:border-secondary-light hover:border-accent/50"
                    }`}
                  >
                    <div className="font-semibold text-text-light dark:text-text-dark mb-1">
                      {type.title}
                    </div>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2 - Break Duration (Conditional) */}
            {showBreakDuration && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="pt-4 border-t border-secondary dark:border-secondary-light"
              >
                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                  How long was your break from training?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Muscle memory helps, but recovery & calories need adjustment.
                </p>

                <div className="space-y-2">
                  {breakDurations.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          trainingExperience: {
                            ...formData.trainingExperience,
                            breakDuration: duration,
                          },
                        })
                      }
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        formData.trainingExperience.breakDuration === duration
                          ? "border-accent bg-accent/10"
                          : "border-secondary dark:border-secondary-light hover:border-accent/50"
                      }`}
                    >
                      <span className="font-medium text-text-light dark:text-text-dark">
                        {duration}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">Diet Type</h2>
            <p className="text-sm text-gray-500 mb-4">
              We'll customize your meal plan accordingly
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Veg", "Non-Veg", "Vegan"].map((diet) => (
                <button
                  key={diet}
                  type="button"
                  onClick={() => setFormData({ ...formData, dietType: diet })}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.dietType === diet
                      ? "border-accent bg-accent/10 shadow-lg"
                      : "border-secondary dark:border-secondary-light hover:border-accent/50"
                  }`}
                >
                  <div className="text-xl font-semibold text-text-light dark:text-text-dark">
                    {diet}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">Allergies</h2>
            <p className="text-text-light dark:text-text-dark mb-4">
              Foods Allergic To (Strictly Excluded)
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), addChip("allergies"))
                }
                placeholder="e.g. Peanuts"
                className="flex-1 px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                onClick={() => addChip("allergies")}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {formData.allergies.map((allergy) => (
                <motion.div
                  key={allergy}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full"
                >
                  <span>{allergy}</span>
                  <button
                    type="button"
                    onClick={() => removeChip("allergies", allergy)}
                    className="hover:text-red-900 dark:hover:text-red-100"
                  >
                    <FaTimes />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Preferred Foods
            </h2>
            <p className="text-text-light dark:text-text-dark mb-4">
              We'll include these when possible
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={preferredFoodInput}
                onChange={(e) => setPreferredFoodInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), addChip("preferredFoods"))
                }
                placeholder="e.g. Chicken Breast"
                className="flex-1 px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                onClick={() => addChip("preferredFoods")}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {formData.preferredFoods.map((food) => (
                <motion.div
                  key={food}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full"
                >
                  <span>{food}</span>
                  <button
                    type="button"
                    onClick={() => removeChip("preferredFoods", food)}
                    className="hover:text-green-900 dark:hover:text-green-100"
                  >
                    <FaTimes />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Meal Frequency
            </h2>
            <p className="text-text-light dark:text-text-dark mb-4">
              How many meals per day?
            </p>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, mealsPerDay: "3" })}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                  formData.mealsPerDay === "3"
                    ? "border-accent bg-accent/10 shadow-lg"
                    : "border-secondary dark:border-secondary-light hover:border-accent/50"
                }`}
              >
                <div className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                  3 Meals
                </div>
                <p className="text-sm text-gray-500">
                  Breakfast, Lunch, Dinner
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, mealsPerDay: "4" })}
                className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                  formData.mealsPerDay === "4"
                    ? "border-accent bg-accent/10 shadow-lg"
                    : "border-secondary dark:border-secondary-light hover:border-accent/50"
                }`}
              >
                <div className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                  4 Meals
                </div>
                <p className="text-sm text-gray-500">
                  Breakfast, Lunch, Pre-Workout, Dinner
                </p>
              </button>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Meal Variety Preference
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-accent mb-6">
              <p className="text-text-light dark:text-text-dark">
                <strong>Important:</strong> Eating the same meals every day can
                get boring. Choose how much variety you want - we'll handle the
                rest.
              </p>
            </div>

            <div className="space-y-4">
              {/* Standard Option */}
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, mealVariety: "standard" })
                }
                className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                  formData.mealVariety === "standard"
                    ? "border-green-500 bg-green-500/10 shadow-lg"
                    : "border-secondary dark:border-secondary-light hover:border-green-500/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <FaCalendarCheck className="text-3xl text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                      Standard (Same meals daily)
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Simple & easy to follow
                    </p>
                  </div>
                </div>
              </button>

              {/* 3-Day Rotation */}
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, mealVariety: "3-day-rotation" })
                }
                className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                  formData.mealVariety === "3-day-rotation"
                    ? "border-yellow-500 bg-yellow-500/10 shadow-lg"
                    : "border-secondary dark:border-secondary-light hover:border-yellow-500/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <FaCalendarAlt className="text-3xl text-yellow-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                      3-Day Rotation
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3 different meals rotated across 3 days
                    </p>
                  </div>
                </div>
              </button>

              {/* 5-Day Rotation */}
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, mealVariety: "5-day-rotation" })
                }
                className={`w-full p-6 rounded-xl border-2 text-left transition-all ${
                  formData.mealVariety === "5-day-rotation"
                    ? "border-blue-500 bg-blue-500/10 shadow-lg"
                    : "border-secondary dark:border-secondary-light hover:border-blue-500/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <FaCalendar className="text-3xl text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                      5-Day Rotation
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      5 different meals rotated across 5 days
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );
      // Add this after case 10:

      case 11:
        const commonSupplements = [
          "Whey Protein Isolate",
          "Creatine Monohydrate",
        ];

        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-accent mb-2">
              Supplements (Optional)
            </h2>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg border-l-4 border-cyan-500 mb-6">
              <p className="text-text-light dark:text-text-dark">
                <strong>Note:</strong> Supplements are optional. If you use any,
                add them below - we'll account for them in your plan.
              </p>
            </div>

            {/* Commonly Used Supplements */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">
                Commonly Used Supplements
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Click to select the supplements you use
              </p>
              <div className="flex flex-wrap gap-3">
                {commonSupplements.map((supplement) => (
                  <motion.button
                    key={supplement}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCommonSupplement(supplement)}
                    className={`px-4 py-3 rounded-full font-medium transition-all ${
                      formData.supplements.common.includes(supplement)
                        ? "bg-cyan-500 text-white shadow-lg"
                        : "bg-secondary-light dark:bg-secondary text-text-light dark:text-text-dark border-2 border-secondary dark:border-secondary-light hover:border-cyan-500"
                    }`}
                  >
                    {supplement}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Other Supplements */}
            <div>
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">
                Other Supplements
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Add any other supplements you're currently using
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                    Supplement Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={supplementNameInput}
                    onChange={(e) => setSupplementNameInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addCustomSupplement())
                    }
                    placeholder="e.g. Omega 3"
                    className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                    Brand (Optional)
                  </label>
                  <input
                    type="text"
                    value={supplementBrandInput}
                    onChange={(e) => setSupplementBrandInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addCustomSupplement())
                    }
                    placeholder="e.g. Nordic Naturals"
                    className="w-full px-4 py-3 rounded-lg border border-secondary dark:border-secondary-light bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={addCustomSupplement}
                  disabled={supplementNameInput.trim() === ""}
                  className="w-full px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add Supplement
                </button>
              </div>

              {/* Display Custom Supplements */}
              {formData.supplements.custom.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.supplements.custom.map((supplement, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full"
                    >
                      <span>
                        {supplement.name}
                        {supplement.brand && ` · ${supplement.brand}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCustomSupplement(index)}
                        className="hover:text-cyan-900 dark:hover:text-cyan-100"
                      >
                        <FaTimes />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Display Selected Common Supplements */}
              {formData.supplements.common.length > 0 && (
                <div className="mt-6 p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg">
                  <h4 className="text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                    Selected Common Supplements:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.supplements.common.map((supplement) => (
                      <span
                        key={supplement}
                        className="px-3 py-1 bg-cyan-500 text-white rounded-full text-sm"
                      >
                        {supplement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showPrompt) {
    return (
      <div className="py-16 px-4 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-accent mb-4">
                Your Custom Nutrition Prompt is Ready!
              </h1>
              <p className="text-lg text-text-light dark:text-text-dark">
                Copy the prompt below and paste it into ChatGPT to generate your
                personalized nutrition plan
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-secondary-light dark:bg-secondary p-6 rounded-2xl shadow-xl mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-accent">
                  Your Custom Prompt
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  {copied ? (
                    <>
                      <FaCheckCircle /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copy Prompt
                    </>
                  )}
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-secondary dark:border-secondary-light max-h-96 overflow-y-auto">
                <pre className="text-sm text-text-light dark:text-text-dark whitespace-pre-wrap font-mono">
                  {generatedPrompt}
                </pre>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border-2 border-accent"
            >
              <h3 className="text-xl font-bold text-accent mb-4">
                Next Steps:
              </h3>
              <ol className="space-y-3 text-text-light dark:text-text-dark">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <span>Click the "Copy Prompt" button above</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <span>Open ChatGPT by clicking the button below</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <span>
                    Paste your custom prompt and get your personalized nutrition
                    plan!
                  </span>
                </li>
              </ol>

              <div className="mt-6 text-center">
                <a
                  href="https://chat.openai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg hover:bg-blue-600 transition-colors font-bold text-lg shadow-lg"
                >
                  Open ChatGPT
                  <svg
                    className="w-5 h-5"
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
              </div>
            </motion.div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setShowPrompt(false);
                  setCurrentStep(1);
                  setFormData({
                    goal: "",
                    gender: "",
                    age: "",
                    weight: { value: "", unit: "kg" },
                    height: { value: "", unit: "cm" },
                    region: "",
                    trainingExperience: "",
                    dietType: "",
                    allergies: [],
                    preferredFoods: [],
                    mealsPerDay: "",
                    mealVariety: "",
                    supplements: {
                      common: [],
                      custom: [],
                    },
                  });
                  setSupplementNameInput("");
                  setSupplementBrandInput("");
                }}
                className="text-accent hover:text-blue-600 font-semibold underline"
              >
                Create Another Plan
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaAppleAlt className="text-accent text-4xl" />
            <h1 className="text-5xl font-bold text-accent">Nutrition Plan</h1>
          </div>
          <p className="text-xl text-text-light dark:text-text-dark">
            Step {currentStep} of {totalSteps}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-secondary-light dark:bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          className="bg-secondary-light dark:bg-secondary p-8 rounded-2xl shadow-xl"
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-secondary dark:border-secondary-light">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-secondary dark:border-secondary-light text-text-light dark:text-text-dark hover:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Next
                <FaChevronRight />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Submit
              </button>
            )}
          </div>
        </motion.div>

        {/* Toast Message */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-accent text-white px-8 py-4 rounded-lg shadow-2xl z-50"
            >
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="font-semibold">
                  Your custom prompt is being generated...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Nutrition;
