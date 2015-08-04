import Ember from 'ember';

function wait(promise, delay){
    return new Ember.RSVP.Promise(function(resolve){
        setTimeout(function(){
            promise.then(function(result){
                resolve(result);
            });
        }, delay );
    });
}


export default Ember.Route.extend({
    model: function() {
        var bands = this.store.findAll('band');
        return bands;
    },
    aftermodel: function(model){
    	var bands = model;
    	if(bands.length === 1){
    		this.transitionTo('bands.band', bands.get('firstObject'));
    	}
    },
    actions: {
    	createBand: function(){
    		var route, controller, band;
    		route = this;
    		controller = this.get('controller');
    		band = this.store.createRecord('band', controller.getProperties('name'));
    		band.save().then(function(){
    			controller.set('name','');
    			route.transitionTo('bands.band.songs', band);
    		});

    	},
    	didTransition: function(){
    		Ember.$(document).attr('title', 'Bands - Rock & Roll');
    	}
    }
});