import '../../component/detailResto';
import UrlParser from '../../routes/urlParser';
import source from '../../data/resto-source';
import LikeButtonInitiator from '../../utils/likeButtonInitiator';

const Detail = {
  async render() {
    return `
      <hero-section></hero-section>
      <div class="paper" style="top:-10px;">
        <img class="lazyload line-resto" tabindex="-1" src="./images/heros/paper2.png" alt="paper" />
      </div>
      <section class="detail" id="content"></section>
      <div class="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await source.detailRestaurant(url.id);

      const detailResto = document.createElement('detail-resto');
      detailResto.resto = restaurant;
      document.querySelector('.detail').innerHTML = '';
      document.querySelector('.detail').appendChild(detailResto);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('.likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
        },
      });
    } catch (error) {
      document.querySelector('.detail').innerHTML = '<img class="lazyload img-error" src="images/error.gif" alt="error-detail">';
    }
  },
};

export default Detail;
