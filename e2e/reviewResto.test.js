/* eslint-disable no-undef */
Feature('ReviewResto');

Before(({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.getName', 5);
  I.click('.getName');
});

Scenario('Reviewing a Restaurant', async ({ I }) => {
  const nameOfReviewer = 'Reviewer';
  const reviewContent = 'testing';

  I.seeElement('#captionReview');

  I.fillField('#name', nameOfReviewer);
  I.fillField('#comment', reviewContent);
  I.click("button[type='submit']");
});
