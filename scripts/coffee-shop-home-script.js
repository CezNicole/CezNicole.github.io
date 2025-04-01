const btnShopNow = document.querySelector('#btnShopNow');
btnShopNow.addEventListener('click', (event) => {
    event.preventDefault();
    location.href = '#our-products';
})

const navlinkNitro = document.getElementById('navlinkNitro');
if(window.location.pathname.includes('coffee-shop-home.html')){
    navlinkNitro.classList.add('disabled');
    navlinkNitro.removeAttribute('href');
}