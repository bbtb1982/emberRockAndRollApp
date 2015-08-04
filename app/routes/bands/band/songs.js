import Ember from 'ember';
export default Ember.Route.extend({
    model: function(){
        return this.modelFor('bands.band');
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
        	Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(band.get('name')));
        }
    }
});