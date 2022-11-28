document.querySelectorAll(".dropdown__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
    autoHide: false,
    scrollbarMaxSize: 25,
  });
})

function tooltipTextInstaller(content, tooltip){
  tippy(tooltip, {
    content: content,
  });
}
tooltipTextInstaller('Пример современных тенденций - современная методология разработки  ','.tooltip-1')
tooltipTextInstaller('Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции','.tooltip-2')
tooltipTextInstaller("В стремлении повысить качество ",'.tooltip-3')


document.addEventListener('click', (e) => {
  if (document.querySelector('.dropdown__active')) {
    let dropdownActive = document.querySelector('.dropdown__active');
    let btnActive = document.querySelector('.btn__active')
    let withinBoundaries = e.composedPath().includes(dropdownActive) || e.composedPath().includes(btnActive);
    if (!withinBoundaries) {
      dropdownActive.classList.toggle("dropdown__active");
      btnActive.classList.toggle('btn__active');
    }
  }
})

document.querySelectorAll('.checkbox__label').forEach(item => {
  item.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
      event.preventDefault()
      if (item.querySelector('.checkbox__input').checked) {
        item.querySelector('.checkbox__input').checked = false;
        item.classList.remove('checkbox__label--active');
      } else {
        item.querySelector('.checkbox__input').checked = true;
        item.classList.add('checkbox__label--active');
      }
    }
  })
})

document.querySelectorAll('.checkbox__label').forEach(item => {
  item.addEventListener('click', function () {
    if (item.querySelector('.checkbox__input').checked) {
      item.classList.add('checkbox__label--active');
    } else {
      item.classList.remove('checkbox__label--active');
    }
  })
})

document.querySelector('.burger-btn-open').addEventListener('click', () => {
  document.querySelector('.burger').classList.add('burger--active')
  document.querySelector('body').classList.add('burger--active')
})

document.querySelector('.burger-btn-close').addEventListener('click', () => {
  document.querySelector('.burger').classList.remove('burger--active')
  document.querySelector('body').classList.remove('burger--active')
})

document.querySelectorAll('.header-top__link').forEach(function (link) {
  link.addEventListener('click', () => {
    document.querySelector('.burger').classList.remove('burger--active')
    document.querySelector('body').classList.remove('burger--active')
  })
})

document.querySelector('.btn-open').addEventListener('click', function () {
  this.classList.add('btn-open--active')
  document.querySelector('.form-adaptiv').classList.add('form-adaptiv--active')
})

document.querySelector('.form-adaptiv__btn-close').addEventListener('click', () => {
  document.querySelector('.btn-open').classList.remove('btn-open--active')
  document.querySelector('.form-adaptiv').classList.remove('form-adaptiv--active')
})

const btns = document.querySelectorAll(".menu__btn");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function () {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  })
})

const container = document.querySelector(".container")
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 2000,
  autoplay: {
    delay: 2000
  },
  effect: "fade",
  allowTouchMove: false,
})

const galerySelect = document.querySelector('.galery__select');

const choices = new Choices(galerySelect, {
  searchEnabled: false,
  itemSelectText: ""
})

const galerySwiper = new Swiper('.galery-swiper', {
  slidesPerView: 3,
  spaceBetween: 3,
  slidesPerGroup: 50,
  navigation: {
    nextEl: ".galery-swiper__button-next",
    prevEl: ".galery-swiper__button-prev"
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    slideLabelMessage: '{{index}} Слайд из {{slidesLength}} Слайдов'
  },
  breakpoints: {
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
    769: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    600: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 38,
    },
    270: {
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerGroup: 1,
    }
  }
})

new Accordion('.accordion-list', {
  elementClass: 'accordion-list__item',
  triggerClass: 'accordion-list__control',
  panelClass: 'accordion-list__content',
  activeClass: 'accordion-list--active'
});

let tabsBtn = document.querySelectorAll('.tabs-nav__btn');
let tabsItem = document.querySelectorAll('.tabs-item');
const catalogTab = document.getElementById('catalog-tabs')
function scrollToTab() {
  catalogTab.scrollIntoView()
}

window.onresize = scrollManager

function scrollManager() {
  if (window.screen.width < 769) {
    tabsBtn.forEach(function (element) {
      element.addEventListener('click', scrollToTab)
    })
  } else {
    tabsBtn.forEach(function (element) {
      element.removeEventListener('click', scrollToTab)
    })
  }
}

scrollManager()

document.querySelectorAll('.galery__link').forEach(function (element) {
  element.addEventListener('click', () => {
    if(document.querySelector('.overlay').style.display != 'none')
      document.querySelector('body').style.overflow = 'hidden'
  })
})

function bodyScrolling() {
  document.querySelector('body').style.overflow = 'visible'
}

document.querySelector('.card__btn-close').addEventListener('click', bodyScrolling)
document.querySelector('.go-back').addEventListener('click', bodyScrolling)

tabsBtn.forEach(function (element) {
  element.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function (btn) { btn.classList.remove('tabs-nav__btn--active') });
    e.currentTarget.classList.add('tabs-nav__btn--active');

    tabsItem.forEach(function (element) { element.classList.remove('tabs-item--active') });
    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active')
  })
})


const developmentsSwiper = new Swiper('.developments-swiper__body', {
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,
  navigation: {
    nextEl: ".developments-swiper__button-next",
    prevEl: ".developments-swiper__button-prev"
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    slideLabelMessage: '{{index}} Слайд из {{slidesLength}} Слайдов'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
    800: {
      slidesPerGroup: 3,
      spaceBetween: 27,
    },
    769: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },
    270: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 30,
    }
  }
})


const portnerSwiper = new Swiper('.portner-swiper__body', {
  slidesPerView: 1,
  spaceBetween: 50,
  slidesPerGroup: 1,
  navigation: {
    nextEl: ".portner-swiper__button-next",
    prevEl: ".portner-swiper__button-prev"
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    slideLabelMessage: '{{index}} Слайд из {{slidesLength}} Слайдов'
  },
  breakpoints: {
    1025: {
      slidesPerView: 3,
    },
    769: {
      slidesPerView: 2,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    }
  }

})

ymaps.ready(init);
function init() {
  const mapElem = document.querySelector('#map');
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "200px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" }
    }
    );

    myMap.behaviors.disable('scrollZoom');

    const myPlacemark = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/src/placemark.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-20, -20],
      }
      );

      myMap.geoObjects.add(myPlacemark);
      myMap.container.fitToViewport();
    }

    let selector2 = document.querySelector('input[type="tel"]');
    let im = Inputmask({ "mask": "+7 (999)999-99-99" }).mask(selector2);

    im.mask(selector2);


  const validation = new JustValidate('.main-form')
  validation
  .addField('#name', [
  {
    rule: 'required',
      errorMessage: 'Вы не ввели имя',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Некорректно введено имя',
    },
    {
      rule: 'maxLength',
      value: 20,
      errorMessage: 'Некорректно введено имя',
    }
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Вы не ввели телефон',
    },
    {
      validator: () => {
        const phone = selector2.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      },
      errorMessage: 'Некорректно введен номер',
    }
  ]).onSuccess((form) => {
    console.log(form)
    let formData = new FormData(document.querySelector('.main-form'));

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }

  xhr.open('post', '../php/mail.php', true);
  xhr.send(formData);

  document.querySelector('.main-form').reset();
  })


