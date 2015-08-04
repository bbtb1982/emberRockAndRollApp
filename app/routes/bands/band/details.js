import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		willTransition: function(transition){
			var controller, leave;
			controller = this.controller;

			if(controller.get('isEditing')){
				leave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
				if(leave){
					controller.set('isEditing', true);
				}else{
					transition.abort();
				}
			}
		},
		save: function(){
			var controller, band;
			controller = this.controller;
			band = controller.get('model');
			return band.save();

		}
	}
});
