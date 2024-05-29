import FavoriteIdb from '../data/favorite-resto-idb';
import '../component/likeNotPressed';
import '../component/likePressed';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resto;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    const likeButton = document.createElement('like-no-pressed');
    this._likeButtonContainer.innerHTML = '';
    this._likeButtonContainer.appendChild(likeButton);

    const likeButtonElement = document.querySelector('like-no-pressed');
    likeButtonElement.addEventListener('click', async () => {
      await FavoriteIdb.putRestaurant(this._resto);
      this._renderButton();
    });
  },

  _renderLiked() {
    const likedButton = document.createElement('like-pressed');
    this._likeButtonContainer.innerHTML = '';
    this._likeButtonContainer.appendChild(likedButton);

    const likedButtonElement = document.querySelector('like-pressed');
    likedButtonElement.addEventListener('click', async () => {
      await FavoriteIdb.deleteRestaurant(this._resto.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
