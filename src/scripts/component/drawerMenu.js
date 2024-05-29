class DrawerMenu extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <button tabindex="0" style="background-color: transparent; border: none; text-decoration: none">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </button>
        
      `;
  }
}

customElements.define('drawer-menu', DrawerMenu);
