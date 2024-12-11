class ListPage {

    constructor() {
        this.getAllIngredients();

        this.$ingredientsList = document.querySelector('#ingredientsList');
    }
    

    getAllIngredients() {
        let html = "";
        let ingredients;

        fetch("https://localhost:7109/api/Ingredient", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.status == 404) {
                    alert('That ingredient does not exist in our database');
                }
                else {
                    ingredients = data;
                    console.log(ingredients);
                    
                    for (let i = 0; i < ingredients.length; i++) {
                        html += `<div class="row" style="margin: 0 2vw 3vw 2vw;">
                                    <div class="col">
                                        <h5>${ingredients[i].ingredientId}</h5>
                                    </div>
                                    <div class="col">
                                        <h5>${ingredients[i].name}</h5>
                                    </div>
                                    <div class="col">
                                        <h5>${ingredients[i].version}</h5>
                                    </div>
                                    <div class="col">
                                        <h5>${ingredients[i].type}</h5>
                                    </div>
                                    <div class="col">
                                        <h5>${ingredients[i].reorderPoint}</h5>
                                    </div>
                                    <div class="col-4">
                                        <h5>${ingredients[i].notes}</h5>
                                    </div>
                                    <div class="col">
                                        <h5>${ingredients[i].ingredientsType}</h5>
                                    </div>
                                    <div class="col">
                                        <h5>${ingredients[i].unitType}</h5>
                                    </div>
                                </div>`;
                    }
                }

                this.$ingredientsList.innerHTML = html;
            })
            .catch(error => {
                alert('There was a problem getting Ingredient info!');
            });
    }
}

// instantiate the js app when the html page has finished loading
window.addEventListener("load", () => new ListPage());