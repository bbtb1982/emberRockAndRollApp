import Ember from 'ember';
import { capitalizeWords as capitalize } from '../../../helpers/capitalize-words';
function wait(promise, delay) {
  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
}

export default Ember.Route.extend({
    model: function(){
        var songs = Ember.RSVP.resolve(this.modelFor('bands.band'));
        return  wait(songs, 1 * 1000);
    },
    actions: {
        createSong: function(){
            var route, controller, band, song;
            route = this;
            controller = this.controller;
            band = this.modelFor('bands.band');

            song = this.store.createRecord('song', {
                title: controller.get('title'),
                band: band
            });
            song.save().then(function(){
                controller.set('title', '');
            });
        },
        didTransition: function(){
        	var band = this.modelFor('bands.band');
            var name = capitalize(band.get('name'));
        	Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(name));
        }
    }
});