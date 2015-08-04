##include
```sh
ember install ember-data-fixture-adapter
```
##Configure Aapter
app/adapters/application.js
```js
import DS from 'ember-data';
export default DS.FixtureAdapter.extend({});
```
##Model
```js
import DS from 'ember-data';

var Post = DS.Model.extend({
  title: DS.attr()
});

Post.reopenClass({
  FIXTURES: [
    {
      id: 1,
      title: "Something something Basecamp"
    }
  ]
});

export default Post;
```
##test
set in test
```js
export { default } from 'ember-data-fixture-adapter';
```