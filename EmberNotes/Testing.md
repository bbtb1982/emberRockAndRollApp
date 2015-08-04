#Testing Basics
View test in browser via http://localhost:4200/tests

module declaration
*   beforeEach
*   afterEarch
#Run Test
ember test
ember test --server
ember help test
#Anatamy of  an Acceptance Test
The Test will Have a Name
the test takes an assert object with the member functions of
https://api.qunitjs.com/category/assert/
#Test Helpers
helpers are defined in app/tests/helpers/fileName.js

define a function needed
register them via Ember.Test.registerHelper("helperFunctionName", helperFunctionName);

import file via app/tests/start-app.js
incude the file as an import in the head.

### Basic assertions and actions
*   equal()
*   notEqual()
*   ok()
*   notOk()
*   expect()
*   notPropEqual()
*   visit()  // load application to gieven path
*   andThen(function((){ ..contain all assertions .. });

### Async
* click(selector)
* fillIn(selector, text)
* keyEvent(selector, type, keyCode)
* triggerEvent(selector, type, options)
* visit(url)

### Sync
* currentPath()
* currentRouteName()
* currentURL()
* find(selector, context)
#Aacceptance Test

##Deffinition
an automated test that exericses the whole system. the tests are designed to automate user actions.  Acceptance tests may or may not "mock" external dependencies such as API calls.

###Mocking
the act or replacing the actual call of a service (API server, twitter ect. ) with a static "stub" of data to mimic an actual response from the external service.

####Benefits of Mocking
*   quicker testing
*   less development time ( maintaing test envs for external services)
*   no polution of production environment.

###Disadvantages
*   possible false positive on test as a result of varience in mock and real env
##example using preteneder
pretender modifies the XMLHttpRequest Object and intercepts all requests and supplies a mock reponse or STUB.

steps to prep
ember install ember-cli-pretender //this adds the module and blueprint to the site

set up test
*   import the pretender module
*   afterEach: // restore the window.XMLhttpRequest object to default
*       server.shutdown();
*   in the test instanciate a new server
*   in the test "pretend" the response on
*       'url',
*       callback.  will return http_code, headers, body(data)

```js
import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'rarwe/tests/helpers/start-app';
import Pretender from 'pretender';
var application, server;

module('Acceptance | bands', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
        server.shutdown();
    }
});
test('List Bands', function(assert) {
    server = new Pretender(function(){
      this.get('/bands', function(request){
        var bands = JSON.stringify({
          bands:[
            {id: 1, name: 'Radiohead'},
            {id: 2, name: "Long Distance Calling"}
          ]
        });
        return [200, {"Content-Type": "application/json"}, bands];
      });
    });
    
    visit('/bands');
    andThen(function() {
        assert.equal(
          find('.band-link:contains("Radiohead")').length, 1, "First band link container the band name");
        assert.equal(find('.band-link:contains("Long Distance Calling")').length, 1, "The other band link contains the band name");
    });
});
```
#Unit Test
ember g component-test star-rating

By focusing on testing the communcation between the components of the system, BDD ( beharvior driven development ) people clain, the emerging system will have a very felxible, decoupled architecture. the system will be a network of small components where each component only does on thing, and consusts the oterhs to bet the information it needs.

Increased granularity results in the ability to quickly identify where the error(s) occured.
*   unit: true sets-up the test as a unit test. this means the component is rendered in isolation.
*   this.subject()  is the unit under test.
*   this.$() points to the component in the DOM  (jquery selector for the actual component element)
*   

```js
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('star-rating', 'Integration | Component | star rating', {
  unit: true
});

test('Renders the full and empty stars correctly', function(assert) {
  expect(4);

  var component = this.subject();
  Ember.run(function() {
    component.setProperties({
      rating: 4,
      maxRating: 5
    });
  });


  assert.equal(this.$().find('.glyphicon-star').length, 4, "The right amount of full stars is rendered");
  assert.equal(this.$().find('.glyphicon-star-empty').length, 1, "The right amount of empty stars is rendered");

  Ember.run(function() {
    component.set('maxRating', 10);
  });

  assert.equal(this.$().find('.glyphicon-star').length, 4, "The right amount of full stars is rendered after changing maxRating");
  assert.equal(this.$().find('.glyphicon-star-empty').length, 6, "The right amount of empty stars is rendered after changing maxRating");
});
```
##Unit Test Model
ember g model-test <model_name>
make sure to include any "needs" e.g. hasMany or belongsTo "need" the appropiate model to associate.

```js

```
#Intergration Test
Verify the interface ( view/tempalte rendering ) of an object and are somewhere between acceptance and unit tests. the actual application indstance is not spinned up for the test.

```js
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('star-rating', 'StarRatingComponent', {
  integration: true
});

test('Renders the full and empty stars correctly', function(assert) {
  assert.expect(6);

  var song = Ember.Object.create({ rating: 4 });
  this.set('song', song);
  this.set('maxRating', 5);

  this.render(hbs`{{star-rating item=song rating=song.rating maxRating=maxRating}}`);

  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of full stars is rendered");
  assert.equal(this.$('.glyphicon-star-empty').length, 1, "The right amount of empty stars is rendered");

  this.set('maxRating', 10);

  assert.equal(this.$('.glyphicon-star').length, 4, "The right amount of full stars is rendered after changing maxRating");
  assert.equal(this.$('.glyphicon-star-empty').length, 6, "The right amount of empty stars is rendered after changing maxRating");

  this.set('song.rating', 2);
  assert.equal(this.$('.glyphicon-star').length, 2, "The right amount of full stars is rendered after changing rating");
  assert.equal(this.$('.glyphicon-star-empty').length, 8, "The right amount of empty stars is rendered after changing rating");
});
```