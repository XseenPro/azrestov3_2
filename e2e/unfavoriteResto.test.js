const assert = require("assert");

Feature("UnFavoriteResto");

let firstRestoName;

Before(async ({ I }) => {
  I.amOnPage("/");
  I.waitForElement(".getName", 10);
  I.seeElement(".getName");
  
  firstRestoName = await I.grabTextFrom(".getName");
  
  I.click(".getName");

  I.waitForVisible("#likeButton", 10);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
});

Scenario("Menampilkan restoran favorit", async ({ I }) => {
  I.waitForElement("menu-content", 10);
  I.seeElement("menu-content");
  const favoritedRestoName = await I.grabTextFrom(".main-resto a");

  assert.strictEqual(firstRestoName, favoritedRestoName);
});

Scenario("Menghapus restoran dari favorit", async ({ I }) => {
  I.waitForElement("menu-content", 10);
  I.seeElement("menu-content");

  I.click(".main-resto a");

  I.waitForVisible("#likeButton", 10);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");

  I.waitForElement("#no-data-msg", 10);
  I.seeElementInDOM("#no-data-msg[src='images/no_data.gif']");
});
