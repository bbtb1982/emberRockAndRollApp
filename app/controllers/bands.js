import Ember from 'ember';

export default Ember.Controller.extend({
	name:'',
	isAddButtonDsiabled: Ember.computed('name', function(){
		return Ember.isEmpty(this.get('name'));
	})
});
