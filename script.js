//Is my script.js working?
console.log('Script.js is now linked & running!')

const nvbar = document.querySelector('.nvbar');
const nvbarLinksWrapper = document.querySelector('.nv-links-wrapper');
const body = document.querySelector('body');


//top of the page navbar change - transparent to white

nvbarLinksWrapper.addEventListener('mouseenter',()=>{
    if(AmIatTop == "True" && !mobileView){
    nvbar.classList.remove('transparent');
    }
});
nvbarLinksWrapper.addEventListener('mouseleave',()=>{
    if(AmIatTop == "True" && !mobileView){
        nvbar.classList.add('transparent');
    } 
});

//Observer
var AmIatTop = "True"; //Boolean Variable that changes based  on observer in other words: Are we on tpo of the page or not?
const ToggleWhiteNav = document.querySelector('.observer-div');//this class is the class of the div that will be at the top of the page
const HeroSectionOptions = {};
const HeroSectionObserver = new IntersectionObserver(function(
    entries,
    HeroSectionObserver
){
    entries.forEach(entry => {
       // console.log(entry.target); //checking if console fires up on intersection of redbox
       if(entry.isIntersecting){
        AmIatTop = "True";
        console.log("AmIatTop = " + AmIatTop)
       } else{
        AmIatTop = "False";
        console.log("AmIatTop = " + AmIatTop)
       }
    })
},
HeroSectionOptions);

HeroSectionObserver.observe(ToggleWhiteNav);

//Burger-Menu
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', ()=>{
  if(!menuOpen){
    productsNvLink.classList.add('default-open'); //Activate Products DD Link Wrapper Hover Effect
    productsDdDiv.classList.add('default-open'); //Activate Products DD Div Hovered Effect
    menuBtn.classList.add('open');
    nvbarLinksWrapper.classList.add('open');
    body.style.overflow = 'hidden';//removing the scrollbar if the menu is open
    menuOpen = true;
  }else{
    menuBtn.classList.remove('open');
    nvbarLinksWrapper.classList.remove('open');
    body.style.overflow = 'unset';//adding back the scrollbar if the menu is closed
    menuOpen = false;
  }
});


//Hide or Show Navbar on scroll - That also checks if Navbar is Open in Mobile View
const productsDdDiv = document.getElementById('products-dd-div')
const productsNvLink = document.getElementById('products')

function NvScrollingAction(){
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', ()=>{
        if(!menuOpen & lastScrollY < window.scrollY){
            //console.log('Menu is closed and we are scrolling down')
            nvbar.classList.remove('transparent');
            nvbar.classList.add('move-up');
        } else if(!menuOpen & lastScrollY > window.scrollY){
            //console.log('Menu is closed and we are scrolling up')
            nvbar.classList.remove('move-up');
        }else if(menuOpen & lastScrollY < window.scrollY){
            //console.log('Menu is open and we are scrolling down')
        }else if(menuOpen & lastScrollY > window.scrollY){
            //console.log('Menu is open and we are scrolling up')
        }
        lastScrollY = window.scrollY;
    })
};
NvScrollingAction();


//A function that automatically changes navbar to transparent when reached to the top 
//This function works only on mobile because i have another function that makes the AmIatTop div height to 0
function changeNvToTransparent(){
    if(AmIatTop == "True"){
        nvbar.classList.add('transparent');
    }
}
window.addEventListener('scroll', changeNvToTransparent);
window.addEventListener('resize', changeNvToTransparent);
window.addEventListener('load', changeNvToTransparent);


//Are we on mobile & Turning off transparent & turning off menuOpen
var mobileView = false;
function checkMobileView(){
    if(document.body.offsetWidth < 1000){
        mobileView = true;
        console.log('We are now in mobile view');
        nvbar.classList.remove('transparent');
        ToggleWhiteNav.style.height = "0px"; //Changing Observer Div to stop working when we are in mobile view
        ToggleWhiteNav.style.transform = "translateY(-100px)";
        

    }else{
        mobileView = false;
        console.log('We are now in desktop view');
        ToggleWhiteNav.style.height = "10px"; //Turning back on the observer div
        ToggleWhiteNav.style.transform = "translateY(0)";
        menuBtn.classList.remove('open');
        nvbarLinksWrapper.classList.remove('open');
        menuOpen = false;
        body.style.overflow='unset';
    };
}
checkMobileView();
window.addEventListener('resize', checkMobileView);
window.addEventListener('onload', checkMobileView);

//On Hover other Mobile Tabs remove the default products tab hover effect
nvbarLinksWrapper.addEventListener('mouseenter', ()=>{
    if(document.body.offsetWidth < 1000){
        productsNvLink.classList.remove('default-open');
        productsDdDiv.classList.remove('default-open');
    }
});