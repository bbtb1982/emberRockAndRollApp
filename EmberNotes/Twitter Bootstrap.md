<span class="hljs-tag" style="color: rgb(0, 0, 128); font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace; font-size: 14px; line-height: 19px; white-space: pre; widows: 1;">ember</span><span style="font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace; font-size: 14px; line-height: 19px; white-space: pre; widows: 1; background-color: rgb(248, 248, 248);"> </span><span class="hljs-rule" style="font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace; font-size: 14px; line-height: 19px; white-space: pre; widows: 1;"><span class="hljs-attribute" style="color: rgb(0, 128, 128);">install</span><span class="hljs-value"> ember-bootstrap</span></span><br>
with bower directly

bower install bootstrap

app/ember-cli-build.js
```js
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir: 'assets' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', { destDir: 'fonts' });
  app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', { destDir: 'fonts' });
```