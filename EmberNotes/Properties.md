## Computed property macros

A computed property macro (CPM) is a computed property where the dependencies and the function body have been "precompiled." CPMs thus mean less repetition, more readable, and more robust code.

use case todo app where the controllers will count the total number of todos pending completion.

##not so good way
pay attention to the misspelling on line 3 'modoel.@each.isComlpete'  super easy to miss
```js
export default Ember.Controller.extend({
  (...)
  pendingTodos: Ember.computed('model.@each.isComlpete', function() {
    return this.get('model').filter(function(todo) {
      return todo.get('isCompleted') === false;
    });
  }),

  pendingTodosCount: Ember.computed('pendingTodos.length', function() {
    return this.get('pendingTodos').length;
  }),
});
```
##better way
much easier to read. the macro beign .filterBy() and .length();
```js
export default Ember.Controller.extend({
  (...)
  pendingTodos: Ember.computed.filterBy('model', 'isComplete', false),
  pendingTodosCount: Ember.computed.length('pendingTodos'),
});
```