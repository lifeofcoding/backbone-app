(function(App){
	var Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'notes': 'displayNotes'
		},
		initialize: function(){
			var navbar = new App.View.Navbar();
			navbar.render();
			
			$(document).on("click", "a:not([data-bypass])", function(evt) {
				var href = {
					prop: $(this).prop("href"),
					attr: $(this).attr("href")
				};
				var root = location.protocol + "//" + location.host + Backbone.history.options.root;

				if (href.prop && href.prop.slice(0, root.length) === root) {
					evt.preventDefault();
					var page = href.attr;

					Backbone.history.navigate(page, true);
				}
			});
		},
		index: function(){
			if($('#viewport').length === 0){
				$('body').append('<div id="viewport" class="container"></div>');
			}
			var viewportModel = new App.Model.Index({pageTitle: 'Welcome to my notes App!'});
			var viewport = new App.View.Index({model: viewportModel});

			viewport.render();

			this.on('route', function(route, params) {
				if(route === 'displayNotes'){
					viewport.remove();
				}
			});
		},
		displayNotes: function(){
			if($('#notes').length === 0){
				$('body').append('<div class="container" id="notes"></div>');
			}
			var notesView;
			if(typeof App.Collection.Notes === 'function'){
				App.Collection.Notes = new App.Collection.Notes();
			}

			App.Collection.Notes.fetch({
		        success: function (collection) {
		            notesView = new App.View.Notes({collection: App.Collection.Notes});
					notesView.render();
		        }
		    });
			this.on('route', function(route, params) {
				if(route === 'index'){
					notesView.remove();
				}
			});
		},
		editNote: function(noteId){
			var model = App.Collection.Notes.get(noteId);
			var editView = new App.View.EditNote({model:model});
			editView.render();
		}
	});
	App.Router = new Router;
	Backbone.history.start({pushState: true});
})(App);