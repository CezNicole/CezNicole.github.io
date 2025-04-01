const navlinkAbout = document.getElementById('navlinkAbout');
navlinkAbout.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = './coffee-shop-home.html#about';
})

const navlinkShopNow = document.getElementById('navlinkShopNow');
navlinkShopNow.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = './coffee-shop-home.html#our-products';
})

const navlinkMenu = document.getElementById('navlinkMenu');
if(window.location.pathname.includes('coffee-shop-menu.html')){
    navlinkMenu.classList.add('disabled');
    navlinkMenu.removeAttribute('href');
}