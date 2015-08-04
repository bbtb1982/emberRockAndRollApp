##heirearchy
Template > View > component
```hbs

```
## View Object
* the isOnSale property using the computed alisas allows access to the controller in the view. if the value is not found on the controller computed.alias will search the model.
```js
App.ProductView = Ember.View.extend({
  classNames: ['row'],
  classNameBindings: ['isOnSale'],
  isOnSale: Ember.computed.alias('controller.isOnSale')
});
```
##template
```hbs
<script type='text/x-handlebars' data-template-name='product'>
    <div class='row'> //will conditionally add classNameBindings class see note below
    ...
    </script>
```
## ClassNameBindings
* conditionally set class in view based on truthyness of computed property in view i.e. if isOnSale is true then add class is-on-sale to the element that has ClassNames: