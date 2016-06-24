
import _        from "underscore";
import BarView  from "./BarView";
import { getVendorStyle, requestNextAnimationFrame } from "../utils/style";


export default class TitleBarView extends BarView {

	className(){ return 'navigation-bar title-navigation-bar' }

	constructor(options) {
		super(options);

		this.template = require('../../templates/navigations/bar_view.html');
		this.options  = _.defaults( this.options, {title: ''} );
		this.el.style.opacity = 0;

	}

	onRender(rendered) {
		if (rendered) return this;
		this.$el.html( this.template({title: this.options.title}) );
		return this;
	}

	move(percent, direction){

		var style = this.el.style;
		if ( percent === 0 || percent === 100 ){
			this.el.style[ getVendorStyle('transition') ] = 'opacity '+this.options.duration+'ms';
			// Serve per evitare che l'ottimizzatore del browser ignori gli stili modificati
			// nel momento che questa view viene aggiunta al DOM
			requestNextAnimationFrame(function(){
				style.opacity = percent/100;
			});

		}else{
			this.el.style[ getVendorStyle('transition') ] = '';
			style.opacity = percent/100;
		}

		return this;
	}

};