#Install
https://github.com/lfridael/ember-cli-font-awesome
```sh
ember install ember-cli-font-awesome
ember generate ember-cli-font-awesome
```
##include for  ember-cli-build
```js
var app = new EmberApp({
  emberCliFontAwesome: {
    useScss: true
  }
});
```
#include in sass
app.scss
```scss
@import "font-awesome/path";
```
##basic Usege
```scss
{{fa-icon "fa-camera"}}
{{fa-icon "camera"}}

{{fa-icon "star" size="lg"}}
{{fa-icon "star" size=2}}
{{fa-icon "star" size=3}}
{{fa-icon "star" size=4}}
{{fa-icon "star" size=5}}

{{fa-icon "camera" rotate=90}}
{{fa-icon "camera" rotate=180}}
{{fa-icon "camera" rotate=270}}
```