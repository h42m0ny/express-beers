import {LitElement, html} from '../../web_modules/lit-element.js';
import bootstrapStyle from '../../web_modules/@granite-elements/granite-lit-bootstrap.js';

class NotFound extends LitElement {

    constructor(){
        super();
    }

    static get properties() {
        return {
            location:{
                type: Object,
            }
        };
    }

    render(){
        return html `
        <div class="not-found">
            <p>Oups something went wrong the page asked at ${this.location.pathname} was not found !</p>
        </div>
        `
    }
}

customElements.define('not-found',NotFound);