// Предзагрузка стр 
window.onload = function () {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setTimeout(function() {
        preloader.classList.add('preloader-hidden')
    },950)
}

// Кнопка подъема
const offset = 250;
const scrollup = document.querySelector('.scrollup');
const scrolluppath = document.querySelector('.scrollup-svgpath');
const pathLength = scrolluppath.getTotalLength();

scrolluppath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrolluppath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength / height);


  scrolluppath.style.strokeDashoffset = dashoffset;
};

window.addEventListener('scroll', () => {
  updateDashoffset();
  if (getTop() > offset) {
    scrollup.classList.add('scrollup-active');
  } else {
    scrollup.classList.remove('scrollup-active');
  }
  
});

scrollup.addEventListener('click', () => {
  window.scrollTo({
    top:0,
    behavior:'smooth'
  });
});

// 3д карточки 
const cards = document.querySelectorAll('.imgmult3d');

for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
}

function startRotate(event) {
    const cardItem = this.querySelector('.imgmult');
    const halhHeight = cardItem.offsetHeight / 2;
    const halhWidth = cardItem.offsetHeight / 2;

    cardItem.style.transform = 'rotateX('+ -
    (event.offsetY - halhHeight)/5 +'deg) rotateY('+ +
    (event.offsetX - halhWidth)/5 +'deg)';
}
function stopRotate(event) {
    const cardItem = this.querySelector('.imgmult');

    cardItem.style.transform = 'rotate(0)';
}

// Видеослайдер 
const btns = document.querySelectorAll(".nav-btn");
    const slides = document.querySelectorAll(".video-slider");
    const contents = document.querySelectorAll(".content");

    var sliderNav = function(manual){
      btns.forEach((btn) => {
        btn.classList.remove("active");
      });

      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      contents.forEach((content) => {
        content.classList.remove("active");
      });

      btns[manual].classList.add("active");
      slides[manual].classList.add("active");
      contents[manual].classList.add("active");
    }

    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        sliderNav(i);
      });
    });

    // Автоплей видеослайдера
    var repeat = function(activeClass){
      let active = document.getElementsByClassName('active');
      let i = 1;

      var repeater = () => {
        setTimeout(function(){
          [...active].forEach((activeSlide) => {
            activeSlide.classList.remove('active');
          });

        slides[i].classList.add('active');
        btns[i].classList.add('active');
        contents[i].classList.add("active");
        i++;

        if(slides.length == i){
          i = 0;
        }
        if(i >= slides.length){
          return;
        }
        repeater();
      }, 18000);
      }
      repeater();
    }
    repeat();


