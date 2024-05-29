import LikeButtonInitiator from "../../src/scripts/utils/likeButtonInitiator";

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'), restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
