
import _        from "underscore";
import $        from "jquery";
import BaseView from "./BaseView";

export default class RateView extends BaseView {

	className() { return  'rate'; }

	constructor(options){
		super(options);

		this.options = _.defaults(options||{},
									{
										min: 1,
										max: 5,
										rate: 0,
										chars: {
											empty: "",
											half: "",
											full: ""
										}
									}
						);

		this.cache.chars   = {};
		this.options.min   = parseInt( this.options.min );
		this.options.max   = parseInt( this.options.max );
		this.options.rate  = parseFloat( this.options.rate );
	}

	onRender(rendered){
		const min    = this.options.min;
		const max    = this.options.max;
		const rate   = this.options.rate;
		const prefix = '$star-';
		let _char    = this.options.chars.empty;
		let cache    = this.cache;
		let chars    = cache.chars;

		for (var i = min; i <= max; i++) {
			_char = this.options.chars.empty;
			if ( rate >= i )
				_char = this.options.chars.full;
			else if ( rate < i && rate > (i-1)  ) {
				_char = this.options.chars.half;
			}

			if ( rendered ){
				if ( chars[i] !== _char ){
					cache[prefix+i].text( _char );
					chars[i] = _char;
				}
			}else{
				cache[prefix+i]   = $('<span />').data("value", i).text( _char );
				chars[i] = _char;
				this.$el.append( cache[prefix+i] );
			}

		};

		return this;
	}

	update(rate){
		if ( _.isUndefined(rate) || _.isNull(rate) )
			return this;
		this.options.rate = parseFloat(rate);
		this.render();
		return this;
	}

};