import API_ENDPOINT from '../globals/apiEndpoint';

class restaurantSource {
  static async home() {
    const response = await fetch(API_ENDPOINT.HOME);
    try {
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch {
      throw new Error('Terjadi kesalahan saat memproses data.');
    }
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    try {
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch {
      throw new Error('Terjadi kesalahan saat memproses data.');
    }
  }

  static async addReview(data) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    try {
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      throw new Error('Terjadi kesalahan saat memproses data.');
    }
  }
}

export default restaurantSource;
