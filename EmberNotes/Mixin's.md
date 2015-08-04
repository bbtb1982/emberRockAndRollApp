##Def
mixin will add properties and methods to a class. they cannot be instanciated directly but must be "mixed in" to another class

“Technically the instance - class - mixin(s) form a chain for property lookup”
##example
sortablemixin
##create Custom Mixin
example below to create custom mixin
```js
var CanSpeak = Ember.Mixin.create({
  fillingWord: '',

  speak: function(sentences) {
    var fillingWord = this.get('fillingWord');
    if (Ember.isBlank(fillingWord)) {
      console.log(sentences.join(' '));
    } else {
      console.log(sentences.join(" " + fillingWord.capitalize() + ", "));
    }
  }
});

var Person = Ember.Object.extend(CanSpeak, {
  name: 'Noname',
  fillingWord: 'uhm',

  intro: function() {
    return this.speak(["Hey, I'm %@.".fmt(this.name), "nice to meet you."]);
  }
});

var Robot = Ember.Object.extend(CanSpeak, {
});

var nobody = Person.create();
nobody.intro(); // => "Hey, I'm Noname. Uhm, nice to meet you."

var amy = Person.create({ name: "Amy", fillingWord: "ah" });
amy.intro(); // => "Hey, I'm Amy. Ah, nice to meet you."

var robot = Robot.create();
robot.speak(["Good morning.", "What can I help you with today?"]); // => "Good morning. What can I help you with today?
```