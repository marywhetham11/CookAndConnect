function getSearch () {
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=062bee0bbff44fc1a7cda265d91e1382')
    .then(response => response.json())
    .then(data => console.log(data));
}