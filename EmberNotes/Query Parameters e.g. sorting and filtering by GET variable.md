## Basics

query paramerts are defined as properites on the controller and must define is default value
```js
export default Ember.Controller.extend({
  queryParams: ['search'],
  search: '',
})
```
### defining query parameter as an object
this defines an alias in the url and actual value in the controller e.g. 's' in the url 'search' in the controller.
```js
export default Ember.Controller.extend({
  queryParams: {
    search: 's',
  },
  search: '',
})
```