import { LitElement, html } from '../../web_modules/lit-element.js';
import './beer-list-item.js';
import bootstrapStyle from '../../web_modules/@granite-elements/granite-lit-bootstrap.js';

const criteria =[
    {
        name:"name", 
        label: "Alphabetical"
    },
    {
        name:"alcohol",
        label: "Alcohol content"
    }
];


class BeerList extends LitElement {

    constructor() {
        super();
        this.beers = [];
        this.criterium = criteria[0].name;
        this._getData();
    }

    async _getData() {
        try {
            const response = await fetch('data/beers/beers.json');
            this.beers = await response.json();
        } catch(err){
            console.log('fetch failed', err);
        }
    }

    static get properties() {
        return {
            beers: {
                type: Array,
            },
            filterText: {
                type: String,
            },
            currentBeers: {
                type: String,
                computed:'_getCurrentBeers(beers,filterText)'
            },
            criterium: {
                type: String,
            },
            descendingSort: {
                type: Boolean,
            },


        };
    }

    _inputChange() {
        this.filterText = this.shadowRoot.querySelector('#search').value;
    }

    _currentBeers(beers,filter) {
        return this._getCurrentBeers(beers,filter);
    }

    _getCurrentBeers(beers,filter) {
        let counter = 0;
        let i= 0;
        while (i < this.beers.length) {
            if (this.beers[i].name.match(new RegExp(this.filterText, 'i')) ) {
                counter ++;
            }
            i++;
        }
        return counter;
    }

    _beerSorter(a,b) {
        let invert = 1;
        if (this.descendingSort) {
            invert = -1;
        }
        if (a[this.criterium] === b[this.criterium]) {
            return 0 * invert;
        }
        if (a[this.criterium] < b[this.criterium]) {
            return -1 * invert;
        }
        if (a[this.criterium] > b[this.criterium]) {
            return 1 * invert;
        }
    }

    _sortingChanged() {
        this.criterium = this.shadowRoot.querySelector('#sort').selectedOptions[0].value;
    }

    _descendingChange() {
        this.descendingSort = this.shadowRoot.querySelector('#descending').checked;
    }

    render() {
        return html`
        <div class="beers container">
            <div class="row">
                <div class="col-md-3></div>
                <!-- sidebar content -->
                <div class="form-group">
                    <label for="search">Search</label>
                    <input
                    type="text"
                    class="form-control"
                    id="search"
                    placeholder="Enter search"
                    @input="${this._inputChange}"/>
                    <div>Current search : ${this.filterText}</div>
                    <label for="sort">Sort by</label>
                    <select
                    id="sort"
                    class="form-control"
                    @change="${this._sortingChanged}">${criteria.map((item)=> html `<option value="${item.name}"
                    >${item.label}</option>`)}
                    </select>
                    <label for="descending">Descending sort</label>
                    <input 
                    id="descending" 
                    type="checkbox" 
                    @change="${this._descendingChange}">
                </div>
                <div class="col-md-9">
                    <div class="beers">
                    ${
            this.beers.filter((beer)=> {
                return beer.name && beer.name.match(new RegExp(this.filterText, 'i'));
            }).sort((a,b) => this._beerSorter(a,b))
            .map((beer) => {
                return html`
                            <beer-list-item
                                id="${beer.id}"
                                name="${beer.name}"
                                description="${beer.description}"
                                alcohol="${beer.alcohol}"
                                img="${beer.img}"
                                >
                                </beer-list-item>`
                    ;
            })
            }
                    </div>
                     <div class="nb_beers">Number of beers : ${this._currentBeers(this.beers,this.filterText)}</div>
                </div>  
                         
            </div>
        </div>
        `;
    }

    static get styles() {
        return bootstrapStyle;
    }
}

customElements.define('beer-list', BeerList);