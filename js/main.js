var page = document.querySelector('.page');
var mainNav = document.querySelector('.main-nav');
mainNav
var mainNavToggle = document.querySelector('.main-nav__toggle');

var storageName = localStorage.getItem('name');
var storageSecondName = localStorage.getItem('secondname');
var storagePhone = localStorage.getItem('phone');
var storageEmail = localStorage.getItem('email');

var modal = document.querySelectorAll('.modal');
var modalClose = document.querySelectorAll('.modal__btn--close');
var modalSuccess = document.querySelector('.modal--success');
var modalFailure = document.querySelector('.modal--failure');

var reviewForm = document.querySelector('.review__form');
if (reviewForm) {
  var reviewFormRequired = reviewForm.querySelectorAll('[required]');
  var reviewName = reviewForm.querySelector('[name=first_name]');
  var reviewSecondName = reviewForm.querySelector('[name=second_name]');
  var reviewPhone = reviewForm.querySelector('[name=phone]');
  var reviewEmail = reviewForm.querySelector('[name=email]');
}

svg4everybody();

page.classList.remove('no-js');

if (reviewForm) {
  reviewForm.setAttribute('novalidate', 'novalidate');
  reviewName.value = storageName;
  reviewSecondName.value = storageSecondName;
  reviewPhone.value = storagePhone;
  reviewEmail.value = storageEmail;
}

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

if (reviewForm && modalFailure && modalSuccess) {
  // Валидация формы
  reviewForm.addEventListener('submit', function(event){
    event.preventDefault();

    var invalid = false;

    for (i = 0; i < reviewFormRequired.length; i++) {

      if (!reviewFormRequired[i].value) {
        invalid = true;

        if (reviewFormRequired[i].classList.contains('field-text__input')) {
          reviewFormRequired[i].closest('.field-text').classList.add('field-text--error')
        }
      } else {
        if (reviewFormRequired[i].classList.contains('field-text__input')) {
          reviewFormRequired[i].closest('.field-text').classList.remove('field-text--error')
        }
      }
    }

    // Отображения информационного попапа
    if (invalid) {
      modalFailure.classList.add('modal--show');
    } else {
      modalSuccess.classList.add('modal--show');

      localStorage.setItem('name', reviewName.value);
      localStorage.setItem('secondname', reviewSecondName.value);
      localStorage.setItem('phone', reviewPhone.value);
      localStorage.setItem('email', reviewEmail.value);
    }
  });
}

if (modal) {
  // Кнопка закрытия для всех модальных окон
  for (var i = 0; i < modal.length; i++) {
    modal[i].addEventListener('click', function(event) {
      event.target.classList.remove('modal--show');
    });

    modalClose[i].addEventListener('click', function() {
      var modal = this.closest('.modal');
      modal.classList.remove('modal--show');
    });
  }

  window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
      for (var i = 0; i < modal.length; i++) {
        modal[i].classList.remove('modal--show');
      }
    }
  });
}
