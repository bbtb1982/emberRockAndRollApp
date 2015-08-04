Ember is a "Bowser Application Framework" it is not best to describe ember as an SPA or an MVC as it is not an application excuting on a single route and does implement all server-side equivlents of a traditional MVC.

In that spirit, I'll call the state of the application, the ensemble of the views a "page", which is described by the page's URL. URLs are the serialized form of the application's state and deserialization is handled by the routing mechanism
##locationType env setting

this defines how the urls are rendered by ember. the default in ember-cli project is 'auto'
possible values are history, hash, none, auto

history: uses hsitory.pushState and history.replaceState to update urls
hash: uses hashchange event and will have the # in the url.
name: does not alter the url in any way. (good for testing... maybe)
auto: defaults to history then hash if the browser does not support history
##Create Route
```sh
ember g resource <resource_name>
```
This route below will force show to be rendered inside of products and not on the application.hbs {{outlet}}. it essentially nests the assets by resource 
```js
App.Router.map(function() {
  this.resource("posts", { path: "/" }, function() {
    this.resource("post", { path: "/:post_id" }, function() {
      this.route("edit", { path: "/edit" });
    });

    this.route("new", { path: "/new" });
  });
});
```
This route nesting will allow the post template to completely replace the posts template via the application {{outlet}}
```js
App.Router.map(function() {
  this.resource("posts", { path: "/" }, function() {
    this.route("new", { path: "/new" });
  });

  this.resource("post", { path: "/:post_id" }, function() {
    this.route("edit", { path: "/edit" });
  });
});
```
PostRoute
PostController
PostView

PostIndexRoute
PostIndexController
PostIndexView

PostEditRoute
PostEditController
PostEditView
