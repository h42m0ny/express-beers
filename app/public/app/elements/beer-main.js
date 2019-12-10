import {LitElement, html} from '../../web_modules/lit-element.js';
import bootstrapStyle from '../../web_modules/@granite-elements/granite-lit-bootstrap.js';
import {HashRouter} from '../../web_modules/@granite-elements/granite-vaadin-router.js';
//import {Router} from '../../web_modules/@vaadin/router.js';
import './beer-list.js';
import './beer-details.js';
import './beer-home.js';
import './not-found.js';

class BeerMain extends LitElement {

    constructor() {
        super();
    }

    static get properties() {
        return {

        };
    }

    static get styles() {
        return bootstrapStyle;
    }

    firstUpdated() {
        const outlet = this.shadowRoot.querySelector('#outlet');
        const  router = new HashRouter(outlet);
        router.setRoutes([  
            {path: '/beers',  component: 'beer-list'},
            {path: '/beer/:id', component: 'beer-details'},
            {path: '(.*)', component: 'beer-list'},
        ]);
    }

    render(){
        return html `
        <div id="outlet">
            <nav>
                <a href="/beers">Beers</a>
            </nav>
        </div>
        `;
    }
}
customElements.define('beer-main',BeerMain);