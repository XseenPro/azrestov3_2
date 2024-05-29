import '../component/drawerMenu';

const mobileNav = document.querySelector('.hamburger');
const navbar = document.querySelector('.menubar');

const DrawerInitiator = () => {
  navbar.classList.toggle('active');
  mobileNav.classList.toggle('hamburger-active');
};
const hideNavbarOnLoad = () => {
  if (window.innerWidth <= 768) {
    navbar.classList.remove('active');
    mobileNav.classList.remove('hamburger-active');
  }
};
document.addEventListener('DOMContentLoaded', hideNavbarOnLoad);
mobileNav.addEventListener('click', () => DrawerInitiator());

export default DrawerInitiator;
