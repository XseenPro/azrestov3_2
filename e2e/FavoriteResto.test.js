Feature('FavoriteResto');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

Scenario("menampilkan restoran favorit kosong", ({ I }) => {
  I.waitForElement("#content", 10);
  I.waitForElement("#no-data-msg", 10);
  
  I.seeElement("#content");
  I.seeElement("#no-data-msg");
  
  I.seeElementInDOM("#no-data-msg[src='images/no_data.gif']");
  
  I.waitForFunction(() => {
    const element = document.querySelector('#no-data-msg');
    return window.getComputedStyle(element).display === 'block';
  }, 10);
});

Scenario("menyukai satu restoran", async ({ I }) => {
  I.waitForElement("#no-data-msg", 10);
  I.seeElement("#no-data-msg");

  I.amOnPage("/");

  I.waitForElement(".getName", 10);
  I.seeElement(".getName");
  const firstRestoName = await I.grabTextFrom(".getName");
  
  I.click(".getName");

  I.waitForElement("#likeButton", 10);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  
  I.waitForElement("menu-content", 10);
  I.seeElement("menu-content");

  const likedRestaurantTitle = await I.grabTextFrom('.main-resto a');
  assert.strictEqual(firstRestoName, likedRestaurantTitle);
});
