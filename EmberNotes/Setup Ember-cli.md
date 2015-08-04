##Create Applicaiton
```sh
ember new example_app
```
##add bower dependancies
navigate to example_app directory
```sh
bower install jquery &&
bower install moment --save &&
bower install ember-localstorage-adapter --save;
```
##add javascript to build pipeline
./ember-cli-build.js
```js
app.import('bower_components/moment/moment.js');
```
##configure Application
example_app/config/environments.js
```js
contentSecurityPolicy: {
    'font-src': "'self' data: fonts.gstatic.com",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com"
}
```
##Http-mock Stubs
* make sure to close sublime text when restarting ember server
```sh
ember g http-mock <model_to_mock>
```
###configure http-mock Stub
server/mocks/<model_to_mock>
change the res.send({project:{id: 1, number: 123, name: 'Fooshnickins'}}); noted below to be the colleciton needed.
```js
module.exports = function(app) {
  var express = require('express');
  var projectRouter = express.Router();
  projectRouter.get('/', function(req, res) {
    res.send({project:[]});
  });
  app.use('/api/project', projectRouter);
};
```
###Test htp-mock
```js
curl -H "ContentType:application/json" http://localhost:4200/api/<model_to_mocK>
```
##configure adapter and serializer ( local storage adapter )
* import local-storage-adapter
* configure adapter
* configure serializer
```sh
ember g adapter application &&
ember g serializer application;
```
#Add LocalStorage Adapter (conditional if your going to use for lcoalstorage stubbing);
```js
ember install ember-localstorage-adapter
```
####Configure LocalStorage Adapter
change to LSAdapter
app/adapters/application.js
```js
import DS from 'ember-data';

export default DS.LSAdapter.extend({
  namespace: 'yournamespace'
});
```
####Configure Serialzier
stays the same as default