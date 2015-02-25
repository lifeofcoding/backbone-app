(function(App){
	var Notes = Backbone.Collection.extend({
		url: '/notes',
		model: App.Model.Note
	});
	App.Collection.Notes = Notes;
})(App);