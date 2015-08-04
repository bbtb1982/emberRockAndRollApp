#Raw Component
component names must begin with components and have a dash "components/product-details"

a component can only access whatever is passed into it at creation time. It knows nothing about the context and can only communicate with the "outer world" by sending actions to it. The resulting isolation fosters reusability.

the component element will take options:
* tagNmae='li'  defaults to div
* classNames="specialSauce"
```js
{{product-details tagName="li" classNames="row" }}
```
```js
<script type="test/x-handlbars" data-template-name="components/product-details">
    {{#link-to 'ptoduct' product }}{{product.title}}{{/link-to}}
</script>
```
```js
{{product-details tagName="li" classNames="row" }}
```
##Component Object
{{product-details}} has a component Object
* create computed properties
* can set configuration in object instead of on tempalte tag
* can create computed alises from the object being passed in (reviewsCount)
* when calling properties from the component object just call them (see hasReviews in tempalte Example)
```js
App.ProductDetailsComponent = Ember.Component.extend({
    tagName: li,
    classNames: ['now']
    reviewsCount: Ember.computed.alias( 'product.reviews.length' )
    hasReviews: function(){
        return this.get('reviewsCount') > 0;
    }.property('reviewsCount')
});
```
note the {{if}} condition on the hasReivews and displaying the reviewsCount for th product object being passed in.
```hbs
<script type='text/x-handlebars' data-template-name='components/product-details'>
  <img {{bind-attr src='product.image'}} class='img-thumbnail col-sm-5' />
    <div class='col-sm-7'>
      <h2>{{product.title}}</h2>
      <p class='product-description'>{{product.description}}</p>
      <p>{{#link-to 'product' product class='btn btn-success'}}
        Buy for ${{product.price}}{{/link-to}}
      </p>
    </div>
    {{#if hasReviews}}
    	{{reviewsCount}}
    {{/if}}
  </script>
```
## this.sendAction('actionName', {data:to_send});
Use this to allow controllers to stay DRY and reuseable as the controller can contextually implement component logic for the application.
Pass data from the component out to the controller to allow for contextual implemtation.
## Closure Action
call action helper on the component. pass the aciton up to the controller for contextual implemetation
###component
```hbs
{{#each stars as |star|}}
  <span class="star-rating glyphicon {{if star.full "glyphicon-star" "glyphicon-star-empty"}}"
    {{action "set" star.rating}}>
  </span>
{{/each}}
```
###use in template
```hbs
{{star-rating item=song rating=song.rating click=(action "updateRating")}}
```
###component object
prep and pass info up to controller
```js
//...
 actions: {
    	set: function(newRating){
    		this.get('click')({
    			item: this.get('item'),
    			rating: newRating
    		});
    	}
    }
//...
```
###parent controller
```js
import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		updateRating: function(params) {
            var song = params.item;
			var rating = params.rating;
            song.set('rating', rating);
        }
	}
});
```
