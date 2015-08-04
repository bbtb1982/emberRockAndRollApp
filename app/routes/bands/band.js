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
	model: function(params){
		var band = this.store.findRecord('band', params.id);;
		return band;
	}
});
