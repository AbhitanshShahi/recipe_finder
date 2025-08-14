const searchForm = document.querySelector('form');
const searchedRecipe = document.querySelector('#search');
const results = document.querySelector('.results');


async function fetchRecipe(input) {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    const response = await data.json();

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
        `
        results.append(recipeDiv);
    });
}

searchForm.addEventListener('submit', function(e){
    e.preventDefault();
    const searchValue = searchedRecipe.value.trim();
    fetchRecipe(searchValue);
})

