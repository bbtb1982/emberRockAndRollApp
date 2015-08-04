import Ember from 'ember';
export default Ember.Controller.extend({
    title: '',
    isAddButtonDisabled: Ember.computed('title', function() {
        return Ember.isEmpty(this.get('title'));
    }),
    canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
        return this.get('songCreationStarted') || this.get('model.songs.length');
    }),
    noSongs: Ember.computed('model.songs.length', function() {
        return this.get('model.songs.length') === 0;
    }),
    actions: {
        enableSongCreation: function() {
            this.set('songCreationStarted', true);
        },
        updateRating: function(params) {
            var song = params.item;
            var rating = params.rating;
            song.set('rating', rating);
            if(song.get('raiting') === rating){
                rating = 0;
            }else{
                song.set('rating', rating);
                song.save();
            }
        }
    }
});