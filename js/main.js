var page = document.querySelector('.page');
var mainNav = document.querySelector('.main-nav');
var mainNavToggle = document.querySelector('.main-nav__toggle');

svg4everybody();

page.classList.remove('no-js');

// document.addEventListener('click', function(e) {
//   if(document.activeElement.toString() == '[object HTMLButtonElement]'){
//     document.activeElement.blur();
//   }
// });

page.addEventListener('mousedown', function(){
  if (!page.classList.contains('no-focus')) {
    page.classList.add('no-focus');
  }
});

page.addEventListener('keydown', function(){
  if (page.classList.contains('no-focus')) {
    page.classList.remove('no-focus');
  }
});

mainNavToggle.addEventListener('click', function(){
  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
  } else {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
  }
});
