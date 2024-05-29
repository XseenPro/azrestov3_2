class likeNotPressed extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
        <button aria-label="like this restaurant" id="likeButton" class="like">
            <i class="fa-regular fa-heart" aria-hidden="true"></i>
        </button>
        `;
  }
}

customElements.define('like-no-pressed', likeNotPressed);
