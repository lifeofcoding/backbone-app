(function(App){
	var Navbar = Backbone.View.extend({
		el: '#navbar',
		template: _.template($('#navbar-tpl').html()),
		events: {
			'click li':'onNavClick'
		},
		onNavClick: function(event){
			event.preventDefault();
			this.$el.find('li').removeClass('active');
			$(event.target).parents('li').addClass('active');
		},
		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});
	App.View.Navbar = Navbar;
})(App);

