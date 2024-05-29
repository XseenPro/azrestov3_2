import 'regenerator-runtime';
import '../styles/main.sass';
import '../styles/restorant.sass';
import '../styles/detail-resto.sass';
import '../styles/responsif.sass';
import './component/drawerMenu';
import App from './views/app';
import swRegister from './utils/swRegister';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';


const START = 10;
const NUMBER_OF_IMAGES = 100;
const thecontent = document.getElementById('thecontent');
const skipLink = document.querySelector('.skip-link');
const app = new App(thecontent);

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

skipLink.addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('thecontent').scrollIntoView({ behavior: 'smooth' });
  skipLink.blur();
});

document.addEventListener('DOMContentLoaded', () => {
  const navigationLinks = document.querySelectorAll('nav ul li a');
  const hamburgerLinks = document.querySelectorAll('nav .hamburger .line');
  const navLinks = document.querySelectorAll('nav');
  const logo = document.querySelectorAll('nav .logo h1');

  function isHeroVisible() {
    const heroContented = document.getElementById('hero');
    if (!heroContented) return false;
    const rect = heroContented.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < windowHeight * 0.9 && rect.bottom >= 0;
  }
  function updateNavigationColor() {
    const updateLinkStyles = (links, styles) => {
      links.forEach((link) => {
        Object.assign(link.style, styles);
      });
    };

    const addHoverEffect = (link, enterStyles, leaveStyles) => {
      link.addEventListener('mouseenter', () => Object.assign(link.style, enterStyles));
      link.addEventListener('mouseleave', () => Object.assign(link.style, leaveStyles));
    };

    if (isHeroVisible()) {
      navigationLinks.forEach((link) => {
        updateLinkStyles([link], { color: 'white' });
        addHoverEffect(link, { color: 'black', backgroundColor: '#f5f5f5' }, { color: 'white', backgroundColor: 'transparent' });
      });
      updateLinkStyles(hamburgerLinks, { backgroundColor: 'white' });
      updateLinkStyles(navLinks, { backgroundColor: 'transparent' });
      updateLinkStyles(logo, { color: 'white', webkitTextStroke: '1px red' });
    } else {
      navigationLinks.forEach((link) => {
        updateLinkStyles([link], { color: 'black' });
        addHoverEffect(link, { color: 'white', backgroundColor: '#B13B30' }, { color: 'black', backgroundColor: 'transparent' });
      });
      updateLinkStyles(hamburgerLinks, { backgroundColor: 'black' });
      updateLinkStyles(navLinks, { backgroundColor: 'rgba(255, 255, 255, 1)' });
      updateLinkStyles(logo, { color: 'black', webkitTextStroke: '2px red' });
    }
  }

  updateNavigationColor();
  window.addEventListener('scroll', updateNavigationColor);
});

window.addEventListener('load', () => {
  const loader = document.querySelector('.se-pre-con');
  const content = document.querySelector('.hero-content');

  loader.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    loader.style.opacity = '0';
  }, 500);
  if (loader && content) {
    loader.addEventListener('transitionend', () => {
      loader.parentNode.removeChild(loader);
      content.style.opacity = '0';
      setTimeout(() => {
        content.style.transition = 'opacity 1s ease';
        content.style.opacity = '1';
      }, 500);
    });
  }
});
