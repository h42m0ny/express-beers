import {LitElement, html} from '../../web_modules/lit-element.js';
import bootstrapStyle from '../../web_modules/@granite-elements/granite-lit-bootstrap.js';

class BeerHome extends LitElement {

   constructor(){
       super();
   }
   
    static get properties() {
        return {

        };
    }

    static get styles() {
        return bootstrapStyle;
    }

    render() {
        return html `
        <div class="home">Welcome to Beer Store</div>
        `
    }
}