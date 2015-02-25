(function(App){
	var Note = Backbone.View.extend({
		template: _.template($('#note-tpl').html()),
		initialize: {
			this.collection.listenTo(this.collection, remove, this.render());
		},
		removeNote: function(this){
			var noteId = $(event.target).data('id');
			this.collection.get(noteId).destory();
		},
		render: function(){
			this.$el.html(this.template(this.model));
			return this;
		}
	});
	App.View.Note = Note;
})(App);