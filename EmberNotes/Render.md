##render
call aanother controller inside of a differnt view.  e.g. I call reviews inside of Products though the route structure is that reviews are indepent resources & routes then products.
* inject controllers into another view. e.g. I call reivews controlers into my product views.
call reviews controllers an set the model to an instance of reviews from the current controller
```hbs
{{render 'reviews' reviews}}
```