##Example
create new reivew object as property of controller. show the new review info only if review object has a state of isNew via isNotReviewed which is a ember.computed.alias for review object state isNew

###Template
    only show new reivew form if reivew.isNew = false via computed.alisas isNotReviews property
```hbs
{{#if isNotReviewed}}
  <div class='new-review'>
    <h3>Review {{title}}</h3>
    {{#if review.text}}
      <p class='text-muted'>{{review.text}}</p>
    {{/if}}
    {{textarea valueBinding='review.text'}}
    <button {{action 'createReview'}} class='btn-primary'>Review</button>
  </div>
{{/if}}
```
###Controller
* create review property on controller to hold new review obj and watch model change to reset review on view change ( this is because controllers are singletons and do no change on route navigation. the model is swapped out.  e.g. I'm in proudct/:product_id  using Product Controller. I change products (product/1 to product/2 ) controller is the same model assoicated to the controller changes to reflect new product in view.
* create isNotReviewed computed.alisas to reference state on new review
* create action createReivew to use reivew property
```js
App.ProductController = Ember.ObjectController.extend({
  text: '',
  review: function(){
  	return this.store.createRecord('review', {
      text: this.get('text'),
			product: this.get('model')
		});
  }.property('model'),  //watch model for change e.g. switching products 
  isNotReviewed: Ember.computed.alias('review.isNew'), // alias for review state
  actions: {
    createReview: function(){
			var controller = this;
  		this.get('review').set('reviewedAt', new Date());
  		this.get('review').save().then(function(review) {
        controller.get('model.reviews').addObject(review);
      });
    }
  }
});
```