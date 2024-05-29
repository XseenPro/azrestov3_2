import FavoriteRestaurantIdb from '../../data/favorite-resto-idb';
import '../../component/menu-content';

const Favorite = {
  async render() {
    return `
      <hero-section></hero-section>
      <section class="content" id="content">
        <div id="resto-menu" class="resto-menu">
          <div class="de-title">
            <h5 class="title" tabindex="0">Favorite</h5>
            <h2 tabindex="0">Resto</h2>
          </div>
          <div class="content-inner">
            <div id="favorite-resto"></div>
              <img class="lazyload" src="images/no_data.gif" alt="animasi data none" id="no-data-msg" style="display: none;">
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const favoriteRestoContainer = document.getElementById('favorite-resto');
      const noDataMsg = document.getElementById('no-data-msg');

      if (restaurants.length > 0) {
        noDataMsg.style.display = 'none';
        restaurants.forEach((resto) => {
          const listResto = document.createElement('menu-content');
          listResto.resto = resto;
          favoriteRestoContainer.appendChild(listResto);
        });
      } else {
        noDataMsg.style.display = 'block';
      }
    } catch (error) {
      const contentInner = document.querySelector('.content-inner');
      contentInner.innerHTML = '<img class="lazyload img-error" src="images/error.gif" alt="error-favorite">';
    }
  },
};

export default Favorite;
