##sortProperties
```hbs
App.ReviewController = Ember.ArrayController.extend({
  sortProperties: ['reviewedAt']
})
```
##CRUD
###Create Record
* get input from view and save on controller
* call action in controller
* create new object
* save object
* add new object to model
####template
bind input helper to controller
    {{textarea valueBinding='text'}}
call controller action on click
    <button {{action createReview }}/>Submit Review</button>
```hbs
<div>  
  <div class='new-review'>
    <h3>Review {{title}}</h3>
    {{#if text}}
      <p class='text-muted'>{{text}}</p>
    {{/if}}
    {{textarea valueBinding='text'}}
  </div>
  <button {{action createReview }}/>Submit Review</button>
</div>
```
####Controller
set text property on controller
create action method to be called by action in template
*   get text
*   get current model
*   create new object
*   set properties on new object
*   save object
*   update model to include new object in view.
```js
App.ProductController = Ember.ObjectController.extend({
  text: '',
  actions:{
    createReview: function(text){
    	var review;
      review = this.store.createRecord('review', {                 
        text: this.get('text'),
        product: this.get('model'),
        reviewedAt: new Date()
			});
			var controller = this;      
      review.save().then(function(review){
        controller.set('text', '');
        controller.get('model.reviews').addObject(review);
      });
    }
  }
});
```
