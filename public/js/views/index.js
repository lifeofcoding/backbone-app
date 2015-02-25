(function(App){
	var Index = Backbone.View.extend({
		el: '#viewport',
		template: _.template($('#index-tpl').html()),
		render: function(){
			this.$el.html(this.template({model: this.model}));
			return this;
		}
	});
	App.View.Index = Index;
})(App);

