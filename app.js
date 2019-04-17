var appController = (function(){
    // something 
})();

var UIcontroller = (function(){
    //something

    var getSelectors = {
        typeString : ".add__type",
        descString : ".add__description",
        valueString : ".add__value",
        addString : ".add__btn"
    };
    
    return{
        getValues: function(){
            return ({
                type : document.querySelector(getSelectors.typeString).value,
                desc : document.querySelector(getSelectors.descString).value,
                value : document.querySelector(getSelectors.valueString).value,
            })
            
        },

        getSelectorValues: function(){
            return getSelectors;
        }
    }
})();

var controller = (function(appCtrl, uiCtrl){

    var allSelectors = uiCtrl.getSelectorValues();
    var ctrlAddItem = function(){

        // call the ui controller to get the values 

        // get the values to the app controller
        var enteredValues = UIcontroller.getValues();
        console.log(enteredValues);
        

        // update the ui wi the entered value 

        // add the entered value to the total 

        // update the mothly budget
        
    }

    document.querySelector(allSelectors.addString).addEventListener('click', ctrlAddItem);
        

    document.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
        ctrlAddItem();
        }
    });
})(appController, UIcontroller);

