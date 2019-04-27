var appController = (function(){

    var Expense = function(id, description, value){ // create function constructor for expense
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){ // create function constructor for income 
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var allValues = { // object containing all the values
        allTransactions: { // object for all transaction values 
            exp: [],
            inc: []
        },
        totals: { // object for all totals 
            exp: 0, 
            inc: 0
        }
    }
    return{ 
        
        storeValue: function(type, desc, val){ // function to communicate with the controller IIFE
            var newValObj, ID; // newObject of the function expression

            // generate a new ID
            ID = allValues.allTransactions[type].length + 1;

            // to create objects using function expressions
            if(type === 'exp'){
                newValObj = new Expense(ID, desc, val); 
            }
            else if(type === 'inc'){
                newValObj = new Income(ID, desc, val);
            }

            // push the object in to the array
            allValues.allTransactions[type].push(newValObj);
            
            // return the object created using function expression
            return (newValObj);
        }
    }

})();

var UIcontroller = (function(){
    selectors = { // all the selectors used so far 
        type: '.add__type',
        desc: '.add__description',
        value: '.add__value',
        add: '.add__btn',
        incomeContainer: 'income__list', // used as rep in the code to replace if it is an income 
        expenseContainer: 'expenses__list' // used as rep in the code to replace if it is an expense

    }

    return { 
        readValues : function(){ // reading user input
            values = { // the object that reads all the values 
                type: document.querySelector(selectors.type).value,
                desc: document.querySelector(selectors.desc).value,
                value: document.querySelector(selectors.value).value,
            }
            return(values); // return the value object to the controller module 
        },

        updateUI: function(obj, type){ // this is a public function which can be accessed by the control module to update the ui of the page 
            var html, newHtml, rep;

            // 1. create html tags

            if(type === 'inc'){
                // 
                rep = selectors.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if(type === 'exp'){
                rep = selectors.expenseContainer;
                html= '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // 2. allocate value dynamically

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%desc%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // 3. add html to the dom

            document.querySelector('.' + rep).insertAdjacentHTML('beforeend', newHtml); // using a insertAdjacentHTML function 

        }, // end of updateUI function 

        domSelectors: function(){ // to return the selectors object 
            return(selectors); // return of the selector object
        } 
    }

})();

var controller = (function(appCtrl, UIctrl){ 

    var selectors = UIctrl.domSelectors(); // catch the return value of the domSelector function 

    function trigFunction(){
        // add event listnere to the button
        document.querySelector(selectors.add).addEventListener("click", triggered);

        // add event listner to the page 
        document.addEventListener("keydown", function(event){

        if(event.key === "Enter"){
            triggered();
        }

    })

    }
    
    function triggered(){
        // get the value to variables 
        var userInput = UIctrl.readValues();

        // update the appController with the data and gets the returning object
        var value = appCtrl.storeValue(userInput.type, userInput.desc, userInput.value);

        // update the bottom ui of the page 
        UIctrl.updateUI(value, userInput.type);

        // add or reduce the amount from the the monthly income 

        // update the total income and expense at the top of the page 
    }

    return{
        init: function(){
            trigFunction();
        }
    }

})(appController, UIcontroller);

controller.init();