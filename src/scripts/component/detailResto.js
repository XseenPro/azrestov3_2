import restaurantSource from '../data/resto-source';
import CONFIG from '../globals/config';

function createReviewItem(review, index) {
  const viewCommentClass = index % 2 === 0 ? 'view-comment-margin' : '';
  return `
    <li class="${viewCommentClass}">
      <div class="icon-user">
        <div></div>
      </div>
      <div class="info-comment">
        <b>${review.name}</b>
        <p>${review.date}</p>
        <p>${review.review}</p>
      </div>
    </li>
  `;
}

class detailResto extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set resto(restorant) {
    this._resto = restorant;
    this._source = restaurantSource;
    this._listData(restorant);
    this.render();
  }

  _listData(newData) {
    this._categoriesList = this._resto.categories
      .map((category) => `<span>${category.name}</span>`)
      .join(', ');

    this._foodsList = this._resto.menus.foods
      .map((food) => `<li><i class="fa-solid fa-circle-check"></i> &nbsp ${food.name}</li>`)
      .join('');

    this._drinksList = this._resto.menus.drinks
      .map((drink) => `<li><i class="fa-solid fa-circle-check"></i> &nbsp ${drink.name}</li>`)
      .join('');

    this._reviewList = newData.customerReviews
      .map((review, index) => createReviewItem(review, index))
      .join('');
  }

  render() {
    this.innerHTML = `
      <div class="resto-menu">
        <div class="de-title" style="text-align: center;">
          <h5 class="title" tabindex="0">Details</h5>
          <h2 tabindex="0">Resto</h2>
        </div>
      </div>
      <div tabindex="0" class="detail-img">
        <img class="lazyload" id="myimage" src="${CONFIG.BASE_IMAGE_URL}${this._resto.pictureId}" alt="${this._resto.name}" />
      </div>
      <div class="content-detail-resto">
        <h2 tabindex="0" class="nama-resto">${this._resto.name}</h2>
        <p class="rating" tabindex="0">Rating ${this._resto.rating} <i class="fa-solid fa-star"></i></p>
        <ul tabindex="0" class="address">
          <li>${this._resto.city} ,</li>
          <li>${this._resto.address}</li>
          |
          <li>${this._categoriesList}</li>
        </ul>
        <p tabindex="0" class="info">
          ${this._resto.description}
        </p>
      </div>
      <div class="konsumsi">
        <div class="de-title" style="text-align: center;">
          <h2 tabindex="0">Daftar Menu</h2>
        </div>
        <div tabindex="0" class="daftar-menu">
          <div tabindex="0" class="food-content">
            <h3 tabindex="0">Makanan</h3>
            <ul tabindex="0">${this._foodsList}</ul>
          </div>
          <div class="gap-daftar-menu"></div>
          <div tabindex="0" class="drink-content">
            <h3 tabindex="0">Minuman</h3>
            <ul tabindex="0">${this._drinksList}</ul>
          </div>
        </div>
      </div>
      <h3 tabindex="0" class="comment">Comments (${this._resto.customerReviews.length})</h3>
      <ul tabindex="0" class="view-comment">${this._reviewList}</ul>
      <h3 tabindex="0" id="captionReview">Tambahkan Review</h3>
      <form class="add-review">
        <div class="input-container ic1">
          <input id="name" class="input" type="text" placeholder=" " required />
          <div class="cut"></div>
          <label for="name" class="placeholder">First name</label>
        </div>
        <div class="input-container ic2">
          <textarea id="comment" class="input review" type="text" placeholder=" " required></textarea>
          <div class="cut"></div>
          <label for="comment" class="placeholder">Komentar</label>
        </div>
        <button type="submit" name="submit" class="submit" id="submit">Submit</button>
      </form>
    `;
    this.querySelector('.add-review').addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitReview();
    });
  }

  async _submitReview() {
    const nameInput = this.querySelector('#name').value.trim();
    const reviewInput = this.querySelector('#comment').value.trim();

    const newReview = {
      id: this._resto.id,
      name: nameInput,
      review: reviewInput,
    };

    const newData = await this._source.addReview(newReview);
    this._resto.customerReviews = newData.customerReviews;
    this._listData(this._resto);
    this.render();
    this.querySelector('#name').value = '';
    this.querySelector('#comment').value = '';
  }
}

customElements.define('detail-resto', detailResto);
