var _            = require('underscore');
var fs           = require('fs');
var ListItemView = require('./ListItemView');

var template     = _.template(fs.readFileSync(__dirname+'/../../templates/listviews/group_list_item_view.html', 'utf8'));

var GroupListItemView = module.exports = ListItemView.extend({

	className: function className() {
		return 'group-list-item ' + ( _.result(this, "addClass") || '' );
	},

	template: template,

	initialize: function initialize(options) {
		GroupListItemView.__super__.initialize.apply(this, arguments);

		if (typeof options.group === 'undefined')
			throw new Error('Cannot create GroupListItemView without a "group"');

		this.group = options.group;
	},

	render: function render() {
		this.$el.html( this.template() );
		return this;
	}

});