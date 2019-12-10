import {LitElement, html} from '../../web_modules/lit-element.js';
import bootstrapStyle from '../../web_modules/@granite-elements/granite-lit-bootstrap.js';

class BeerDetails extends LitElement {

    constructor(){
        super();
        this.beer = {};
        //this._getData();
    }

    async _getData(id) {
        try {
            const response = await fetch('/beers/'+id);
            this.beer = await response.json();
            console.log(this.beer)
        } catch(err){
            console.log(    'fetch failed', err);
        }
    }

    static get properties(){
        return {
            location:{
                type: Object,
            },
            beer:{
                type: Object,
            },
        
        };
    }

    static get styles() {
        return bootstrapStyle;
    }

    firstUpdated(changedProperties){
        var id = this.location.params.id;
        this._getData(id);   
    }

    render() {
        //this._getData(this.location.params.id);
        return html`
          <div class="container" id="details">
          <h2 class="center">${this.beer.name}</h2>
          <img class="center el-det-img" src="/img/${this.beer.img}"/>
          <p>${this.beer.description}</p>
          </div>
        `;
      }
}

customElements.define('beer-details',BeerDetails);