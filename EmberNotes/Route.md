##Create Route
ember g route <route_name>
<div>The route’s function is to fetch the resource/models, do low level prep and pass the collections to the controllers.</div><div>The route can call events e.g. beforemodel, aftermodel, init, etc..</div><div>One can call data from from the server or bind local data in the form of fixtures or local storage.</div>
###Index route
this route is a little special in that you add the route manually and do your normal stuffl.
```js
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
##Route Hooks
The Route Hooks below are in order by execution.
```js
beforeModel: function(transition){...},

model: function(params, stransition){...},

afterModel: function(model, transition){},

setupController: function (controller, model, transition){...}

```
##Route Actions
exectued at the beginning and end of a transition. defined inside of the actions property for the route
* willTranstion
* didTransition
```js
export default Ember.Route.extend({
    beforeModel: function(){},
    model: function() {
        return bands;
    },
    afterModel: function(){},
    actions: {
      willTransition: function(transition){},
      didTransition: function(){}
    }
});
```
##Skipping model resolution
if the route is loading a "known model" by segment. beforemodel and aftermodel are skipped. example I load /bands/:slug/  the first time beforemodel and model are called. subsequent times aftermodel is called since the ember as already fetched and processed the model eariler it does not need to prepare or load the model again. 

The takeaway is that you shouldn't place any code in the beforeModel and model hooks of routes with a dynamic segment that you expect to be run every time, regardless of how the route was transitioned to