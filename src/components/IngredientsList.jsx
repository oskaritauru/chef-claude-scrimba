export default function IngredientsList(props) {
  // Mapping over the ingredients prop to create a list item for each ingredient
  const ingredientsListItems = props.ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li> // Each list item has a unique key based on the ingredient
  ));

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && ( // Conditional rendering: if there are more than 3 ingredients
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}
