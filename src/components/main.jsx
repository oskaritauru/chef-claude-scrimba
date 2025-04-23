import React from "react"; // Importing React library
import IngredientsList from "./IngredientsList"; // Importing the IngredientsList component
import ClaudeRecipe from "./ClaudeRecipe"; // Importing the ClaudeRecipe component
import { getRecipeFromMistral } from "../ai"; // Importing the function to get a recipe from the AI

// Defining the Main functional component
export default function Main() {
  const [ingredients, setIngredients] = React.useState([]); // State to hold the list of ingredients
  const [recipe, setRecipe] = React.useState(""); // State to hold the generated recipe
  const recipeSection = React.useRef(null); // Ref to scroll to the recipe section
  const [loading, setLoading] = React.useState(false);

  // Effect to scroll to the recipe section when a recipe is generated
  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
      // Alternative scrolling method commented out
      // const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
      // window.scroll({
      //     top: yCoord,
      //     behavior: "smooth"
      // })
    }
  }, [recipe]); // Dependency array: runs effect when recipe changes

  // Async function to get a recipe based on the current ingredients
  async function getRecipe() {
    setLoading(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredients); // Fetching recipe from the AI
    setRecipe(recipeMarkdown); // Setting the fetched recipe in state
    setLoading(false);
  }

  // Function to add a new ingredient from form data
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient"); // Getting the ingredient from form data
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]); // Updating the ingredients state
  }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
        />
      )}
      {loading && <div className="loading-spinner">Loading...</div>}
      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
