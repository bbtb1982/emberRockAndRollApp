##Include ember.js
<div>ember.js</div><div>handlebars.js</div><div>jQuery.js</div>
```html
<html>
  <head>
    <script src="js/libs/handlebars-v1.3.0.js"></script>
    <script src="js/libs/ember.js"></script>
    <script src="js/libs/ember-data.js"></script>
  </head>
  <!-- ... -->
```
##bower package managemnt
```sh
cd /path/to/ember/app/

bower install jquery;
```
##configure application
example_app/config/environments.js
```js

contentSecurityPolicy: {
    'font-src': "'self' data: fonts.gstatic.com",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com"
}
```
##configure adapter and seralizer ( local Storage Adapter )
```sh
cd /path/to/ember/app/
bower install jquery;
bower install ember-localstorage-adapter --save;
```
###Adapter
```js
App.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'yournamespace'
});
```
###Serializer
```js
App.ApplicationSerializer = DS.LSSerializer.extend();
```
#Router
___
register router and assign routes &nbsp;(nested routes), resources, and dynamic segments
```js
App.Router.map(function(){
  this.route('route_name');
  this.resource('products', function(){
    this.route('show', {path:'/products/:product_id'});
  });
});
```
####routes render to:
These routes create these url’s
http://example.com/
http://example.com/products
http://example.com/products/1
#Model (Ember Data)
___
* include Ember Data
* define model and properties
* all models must have a unique id
```html
<html>
  <head>
    <script src="js/libs/handlebars-v1.3.0.js"></script>
    <script src="js/libs/ember.js"></script>
    <script src="js/libs/ember-data.js"></script>
  </head>
  <!-- ... -->
```
###Adapters
adapters may requires additional javascript files to be loaded
e.g. localstorage requires bower install ember-localstorage-adapter --save;
```js
// default json adapter
App.ApplicationAdapter = DS.RESTAdapter.extend({});

// fixtures adapter (load from memory good for stubbing new applicaiton)
App.ApplicationAdapter = DS.FixtureAdapter.extend({});

//localStorage Adapter ()
App.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'yournamespace'
});
```
###define the model
```js
App.Product = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean', {defaultValue: false})
});
```
###Create Fixtures (if using DS.FixtureAdapter )
```js
App.Product.FIXTURES = [
    {id:0, title:'some such title', isOnSale: false},
    {id:1, title:'some such title', isOnSale: false},
    {id:2, title:'some such title', isOnSale: true}
  ];
```
###relationships
association of models
ex. products has many reviews. a review belongsTo one products.
one can create bi-directional relationships by placing the appropiate relations on both objects. bi-directional relatioships are not required. uni-directionaly are allowed.
```js
a.belongsTo('b', {async: true}); b.belongsTo('a', {async: true});  //one to one
a.hasMany('b', {async: true});   b.belongsTo('a', {async: true});  //one to many,
a.hasMany('b', {async: true});   b.hasMany('a', {async: true});    // many to many
```
#Route
___
The route function is to fetch and prep the model to be passed to the controller.
The route can call events e.g. beforemodel, aftermodel, init, etc..
One can call data from from the server or bind local data in the form of fixtures or local storage.
###Index route
this route is a little special in that you add the route manually and do your normal stuffl.
```hbs
App.IndexRoute = Ember.Route.extend({});
```
```js
App.ExampleRoute = Ember.Route.extend({
  //bind our model to route
  model: function(params){
    // return App.Products; for a fixtue of collection
    return jQuery.get('http://urlToServer/' . params.product_id )
  }
});
```
###Filtering Model By Parent Route
it is possilbe to fetch the parent collection and filter by it to set the model collection
.modelFor('route_name')  the route name. ??? does modelFor()  require the model to be a direct ancestor ???
```js
// ...
  model: function(){
    reutrn this.modelFor('products').filterBy('isOnSale');  
  }
// .. 
```
##Controller
___
The Controller decorates the model and contains actions to be called in view. (view Model)
The controller name mapps to the name of the route.
e.g. this.route('about')  has App.AboutController = Ember.Controller.Extend({});
```js

App.IndexController = Ember.Controller.Extend({
  productsCount: 6,
  secondProperty: "strings and strings",
  TotalProducts: function(){
    //stuff todo
    return 10;
  },
  actions:{
    //action called in template needing to be done.
    someName: function(){
      //stuff we do to do it.
    }
  }
})
```
###computed properties
Functions in the controller make sure to append .property() to the function to get it to execute the function. 

.property() can be bound to other properties to watch for chagne e.g. I want to calc new count when products change in list.
### ArrayController
use this controllers to interact with arrays of objects and be able to sort and such.
```hbs
App.ProductController = Ember.ArrayController.extend({
  sortProperties: ['title'],
  sortAscending: false; //set to sort descending. defaults to true;
});
```
###Filtering arrays
the ArrayController object allow for filtering on the collection.
the .property('propertyToWatchForChange') can take a property to watch and update on change.
```js
App.IndexController = Ember.ArrayController.extend({
  onSale: function(){
    reutrn this.filter(function(product){
      return product.get('isOnSale');
    });
  }.property('isOnSale') // watch this property for changes
});

//could be refactored to 
// .. code above in controller
onSale: function(){
  return this.filterBy('isOnSale', true).slice(0,3) //slice will only return the first three of the collection.
  
}.property('@each.isOnSale') //@each watches cahnges on any item
// .. code below in controller
```
.filter accepts a anyomous function &nbsp;so to filter by lessThan value
```js
deals: function(){
  return this.filter(function(product){ return product.get('price') < 500; })
}.property(@eartch.price);
```
#Template
___
Ember uses handlebars to create its views. Each template is wrapped in a script tag and imported/nested using {{outlet}}
####create handlebars application template
```hbs
<html>
  <head></head>
  <body>
    <script type="text/x-handlebars" data-template-name="application">
    <div class="container">{{outlet}}</div>
    </script>
  </body>
</html>
```
####add handlebaars templates
```hbs
<html>
  <head></head>
  <body>
    <script type="text/x-handlebars" data-template-name="application">
    <div class="container">{{outlet}}</div>
    </script>
    <!--additional templates to render in outlet above -->
    <script type="text/x-handlebars" data-template-name="about">...</script>
    <script type="text/x-handlebars" data-template-name="products">...</script>
    <script type="text/x-handlebars" data-template-name="shipping">...</script>
  </body>
</html>
```
####Nest Templates
ex: we have products that we want to dynamically swap on navigation
```js
App.Router.map(function(){
  this.resource('products', {path:'/products'}, function(){
    this.route('product', {path:'/products/:slug'});
  });
})
```
generates:<br><div>http://example.com/products</div><div>http://example.com/products/product_slug<br></div><div><br></div><div>we need to dynamically nest product route with products list next to it&nbsp;</div><div>( image is showing the route names for each section )</div><div>&nbsp; _products.index___</div><div>| &nbsp; ______ &nbsp; ______ &nbsp;|<br></div><div>| &nbsp; products product &nbsp;|</div><div>| &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp;|<br></div><div>| &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp;|<br></div><div>| &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;| &nbsp;|<br></div><div>| &nbsp; |______| |_____| &nbsp;|</div><div>| _______________ |<span style="line-height: 1.4;">&nbsp;</span></div>
#handlebar Helpers
___
###links {{link-to}}
```hbs
{{-- create dynamic link via route-name --}}
<ul>
  {{#link-to 'index' class="" tagName="li" }}Home{{/link-to}}
</ul>
```
###looping {{#each}}
```hbs
{{#each reviews as |review|}}
 {{review.title}}
{{else}}
  there are no reviews. write one!!
{{/each}}
```
pay attention to looping on collection in nexted items. THIS
```hbs
{{#each onSale}}
  	  <h2>{{title}}</h2>
	    <p>{{description}}</p>
    	<p>{{#link-to 'product' this}}Buy for ${{price}}{{/link-to}}</p>
  	{{/each}}
```
<div>/********************************</div><div>&nbsp;* Install Mirage Testig Suite</div><div>&nbsp;*******************************/</div><div>/** define config for mirage testing */</div><div>/** app/mirage/config.js */</div><div>export default function() {</div><div>&nbsp; &nbsp; this.namespace = 'my-api.my-awesome-company.com';</div><div><br></div><div>&nbsp; &nbsp; this.get('/movies', 'movies');</div><div>}</div><div><br></div><div><br></div><div>/** create mirage stub models. */</div><div>/** app/mirage/factories/movie.js */</div><div>import Mirage from 'ember-cli-mirage';</div><div><br></div><div>export default Mirage.Factory.extend({</div><div>&nbsp; &nbsp; name: i =&gt; 'name ${i}',</div><div>&nbsp; &nbsp; rating: 5,</div><div>&nbsp; &nbsp; trailer_link: i =&gt; 'https://youtube.com/video/${i}'</div><div>});</div><div><br></div><div>/** seed data &nbsp;app/mirage/scenarios/default.js */</div><div>export default function(store) {</div><div>&nbsp; &nbsp; store.createList('movie', 10);</div><div>}</div><div><br></div><div>/** stub test for mirage &nbsp;in config.js */</div><div>/** ... append to config. */</div><div>this.post('/movies', function(store, request) {</div><div>&nbsp; &nbsp; var attrs = JSON.parse(request.requestBody);</div><div>&nbsp; &nbsp; var movie = store.movies.insert(attrs);</div><div>&nbsp; &nbsp; return { movie: movie };</div><div>});</div><div><br></div><div><br></div><div><br></div><div>/** write tests */</div><div>import Ember from 'ember';</div><div>import { module, test } from 'qunit';</div><div>import testHelper from '../test-helper';</div><div><br></div><div>module('Acceptance: Movies', {</div><div>&nbsp; &nbsp; beforeEach: function() {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; testHelper.beforeEach.apply(this, arguments);</div><div>&nbsp; &nbsp; &nbsp; &nbsp; visit('/');</div><div>&nbsp; &nbsp; },</div><div><br></div><div>&nbsp; &nbsp; afterEach: function() {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; testHelper.afterEach.apply(this, arguments);</div><div>&nbsp; &nbsp; }</div><div>});</div><div><br></div><div>test('created movies are shown on the page', function(assert) {</div><div>&nbsp; &nbsp; visit('/');</div><div><br></div><div>&nbsp; &nbsp; andThen(function() {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; fillIn(find('input.name'), 'Jurassic World');</div><div>&nbsp; &nbsp; &nbsp; &nbsp; fillIn(find('input.rating'), '10');</div><div>&nbsp; &nbsp; &nbsp; &nbsp; fillIn(find('input.trailer'), 'https://www.youtube.com/watch?v=RFinNxS5KN4');</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; click('button.form-submit');</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; andThen(function() {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; assert.equal(find(".movies-list .movie").length, 1);</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div>&nbsp; &nbsp; });</div><div>});</div><div><br></div><div><br></div><div>//another test</div><div>test('movies are shown on the page', function(assert) {</div><div>&nbsp; &nbsp; andThen(function() {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; var movie = server.create('movie');</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; visit('/');</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; andThen(function() {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; assert.equal(find(".movies-list .movie span.title").html(), `Name: ${movie.name}`);</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div>&nbsp; &nbsp; });</div><div>});</div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div>/********************************</div><div>&nbsp;* Create Models</div><div>&nbsp;* app/models/</div><div>&nbsp;* $ ember generate model &lt;example_model&gt;</div><div>&nbsp;*******************************/</div><div>// modify model app/modles/example_model</div><div>// add attributes to model</div><div>import DS from 'ember-data';</div><div><br></div><div>export default DS.Model.extend({</div><div>&nbsp; &nbsp; title: DS.attr('string'),</div><div>&nbsp; &nbsp; description: DS.attr('string'),</div><div>&nbsp; &nbsp; tasks: DS.hasMany('task')</div><div>});</div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div>/********************************</div><div>&nbsp;* Register Routes in</div><div>&nbsp;* router.js</div><div>&nbsp;* $ ember generate resource &lt;example_resource&gt;</div><div>&nbsp;* $ ember generate route &lt;example_route&gt;</div><div>&nbsp;*******************************/</div><div>//create router</div><div>import Ember from 'ember';</div><div>import config from './config/environment';</div><div><br></div><div>var Router = Ember.Router.extend({</div><div>&nbsp; &nbsp; location: config.locationType</div><div>});</div><div><br></div><div>Router.map(function () {</div><div>//create resource</div><div>&nbsp; &nbsp; this.resource('lists', function () {</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.resource('list', {path: '/:list_id'}, function () {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; this.route('edit');</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; this.route('delete');</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.route('new');</div><div>&nbsp; &nbsp; });</div><div><br></div><div>&nbsp; &nbsp; this.resource('tasks', function () {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.resource('task', {path: '/:task_id'}, function () {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; this.route('edit');</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; this.route('delete');</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.route('new');</div><div>&nbsp; &nbsp; });</div><div>});</div><div><br></div><div>export default Router;</div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div>/********************************</div><div>&nbsp;* Define the Routes</div><div>&nbsp;* app/routes/</div><div>&nbsp;* $ ember generate resource</div><div>&nbsp;* $ ember generate route</div><div>&nbsp;*******************************/</div><div>//create route</div><div>//populate the route with info using beforeModel and store.push()</div><div>//assign the model to the controller in model:</div><div>import Ember from 'ember';</div><div><br></div><div>export default Ember.Route.extend({</div><div>&nbsp; &nbsp; beforeModel: function () {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.store.push('list', {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id: 0,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; title: 'title 1',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; description: 'desc list 0'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.store.push('list', {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id: 1,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; title: 'title 1',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; description: 'desc list 1'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.store.push('list', {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id: 2,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; title: 'title 2',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; description: 'desc list 2'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.store.push('task', {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id: 0,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; title: 'title 0',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; description: 'desc list 0'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.store.push('task', {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id: 1,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; title: 'title 1',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; description: 'desc list 1'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.store.push('task', {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id: 2,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; title: 'title 2',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; description: 'desc list 2'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; this.store.push('task', {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; id: 3,</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; title: 'title 3',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; description: 'desc list 3'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; });</div><div>&nbsp; &nbsp; },</div><div>&nbsp; &nbsp; model: function () {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; return this.store.find('list', 1);</div><div>&nbsp; &nbsp; }</div><div>});</div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div>/********************************</div><div>&nbsp;* Create the Controllers</div><div>&nbsp;* app/controllers/</div><div>&nbsp;*******************************/</div><div>// create controller</div><div>// decorate the model for view rendering</div><div><br></div><div>// app/controllers/lists.js</div><div>export default Ember.ArrayController.extend({</div><div>&nbsp; &nbsp; //get the lenth of list.</div><div>&nbsp; &nbsp; listCount: function () {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; return this.get("content").get("length");</div><div>&nbsp; &nbsp; }.property("content")</div><div>});</div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div><br></div><div>/********************************</div><div>&nbsp;* Create Template Views (hbs)</div><div>&nbsp;* app/templates/</div><div>&nbsp;*******************************/</div><div>//create template &nbsp;(handelbars)</div><div>// app/templates/lists.hbs</div><div><br></div><div><br></div><div><br></div><div><br></div>
