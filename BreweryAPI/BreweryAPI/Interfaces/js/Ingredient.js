class IngredientsPage {

    constructor() {
        this.state = {
            ingredientId: "",
            ingredient: null,
        };

        // instance variables that the app needs but are not part of the "state" of the application
        this.server = "https://localhost:7109/api"
        this.url = this.server + "/Ingredient";

        //ui input instance vars
        this.$form = document.querySelector('#ingredientForm');
        this.$ingredientId = document.querySelector('#ingredientId');
        this.$ingredientName = document.querySelector('#name');
        this.$ingredientVersion = document.querySelector('#version');
        this.$ingredientType = document.querySelector('#type');
        this.$ingredientOnHandQuantity = document.querySelector('#onHandQuantity');
        this.$ingredientUnitType = document.querySelector('#unitType');
        this.$ingredientUnitCost = document.querySelector('#unitCost');
        this.$ingredientReOrderPoint = document.querySelector('#reorderPoint');
        this.$ingredientNotes = document.querySelector('#notes')

        //ui button instance vars
        this.$findButton = document.querySelector('#findBtn');
        this.$addButton = document.querySelector('#addBtn');
        this.$deleteButton = document.querySelector('#deleteBtn');
        this.$editButton = document.querySelector('#editBtn');
        this.$saveButton = document.querySelector('#saveBtn');
        this.$cancelButton = document.querySelector('#cancelBtn');


        // call these methods to set up the page
        this.bindAllMethods();
        this.makeFieldsReadOnly(true);
        this.makeFieldsRequired(false);
        this.enableButtons("pageLoad");
    }

    // any method that is used as part of an event handler must bind this to the class
    // not all of these methods need to be bound but it was easier to do them all as I wrote them
    bindAllMethods() {
        this.onFindIngredient = this.onFindIngredient.bind(this);
        this.onEditIngredient = this.onEditIngredient.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDeleteIngredient = this.onDeleteIngredient.bind(this);
        this.onSaveIngredient = this.onSaveIngredient.bind(this);
        this.onAddIngredient = this.onAddIngredient.bind(this);

        this.makeFieldsReadOnly = this.makeFieldsReadOnly.bind(this);
        this.makeFieldsRequired = this.makeFieldsRequired.bind(this);
        this.fillIngredientFields = this.fillIngredientFields.bind(this);
        this.clearIngredientFields = this.clearIngredientFields.bind(this);
        this.disableButtons = this.disableButtons.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.enableButtons = this.enableButtons.bind(this);
    }

    // makes an api call to /api/states to get the list of states
    // populates the combo box on the page with the state information
    /*
    fetchStates() {
        fetch(`${this.server}/state`)
            .then(response => response.json())
            .then(data => {
                if (data.length == 0) {
                    alert("Can't load states.  Can not add or edit customers without state inforamtion.");
                }
                else {
                    this.state.states = data;
                    this.loadStates();
                }
            })
            .catch(error => {
                alert('There was a problem getting state info!');
            });
    }

    // creates an option for each of the states returned from the api call
    loadStates() {
        let defaultOption = `<option value="" ${(!this.state.customer) ? "selected" : ""}></option>`;
        let stateHtml = this.state.states.reduce(
            (html, state, index) => html += this.loadState(state, index), defaultOption
        );
        this.$customerState.innerHTML = stateHtml;
    }

    // creates the option for one state
    loadState(state, index) {
        return `<option value=${state.stateCode} ${(this.state.customer && this.state.customer.stateCode == state.stateCode) ? "selected" : ""}>${state.stateName}</option>`;
    }*/

    // makes an api call to /api/customer/# where # is the primary key of the customer
    // finds a customer based on customer id.  in a future version it would be better to search by name
    onFindIngredient(event) {
        event.preventDefault();
        if (this.$ingredientId.value != "") {
            console.log(this.$ingredientId.value);
            this.state.ingredientId = this.$ingredientId.value;
            fetch(`${this.url}/${this.state.ingredientId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status == 404) {
                        alert('That ingredient does not exist in our database');
                    }
                    else {
                        this.state.ingredient = data;
                        this.fillIngredientFields();
                        this.enableButtons("found");
                    }
                })
                .catch(error => {
                    alert('There was a problem getting Ingredient info!');
                });
        }
        else {
            this.clearIngredientFields();
        }
    }

    // makes a delete request to /api/customer/# where # is the primary key of the customer
    // deletes the customer displayed on the screen from the database
    onDeleteIngredient(event) {
        event.preventDefault();
        if (this.state.ingredientId != "") {
            fetch(`${this.url}/${this.state.ingredientId}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {
                    // returns the record that we deleted so the ids should be the same 
                    if (this.state.ingredientId == data.ingredientId) {
                        this.state.ingredientId = "";
                        this.state.ingredient = null;
                        this.$ingredientId.value = "";
                        this.clearIngredientFields();
                        this.enableButtons("pageLoad");
                        alert("Ingredient was deleted.")
                    }
                    else {
                        alert('There was a problem deleting ingredient info!');
                    }
                })
                .catch(error => {
                    alert('There was a problem deleting ingredient info!');
                });
        }
        else {
            // this should never happen if the right buttons are enabled
        }
    }

    // makes either a post or a put request to /api/customers
    // either adds a new customer or updates an existing customer in the database
    // based on the customer information in the form
    onSaveIngredient(event) {
        event.preventDefault();
        // adding
        if (this.state.ingredientId == "") {
            fetch(`${this.url}`, {
                method: 'POST',
                body: JSON.stringify({
                    ingredientId: 0,
                    name: this.$ingredientName.value,
                    version: this.$ingredientVersion.value,
                    ingredientType: this.$ingredientType.value,
                    onHandQuantity: this.$ingredientOnHandQuantity.value,
                    unitType: this.$ingredientUnitType.value,
                    unitCost: this.$ingredientUnitCost.value,
                    reorderPoint: this.$ingredientReOrderPoint.value,
                    notes: this.$ingredientNotes.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    // returns the record that we added so the ids should be there 
                    if (data.ingredientId) {
                        this.state.ingredientId = data.ingredientId;
                        this.state.ingredient = data;
                        this.$ingredientId.value = this.state.ingredientId;
                        this.fillIngredientFields();
                        this.$ingredientId.readOnly = false;
                        this.enableButtons("found");
                        alert("Ingredient was added.")
                    }
                    else {
                        alert('There was a problem adding ingredient info!');
                    }
                })
                .catch(error => {
                    alert('There was a error adding ingredient info!');
                });
        }
        // updating
        else {
            // the format of the body has to match the original object exactly 
            // so make a copy of it and copy the values from the form
            let customer = Object.assign(this.state.customer);
            customer.name = this.$customerName.value;
            customer.address = this.$customerAddress.value;
            customer.city = this.$customerCity.value;
            customer.state = this.$customerState.value;
            customer.zipCode = this.$customerZipcode.value;
            fetch(`${this.url}/${this.state.customerId}`, {
                method: 'PUT',
                body: JSON.stringify(customer),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // doesn't return a body just a status code of 204 
                    if (response.status == 204) {
                        this.state.customer = Object.assign(customer);
                        this.fillCustomerFields();
                        this.$customerId.readOnly = false;
                        this.enableButtons("found");
                        alert("Customer was updated.")
                    }
                    else {
                        alert('There was a problem updating customer info!');
                    }
                })
                .catch(error => {
                    alert('There was a problem adding customer info!');
                });
        }
    }

    // makes the fields editable
    onEditIngredient(event) {
        event.preventDefault();
        // can't edit the customer id
        this.$ingredientId.readOnly = true;
        this.makeFieldsReadOnly(false);
        this.makeFieldsRequired(true);
        this.enableButtons("editing");
    }

    // clears the form for input of a new customer
    onAddIngredient(event) {
        event.preventDefault();
        // can't edit the customer id
        this.state.ingredientId = ""
        this.state.ingredient = null;
        this.$ingredientId.value = "";
        this.$ingredientId.readOnly = true;
        this.clearIngredientFields();
        this.makeFieldsReadOnly(false);
        this.makeFieldsRequired(true);
        this.enableButtons("editing");
    }

    // cancels the editing for either a new customer or an existing customer
    onCancel(event) {
        event.preventDefault();
        if (this.state.customerId == "") {
            this.clearIngredientFields();
            this.makeFieldsReadOnly();
            this.makeFieldsRequired(false);
            this.$ingredientId.readOnly = false;
            this.enableButtons("pageLoad");
        }
        else {
            this.fillIngredientFields();
            this.$ingredientId.readOnly = false;
            this.enableButtons("found");
        }
    }

    // fills the form with data based on the ingredient
    fillIngredientFields() {
        // fill the fields
        this.$ingredientName.value = this.state.ingredient.name;
        this.$ingredientVersion.value = this.state.ingredient.version;
        this.$ingredientType.value = this.state.ingredient.type;
        this.$ingredientOnHandQuantity.value = this.state.ingredient.onHandQuantity;
        this.$ingredientUnitCost.value = this.state.ingredient.unitCost;
        this.$ingredientUnitType.value = this.state.ingredient.unitType;
        this.$ingredientReOrderPoint.value = this.state.ingredient.reorderPoint;
        this.$ingredientNotes.value = this.state.ingredient.notes;

        this.makeFieldsReadOnly();
    }

    // clears the ui
    clearIngredientFields() {
        this.$ingredientName.value = "";
        this.$ingredientVersion.value = "";
        this.$ingredientType.value = "";
        this.$ingredientOnHandQuantity.value = "";
        this.$ingredientReOrderPoint.value = "";
        this.$ingredientNotes.value = "";
        this.$ingredientUnitCost.value = "";
        this.$ingredientUnitType.value = "";
    }

    // enables or disables ui elements
    makeFieldsReadOnly(readOnly = true) {
        this.$ingredientName.readOnly = readOnly;
        this.$ingredientVersion.readOnly = readOnly;
        this.$ingredientType.readOnly = readOnly;
        this.$ingredientOnHandQuantity.readOnly = readOnly;
        this.$ingredientReOrderPoint.readOnly = readOnly;
        this.$ingredientNotes.readOnly = readOnly;
        this.$ingredientUnitCost.readOnly = readOnly;
        this.$ingredientUnitType.readOnly = readOnly;
    }

    // makes ui elements required when editing
    makeFieldsRequired(required = true) {
        this.$ingredientName.required = required;
        this.$ingredientVersion.required = required;
        this.$ingredientType.required = required;
        this.$ingredientOnHandQuantity.required = required;
        this.$ingredientReOrderPoint.required = required;
        this.$ingredientNotes.required = required;
        this.$ingredientUnitCost.required = required;
        this.$ingredientUnitType.required = required;
    }

    // disables an array of buttons
    disableButtons(buttons) {
        buttons.forEach(b => b.onclick = this.disableButton);
        buttons.forEach(b => b.classList.add("disabled"));
    }

    // disables one button
    disableButton(event) {
        event.preventDefault();
    }

    // enables ui elements based on the editing state of the page
    enableButtons(state) {
        switch (state) {
            case "pageLoad":
                this.disableButtons([this.$deleteButton, this.$editButton, this.$saveButton, this.$cancelButton]);
                this.$findButton.onclick = this.onFindIngredient;
                this.$findButton.classList.remove("disabled");
                this.$addButton.onclick = this.onAddIngredient;
                this.$addButton.classList.remove("disabled");
                break;
            case "editing": case "adding":
                this.disableButtons([this.$deleteButton, this.$editButton, this.$addButton]);
                this.$saveButton.onclick = this.onSaveIngredient;
                this.$cancelButton.onclick = this.onCancel;
                [this.$saveButton, this.$cancelButton].forEach(b => b.classList.remove("disabled"));
                break;
            case "found":
                this.disableButtons([this.$saveButton, this.$cancelButton]);
                this.$findButton.onclick = this.onFindIngredient;
                this.$editButton.onclick = this.onEditIngredient;
                this.$deleteButton.onclick = this.onDeleteIngredient;
                this.$addButton.onclick = this.onAddIngredient;
                [this.$findButton, this.$editButton, this.$deleteButton, this.$addButton].forEach(b => b.classList.remove("disabled"));
                break;
            default:
        }
    }
}

// instantiate the js app when the html page has finished loading
window.addEventListener("load", () => new IngredientsPage());
