class HeroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
    <div class="hero" id="hero" tabindex="-1">
        <div class="hero-content" tabindex="-1">
          <h3 class="title" tabindex="0">Azkal Resto</h3>
          <h1 class="sub-title" tabindex="0">Favorite Restorant</h1>
          <a href="#resto-menu" class="btn-main button">Lebih lanjut</a>
        </div>
      </div>
      <div class="paper">
        <img class="lazyload line-resto" tabindex="-1" src="./images/heros/paper.png" alt="paper" />
      </div>
  `;
  }
}

customElements.define('hero-section', HeroSection);
