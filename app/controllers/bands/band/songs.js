import Ember from 'ember';
import { capitalizeWords } from '../../../helpers/capitalize-words';
export default Ember.Controller.extend({
    title: '',
    matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function(){
        var searchTerm = this.get('searchTerm').toLowerCase();
        return this.get('model.songs').filter(function(song){
            return song.get('title').toLowerCase().indexOf(searchTerm) !== -1; 
        });
    }),
    newSongPlaceholder: Ember.computed('model.name', function(){
        var bandName = this.get('model.name');
        return "New %@ song".fmt(capitalizeWords(bandName));
    }),
    queryParams: {
        sortBy: 'sort',
        searchTerm:'s'
    },
    searchTerm: '',
    sortBy: 'ratingDesc',
    sortProperties: Ember.computed('sortBy', function(){
        var options = {
            "ratingDesc": "rating:desc,title:asc",
            "ratingAsc": "rating:asc,title:asc",
            "titleDesc": "title:desc",
            "titleAsc": "title:asc",
        };
        return options[this.get('sortBy')].split(',');
    }),
    sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),
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
        setSorting: function(option){
            this.set('sortBy', option);
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