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
  trainingExperience: string;
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

export const generateNutritionPrompt = (formData: FormData): string => {
  const heightValue =
    formData.height.unit === "cm"
      ? `${formData.height.value} cm`
      : `${formData.height.feet} feet ${formData.height.inches} inches`;

  const mealsDescription =
    formData.mealsPerDay === "3"
      ? "3 meals (breakfast, lunch, dinner)"
      : "4 meals (breakfast, lunch, pre-workout, dinner)";

  const varietyDescription =
    formData.mealVariety === "standard"
      ? "Same meals every day (Standard)"
      : formData.mealVariety === "3-day-rotation"
        ? "3-day meal rotation (different meals for 3 days, then repeat)"
        : "5-day meal rotation (different meals for 5 days, then repeat)";

  const supplementsList = [];
  if (formData.supplements.common.length > 0) {
    supplementsList.push(...formData.supplements.common);
  }
  if (formData.supplements.custom.length > 0) {
    formData.supplements.custom.forEach((s) => {
      supplementsList.push(s.brand ? `${s.name} (${s.brand})` : s.name);
    });
  }

  const supplementsText =
    supplementsList.length > 0 ? supplementsList.join(", ") : "None";

  // Construct region information
  const getNativeRegion = () => {
    return formData.region.nativeRegion === "Other"
      ? formData.region.nativeCustomCountry
      : formData.region.nativeRegion;
  };

  const getCurrentRegion = () => {
    if (!formData.region.currentRegion) return null;
    return formData.region.currentRegion === "Other"
      ? formData.region.currentCustomCountry
      : formData.region.currentRegion;
  };

  const nativeRegion = getNativeRegion();
  const currentRegion = getCurrentRegion();

  const regionText =
    currentRegion && currentRegion !== nativeRegion
      ? `Native Food Culture: ${nativeRegion}\nCurrent Location: ${currentRegion}`
      : `Region: ${nativeRegion}`;
  return `You are a certified nutrition coach and fitness expert.

Generate a COMPLETE, PRACTICAL, and SCIENTIFICALLY ACCURATE nutrition plan based on the user details below.

-----------------------
USER DETAILS
-----------------------
Goal: ${formData.goal}

Age: ${formData.age}

Gender: ${formData.gender}

Body Weight: ${formData.weight.value} ${formData.weight.unit}

Height: ${heightValue}

${regionText}

Training Experience: ${formData.trainingExperience}

Food Type: ${formData.dietType}

Foods Allergic To (STRICTLY EXCLUDE THESE): ${
    formData.allergies.length > 0 ? formData.allergies.join(", ") : "None"
  }

Preferred Foods (MUST INCLUDE but not limit to): ${
    formData.preferredFoods.length > 0
      ? formData.preferredFoods.join(", ")
      : "No specific preferences"
  }

Number of Meals: ${mealsDescription}

Meal Variety: ${varietyDescription}

Current Supplements: ${supplementsText}

-----------------------
REQUIREMENTS
-----------------------

1. **Calorie Calculation**
   - Calculate Total Daily Calorie Requirement based on:
     - Goal
     - Age
     - Gender
     - Height
     - Weight
     - Training experience
   - Clearly mention:
     - BMR
     - TDEE
     - Final Target Calories

2. **Macronutrient Split**
   - Calculate daily:
     - Protein (g)
     - Carbohydrates (g)
     - Fats (g)
   - Protein should be prioritized appropriately based on goal and training experience.
    ${
      supplementsList.length > 0
        ? "- Account for protein from supplements when calculating food-based protein needs."
        : ""
    }

3. **Meal Breakdown**
   - Split calories and macros logically across all meals.
   ${formData.mealsPerDay === "4" ? "- Include **PRE-WORKOUT MEAL**." : ""}
    - **IMPORTANT**: Follow the meal variety preference: ${varietyDescription}
   ${
     formData.mealVariety !== "standard"
       ? `- Provide ${formData.mealVariety === "3-day-rotation" ? "3" : "5"} completely different meal plans for each day of the rotation cycle.`
       : ""
   }

4. **Food Selection Rules**
   - STRICTLY EXCLUDE allergic foods.
   - INCLUDE preferred foods (but do not limit the plan only to them).
  ${
    currentRegion && currentRegion !== nativeRegion
      ? `- Base food choices on ${nativeRegion} cuisine (user's native food culture).
  - Ensure ingredients are readily available in ${currentRegion} (user's current location).
  - Provide alternatives if certain traditional ingredients are hard to find locally.`
      : `- Foods should match the user's region (${nativeRegion}) and food type.`
  }
   - Beginner-friendly and realistic meal choices.

5. **Supplement Integration**
   ${
     supplementsList.length > 0
       ? `- User is currently taking: ${supplementsText}
   - Mention optimal timing for each supplement
   - Account for calories and protein from protein supplements
   - Provide brief guidance on dosage if relevant`
       : "- No supplements currently used"
   }

6. **OUTPUT FORMAT (VERY IMPORTANT)**
   - Use TABLE FORMAT ONLY.
   - Each meal should have:
     - Individual food items
     - Quantity (grams/ml/units)
     - Calories
     - Protein (g)
     - Carbs (g)
     - Fats (g)
   - Show:
     - Total calories & macros per meal
     - Final daily total calories & macros

7. **Extra Guidelines**
   - Beginner-friendly explanations (simple language).
   - Mention hydration guidance briefly.
   - Avoid extreme or crash dieting.
   - No medical claims.

-----------------------
OUTPUT STRUCTURE
-----------------------

1. **Calorie & Macro Summary Table**
2. **Meal-wise Nutrition Tables**
   ${
     formData.mealVariety !== "standard"
       ? `   - Provide ${formData.mealVariety === "3-day-rotation" ? "Day 1, Day 2, Day 3" : "Day 1 through Day 5"} meal plans\n`
       : ""
   }   - Breakfast
   - Lunch
   ${formData.mealsPerDay === "4" ? "   - Pre-Workout\n" : ""}
   - Dinner
3. ${supplementsList.length > 0 ? "**Supplement Schedule & Timing**\n4. " : ""}**Daily Total Summary Table**
${supplementsList.length > 0 ? "5. " : "4. "}**Short Notes & Tips (2 - 3 lines)**

Generate the plan now.`;
};
