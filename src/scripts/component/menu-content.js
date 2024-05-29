import CONFIG from '../globals/config';

class menuContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set resto(restorant) {
    this._resto = restorant;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="container">
          <div class="resto-img">
             <img class="lazyload" src="${CONFIG.BASE_IMAGE_URL}${this._resto.pictureId}" alt="${this._resto.name}"/>
          </div>
          <div class="main-resto">
              <a class="getName" href="/#/detail/${this._resto.id}"><strong tabindex="0">${this._resto.name}</strong></a>
              <div class="resto-review">
                  <p tabindex="0">${this._resto.rating} <i class="fa-solid fa-star"></i></p>
                  <p tabindex="0">${this._resto.city}</p>
              </div>
              <p tabindex="0">
                ${this._resto.description}
              </p>
          </div>   
          </div>  
          `;
  }
}

customElements.define('menu-content', menuContent);
