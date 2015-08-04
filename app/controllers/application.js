import Ember from 'ember';
var Song = Ember.Object.extend({
    title: '',
    rating: 0,
    band: ''
});

var SongCollection = Ember.ArrayProxy.extend(Ember.SortableMixin, {
    sortProperties: ['rating'],
    sortAscending: false,
    content: []
});
var songs = SongCollection.create();

var blackDog = Song.create({
	title: 'Black Dog',
	band: 'Led Zeppelin',
	rating: 5
});
var yellowLedbetter = Song.create({
	title: 'Yellow Ledbetter',
	band: 'Peral Jam',
	rating: 3
});
var pretender = Song.create({
	title:'The Pretender',
	band: 'Foo Fighters',
	rating: 2
});

window.songs = songs;

var alwaysWailting = Song.create({
	title:'always Waitlign',
	band: 'kaya project',
	rating: 5
});
window.newSong = alwaysWailting;
songs.pushObjects([yellowLedbetter,pretender,blackDog]);


export default Ember.Controller.extend({
	songs: songs
});