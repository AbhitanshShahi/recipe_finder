const searchForm = document.querySelector('form');
const searchedRecipe = document.querySelector('#search');
const results = document.querySelector('.results');
const recipeDetails = document.querySelector('.recipe-content');
const recipeClose = document.querySelector('.close-btn');


async function fetchRecipe(input) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    const response = await data.json();

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span>Dish</p>
            <p>Belong to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.append(button);
        button.addEventListener('click', function(){
            openRecipe(meal);
        })
        results.append(recipeDiv);
    });
}

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    const searchValue = searchedRecipe.value.trim();
    fetchRecipe(searchValue);
})

function openRecipe(meal) {
    recipeDetails.innerHTML = `
    <div class = "recipe-modal">
        <h2>${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    </div>
    <div>
        <h3>Instructions</h3>
        <p class="Instructions">${meal.strInstructions}</p>
    </div>
    `
    recipeDetails.parentElement.style.display = "block";
}

function fetchIngredients(meal){
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingre = meal[`strIngredient${i}`];
        if(ingre){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingre}</li>`
        }else{
            break;
        }
    }
    return ingredientsList
}
recipeClose.addEventListener("click", () => {
  rulesModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === rulesModal) {
    rulesModal.classList.add("hidden");
  }
});
