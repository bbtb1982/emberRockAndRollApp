##Helpers
functions that can be used in hbs and elsewere by generateing a function and registering correctly
*   the function name must be dashed to create handlebars helper automatically.
*   ex. capitalize-words // will create hbs helper
*   ex. capitalizeWords // will NOT create hbs helper
*   e.g. will not add export default Ember.Helper.helper(capitalize) to the helper file. one can add it manually
```sh
ember g helper capitalize-words
```
##Creating Helper
ember generate will "blueprint" the template for you but this is what it looks like
app/helpers/capitalize-words modified for capitalizeWords function needs

it creates a funciton then wrapps that function in the Ember.Helper.helper(); to make the function available in handlebar.
```js
import Ember from 'ember';

export function capitalizeWords(input) {
	var words  = input.toString().split(/\s+/).map(function(word){
		return word.toLowerCase().capitalize();
	});
  return words.join(' ');
}

export default Ember.Helper.helper(capitalizeWords);

```
## Use in routes, controllers and other places

first import the helpers and then call it by its name. or you can namespace and alias the function name on import.
```js
import Ember from 'ember';
import { capitalizeWords as capitalize } from '../../../helpers/capitalize-words';

export default Ember.Route.extend({
    (...)
        didTransition: function(){
        	var band = this.modelFor('bands.band');
            var name = capitalize(band.get('name'));
        	Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(name));
        }
    }
});
```
##HandleBars use
```hbs
{{capitalize-words song.title}}
```
#pre defined helprs
Ember has a plethora of prebuilt helpers.  go take a look!
##input
```hbs
{{input value="http://www.facebook.com"}}

{{input value=firstName action="updateFirstName" on="key-press"}}
```