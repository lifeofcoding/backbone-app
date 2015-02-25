(function(App){
	var Notes = Backbone.View.extend({
		el: '#notes',
		events: {
			'click .remove':'removeNote',
			'click .edit': 'editNote',
			'click .new': 'newNote'
		},
		initialize: function(){
			this.listenTo(this.collection, "remove sync", this.render);
		},
		displayModal: function(model){
			var template = _.template($('#note-modal-tpl').html())({model:model}),
				noteModal = $('.note-modal'),
				_this = this;
			noteModal.html(template);
			noteModal.find('.modal').modal('show').one('shown.bs.modal', function (e) {
				$(this).find('.save').one('click', function(){
					var noteId = noteModal.find('.modal').data('id'),
						params = noteModal.find('form').serializeArray();
					
					model.set({
						title: params[0].value,
						text: params[1].value
					}).save();
					App.Collection.Notes.add(model);
					noteModal.find('.modal').modal('hide');
				});
			});
		},
		newNote: function(event){
			event.preventDefault();
			var model = new App.Model.Note();
			this.displayModal(model);
		},
		editNote: function(event){
			event.preventDefault();
			var noteId = $(event.target).parents('li').data('id'),
				model = this.collection.findWhere({'_id': noteId});
			this.displayModal(model);
		},
		removeNote: function(event){
			event.preventDefault();
			var con = confirm('Are you sure you want to delete this note?');
			if (con == true) {
				var noteId = $(event.target).parents('li').data('id');
				debugger;
				this.collection.findWhere({'_id': noteId}).destroy();
			}
		},
		template: _.template($('#notes-tpl').html()),
		render: function(){
			this.$el.html(this.template({collection: this.collection}));
			return this;
		},
		remove: function() {
			this.$el.empty().off(); /* off to unbind the events */
			this.stopListening();
			return this;
		}
	});
	App.View.Notes = Notes;
})(App);

