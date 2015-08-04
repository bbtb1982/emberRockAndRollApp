##configure adapter and serializer ( local storage adapter )
* import local-storage-adapter
* configure adapter
* configure serializer
```sh
ember install ember-localstorage-adapter
ember g adapter application
ember g serializer application
```
####Configure adapter
change to LSAdapter
app/adapters/application.js
```sh
ember install ember-localstorage-adapter
ember g adapter application
ember g serializer application
```
```js
import DS from 'ember-data';

export default DS.LSAdapter.extend({
  namespace: 'yournamespace'
});
```
####Configure Serialzier
stays the same as default,
