(function(App){
	var Note = Backbone.Model.extend({
		urlRoot : '/notes',
		idAttribute: '_id',
		defaults:{
			'title':'',
			'text':''
		}
	});
	App.Model.Note = Note;
})(App);