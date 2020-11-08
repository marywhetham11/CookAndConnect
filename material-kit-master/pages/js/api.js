function getSearch () {
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=062bee0bbff44fc1a7cda265d91e1382')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.results.length; i++) {
            console.log("hello");
            document.getElementById("recipe-list").innerHTML += `
            <div class="card" style="width: 20rem" onclick="showRecipe(` + data.results[i].id + `)">
                <img
                  class="card-img-top"
                  src=` + data.results[i].image + `
                  rel="nofollow"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <p class="card-text">` + data.results[i].title + `
                  </p>
                </div>
            </div>`
        }
        console.log(data);
    });
}

function showRecipe(recipeId) {
    console.log(recipeId);
    fetch('https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=062bee0bbff44fc1a7cda265d91e1382&includeNutrition=false')
    .then(response => response.json())
    .then(data => {
        document.getElementById("exampleModalLongTitle").innerHTML = data.title;
        var body = `
        <img
            class="card-img-top"
            src=` + data.image + `
            rel="nofollow"
            alt="Card image cap"
        />
        <br>
        <ul class="restrictions">
            <li>` + symbol(data.vegetarian) + ` Vegetarian</li>
            <li>` + symbol(data.vegan) + ` Vegan</li>
            <li>` + symbol(data.glutenFree) + ` Dairy-Free</li>
            <li>` + symbol(data.dairyFree) + ` Gluten-Free</li>
        </ul>
        <h5>Ready In: ` + data.readyInMinutes + `</h5>
        <div class="left">
        <h5>Ingredients:</h5>
        <ul>
        `;
        for (let i = 0; i < data.extendedIngredients.length; i++) {
            body += `<li>` + data.extendedIngredients[i].originalString + `</li>`;
        }
        body += `
        </ul>
        <h5>Instructions:</h5>
        ` + data.instructions + `
        </div>
        `;
        document.getElementById("modal-body").innerHTML = body;
        $('#exampleModalLong').modal("show");
    });
}

function symbol(result) {
    if (result) {
        return `<i class="material-icons green">check_circle_outline</i>`;
    } else {
        return `<i class="material-icons red">highlight_off</i>`;
    }
}