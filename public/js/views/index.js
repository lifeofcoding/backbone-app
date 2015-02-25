(function(App){
	var Index = Backbone.View.extend({
		el: '#viewport',
		template: _.template($('#index-tpl').html()),
		render: function(){
			this.$el.html(this.template({model: this.model}));
			return this;
		},
		remove: function() {
			this.$el.empty().off(); /* off to unbind the events */
			this.stopListening();
			return this;
		}
	});
	App.View.Index = Index;
})(App);

