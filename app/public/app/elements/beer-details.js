import {LitElement, html} from '../../web_modules/lit-element.js';
import bootstrapStyle from '../../web_modules/@granite-elements/granite-lit-bootstrap.js';

class BeerDetails extends LitElement {

    constructor(){
        super();
        this.beer = {};
        this._getData();
    }

    async _getData() {
        try {
            
            const response = await fetch('data/beers/beers.json');
            let beers = await response.json();
            this.beer = beers.find(item => item.id === this.location.params.id);
        } catch(err){
            console.log('fetch failed', err);
        }
    }

    static get properties(){
        return {
            location:{
                type: Object,
            },
            beer:{
                type: Object,
            }
        };
    }

    static get styles() {
        return bootstrapStyle;
    }

    render() {
        return html`
          <div id='details'>
          <h2>${this.beer.name}</h2>
          <img class="center el-det-img" src="/app/data/img/${this.beer.img}"/>
          <p>${this.beer.description}</p>
          </div>
        `;
      }
}

customElements.define('beer-details',BeerDetails);