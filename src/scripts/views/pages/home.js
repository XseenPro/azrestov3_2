import restaurantSource from '../../data/resto-source';
import '../../component/menu-content';
import '../../component/heroSection';

const Home = {
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
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await restaurantSource.home();
      const favoriteRestoContainer = document.getElementById('favorite-resto');
      restaurants.forEach((resto) => {
        const listResto = document.createElement('menu-content');
        listResto.resto = resto;
        favoriteRestoContainer.appendChild(listResto);
      });
    } catch (error) {
      const contentInner = document.querySelector('.content-inner');
      contentInner.innerHTML = "<p class='errorHandling'>Terjadi kesalahan saat memuat data restoran.</p>";
    }
  },
};

export default Home;
