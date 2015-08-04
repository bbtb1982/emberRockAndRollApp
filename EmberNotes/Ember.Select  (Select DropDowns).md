##template
* content is to set array list from controller
* value is to assig default value and save on controller
* actions is 
```hbs
{{view Ember.Select content=ratings value="selectedRating" }}
```
##controller
* create action
* get model (product)
* set selected value on object
App.ProductController = Ember.ObjectController.extend({
  text: '',
  ratings: [1,2,3,4,5],
  selectedRating: 5,
  actions: {
    createRating: function(){
	    var product, selectedRating;
        product = this.get('model');
        selectedRating  = this.get('selectedRating');
        product.get('ratings').addObject(selectedRating);
            product.save();
        }
    }
});