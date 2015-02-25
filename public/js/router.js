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
			var viewportModel = new App.Model.Index({pageTitle: 'Welcome to my notes App!'});
			var viewport = this.loadView(new App.View.Index({model: viewportModel}));
		},
		displayNotes: function(){
			var notesView, _this = this;
			if(typeof App.Collection.Notes === 'function'){
				App.Collection.Notes = new App.Collection.Notes();
			}

			App.Collection.Notes.fetch({
		        success: function (collection) {
		            notesView = _this.loadView(new App.View.Notes({collection: App.Collection.Notes}));
		        }
		    });
		},
		editNote: function(noteId){
			var model = App.Collection.Notes.get(noteId);
			var editView = this.loadView(new App.View.EditNote({model:model}));
		},
		loadView : function(view) {
			this.view && this.view.remove();
			this.view = view;
			this.view.render();
		}
	});
	App.Router = new Router;
	Backbone.history.start({pushState: true});
})(App);