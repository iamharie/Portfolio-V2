interface FormData {
  goal: string;
  gender: string;
  age: string;
  weight: { value: string; unit: "kg" | "lbs" };
  height: { value: string; unit: "cm" | "ft"; feet?: string; inches?: string };
  region: string;
  trainingExperience: string;
  dietType: string;
  allergies: string[];
  preferredFoods: string[];
  mealsPerDay: string;
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

Region: ${formData.region}

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

3. **Meal Breakdown**
   - Split calories and macros logically across all meals.
   ${formData.mealsPerDay === "4" ? "- Include **PRE-WORKOUT MEAL**." : ""}

4. **Food Selection Rules**
   - STRICTLY EXCLUDE allergic foods.
   - INCLUDE preferred foods (but do not limit the plan only to them).
   - Foods should match the user's region and food type.
   - Beginner-friendly and realistic meal choices.

5. **OUTPUT FORMAT (VERY IMPORTANT)**
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

6. **Extra Guidelines**
   - Beginner-friendly explanations (simple language).
   - Mention hydration guidance briefly.
   - Avoid extreme or crash dieting.
   - No medical claims.

-----------------------
OUTPUT STRUCTURE
-----------------------

1. **Calorie & Macro Summary Table**
2. **Meal-wise Nutrition Tables**
   - Breakfast
   - Lunch
   ${formData.mealsPerDay === "4" ? "- Pre-Workout" : ""}
   - Dinner
3. **Daily Total Summary Table**
4. **Short Notes & Tips (2 - 3 lines)**

Generate the plan now.`;
};
