import Ember from 'ember';
import Pretender from 'pretender';
import { module, test } from 'qunit';
import startApp from 'rarwe/tests/helpers/start-app';
import httpStubs from '../helpers/http-stubs';

var application;
var server;

module('Acceptance | bands', {
    beforeEach: function() {
        application = startApp();
    },
    afterEach: function() {
        Ember.run(application, 'destroy');
    }
});

test('visiting /bands', function(assert) {
    visit('/bands');
    andThen(function() {
        assert.equal(currentURL(), '/bands');
    });
});

test('List Bands', function(assert) {
    server = new Pretender(function(){
      httpStubs.stubBands(this, { bands: [  {id:1, name: 'Radiohead'}, {id: 2, name: "Long Distance Calling"} ]});
    });
    
    visit('/bands');
    andThen(function() {
        assert.equal(find('.band-link:contains("Radiohead")').length, 1, "First band link container the band name");
        assert.equal(find('.band-link:contains("Long Distance Calling")').length, 1, "The other band link contains the band name");
    });
});

test('Create a new band', function(assert){
  server = new Pretender(function(){
    httpStubs.stubBands(this, { bands: [ {id:1, name: 'Radiohead'} ] });
    httpStubs.stubCreateBand(this, {id:2, name:"Long Distance Calling"});
  });

  visit('/bands');
  fillIn('.new-band', 'Long Distance Calling');
  click('.new-band-button');

  andThen(function(){
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', "Created band appears at the end of the list");
    assertElement(assert, '.nav a.active:contains("Songs")', "The Songs tab is active");
  });
});

test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, { bands: [ {id:1, name: 'Radiohead'} ] });
    httpStubs.stubCreateSong(this, {id:2, name:"Killer Cars"});
  });

  selectBand('Radiohead');
  click('a:contains("create one")');
  fillIn('.new-song', 'Killer Cars');
  triggerEvent('.new-song-form', 'submit');

  andThen(function() {
    assertElement(assert, '.songs .song:contains("Killer Cars")', "Creates the song and displays it in the list");
  });
});

test("Sort sogns in varius ways", function(assert){

  server = new Pretender(function(){
    httpStubs.stubBands(this, {
      bands: [
        {id: 1, name:'Them Crooked Vultures', songs:[1,2,3,4]}
      ],
      songs:[
      {id: 1, title:'Elephants', rating: 5},
      {id: 2, title:'New Fang', rating: 3},
      {id: 3, title:'Mind Eraser, No Chaser', rating: 4},
      {id: 4, title:'Spinning in Daffodils', rating: 5}
      ]
    });
  });

  selectBand('Them Crooked Vultures');

  andThen(function(){
    assert.equal(currentURL(), '/bands/1/songs', 'songs route exists');
    assertTrimmedText(assert, '.song:first', 'Elephants', "The first song is the hightest ranked, first in the alphabet");
    assertTrimmedText(assert, '.song:last', 'New Fang', "The last song is the lowest ranked, last in the alphabet");
  });

  click('button.sort-title-desc');
  andThen(function(){
    assert.equal(currentURL(), '/bands/1/songs?sort=titleDesc', 'query param titleDesc exstis');
    assertTrimmedText(assert, '.song:first', 'Spinning in Daffodils', "First song:: Title Descending:: Last Alphabet");
    assertTrimmedText(assert, '.song:last', 'Elephants', "Last song:: Title Descending:: First Alphabet");
  });

  click('button.sort-rating-asc');
  andThen(function(){
      assert.equal(currentURL(), '/bands/1/songs?sort=ratingAsc', 'query param ratingAsc exstis');
      assertTrimmedText(assert, '.song:first', 'New Fang', "Frist Song:: ratingAcs:: Lowest Rating:: Title Apha Asc");
      assertTrimmedText(assert, '.song:last', 'Spinning in Daffodils', "Last Song:: ratingAcs:: Highest Rating:: Title Apha Asc");
  });
});

test('Search songs', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Them Crooked Vultures', songs: [1, 2, 3, 4, 5] }
      ],
      songs: [
        { id: 1, title: 'Elephants', rating: 5 },
        { id: 2, title: 'New Fang', rating: 4 },
        { id: 3, title: 'Mind Eraser, No Chaser', rating: 4 },
        { id: 4, title: 'Spinning in Daffodils', rating: 5 },
        { id: 5, title: 'No One Loves Me & Neither Do I', rating: 3 },
      ]
    });
  });

  visit('/bands/1/songs');

  fillIn('.search-field', 'no');

  andThen(function() {
    assertLength(assert, '.song', 2, "The songs matching the search term are displayed");
  });

  click('button.sort-title-desc');
  andThen(function() {
    assertTrimmedText(assert, '.song:first', 'No One Loves Me & Neither Do I', 'The matching song that comes later in the alhapbet appears on top');
    assertTrimmedText(assert, '.song:last', 'Mind Eraser, No Chaser', 'The matching song that comes sooner in the alhapbet appears on top');
  });
});