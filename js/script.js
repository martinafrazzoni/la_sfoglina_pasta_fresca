// navbar
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
  document.querySelector('.navbar').classList.toggle('menu-active');
  
  // Prevent body scrolling when menu is open
  document.body.style.overflow = navbarLinks.classList.contains('active') ? 'hidden' : '';
  toggleButton.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar') && navbarLinks.classList.contains('active')) {
    navbarLinks.classList.remove('active');
    document.querySelector('.navbar').classList.remove('menu-active');
    document.body.style.overflow = '';
  }
});

document.querySelector('.navbar').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.querySelectorAll('.navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    navbarLinks.classList.remove('active');
    document.querySelector('.navbar').classList.remove('menu-active');
    document.body.style.overflow = '';
    toggleButton.classList.remove('open');
  });
});

//lightbox
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('img')
images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active')
    const img = document.createElement('img')
    img.src = image.src
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
  })
})

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})

// //carousel
// my query slector is looking in my whole document and is searching for .carousel_track, and the first one he finds will become my constant track.I need my track but i know i need other things.
const track = document.querySelector('.carousel_track');
//when i click left, move slides to the left
// when i click right move slides to the right.
// when i click the nav indiicators, move to that slide.
 const slides = Array.from(track.children);
 //an Array is grouping my three items together (carousel-slides).
 const nextButton = document.querySelector('.carousel_button--right');
 const prevButton = document.querySelector('.carousel_button--left');
 const dotsNav = document.querySelector ('.carousel_nav');
 const dots = Array.from(dotsNav.children);

 //define how big by carousel is
 const slidewidth = slides[0].getBoundingClientRect().width;
//arange the slides next to one another
 //slides[0].style.left = slidewidth *0 +'px';
 //slides[1].style.left = slidewidth *1 +'px';
// slides[2].style.left = slidewidth *2 +'px';

 // create a loop so we don't have to change the js everytime we make changes on the website. comment out the lines before.
const setSlidePosition = (slide, index) => {
  slide.style.left = slidewidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
  //to keep things working on more than one slide
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0){
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length -1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

//when i click left, move slides to the left
  prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);


    moveToSlide(track, currentSlide, prevSlide);
    updateDots (currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);

  });

// when i click right move slides to the right.
//.addEventListener means listen for something in this case is the click.
nextButton.addEventListener ('click', e =>{
  //we want to move the slides, but first we have to find the current slide.
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  //now i want to move to the next slide, frst we say how much we are going to be  moving to.
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots (currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);

})

// when i click the nav indiicators, move to that slide.
dotsNav.addEventListener('click', e => {
  //what indicator was clicked on
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots (currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

// Load More functionality
document.addEventListener('DOMContentLoaded', function() {
  const loadMoreBtn = document.getElementById('load-more');
  const gridItems = document.querySelectorAll('.grid-item.hidden');
  let currentItems = 4;
  
  // Only initialize load more functionality on mobile
  function initLoadMore() {
    if (window.innerWidth < 580) {
      loadMoreBtn.style.display = 'block';
      gridItems.forEach((item, index) => {
        if (index >= currentItems) {
          item.classList.add('hidden');
        }
      });
    } else {
      loadMoreBtn.style.display = 'none';
      gridItems.forEach(item => {
        item.classList.remove('hidden');
      });
    }
  }

  // Initialize on load
  initLoadMore();

  // Re-initialize on window resize
  window.addEventListener('resize', initLoadMore);
  
  loadMoreBtn.addEventListener('click', function() {
    if (window.innerWidth < 580) {
      const itemsToShow = Array.from(gridItems).slice(currentItems - 4, currentItems + 4);
      
      itemsToShow.forEach(item => {
        item.classList.remove('hidden');
      });
      
      currentItems += 4;
      
      if (currentItems >= gridItems.length + 4) {
        loadMoreBtn.style.display = 'none';
      }
    }
  });
});
