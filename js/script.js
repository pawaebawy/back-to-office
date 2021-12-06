window.onload = function () {

// Smooth scroll to anchors
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// Product images slider
const activateFirstItem = slider => {
  slider.children[0].classList.add('active')
  let lazySrc = slider.children[0].dataset.src
  slider.children[0].setAttribute('src', lazySrc)
}

const handlerSliderLeave = (slider, sliderNav) => {
  for (let i = 0; i < slider.children.length; i++) {
    const image = slider.children[i];
    if (i == 0) {
      image.classList.add('active')
    } else {
      image.classList.remove('active')
    }
  }
  for (let i = 0; i < sliderNav.children.length; i++) {
    const sliderNavItem = sliderNav.children[i];
    if (i == 0) {
      sliderNavItem.classList.add('active')
    } else {
      sliderNavItem.classList.remove('active')
    }
  }
}

const handlerSliderNavEnter = (slider, indexNav, sliderNav) => {
  for (let i = 0; i < slider.children.length; i++) {
    if (i !== 0 && !slider.dataset.loading) {
      let lazySrc = slider.children[i].dataset.src
      slider.children[i].setAttribute('src', lazySrc)
      if (i == slider.children.length - 1) {
        slider.setAttribute('data-loading', 'loaded')
      }
    }
    
    const image = slider.children[i];
    if (image.classList.contains('active')) {
      image.classList.remove('active')
    }
    if (i == indexNav) {
      image.classList.add('active')
    }
  }
  for (let i = 0; i < sliderNav.children.length; i++) {
    const sliderNavItem = sliderNav.children[i];
    if (sliderNavItem.classList.contains('active')) {
      sliderNavItem.classList.remove('active')
    }
    if (i == indexNav) {
      sliderNavItem.classList.add('active')
    }
  }
}

const sliders = document.getElementsByClassName('slider');
if (sliders.length > 0) {
  for (const slider of sliders) {
    activateFirstItem(slider)
    // Если изображений в слайдере больше 1
    if (slider.childElementCount > 1) {
      // Добавляем навигацию по слайдеру
      const sliderNav = document.createElement('div')
      sliderNav.classList.add('slider_nav')
      slider.parentNode.appendChild(sliderNav)
      for (let i = 0; i < slider.childElementCount; i++) {
        const sliderNavItem = document.createElement('div')
        sliderNavItem.classList.add('slider_nav_item')
        sliderNavItem.style.width = 100 / slider.childElementCount + '%'
        sliderNav.appendChild(sliderNavItem)
        if (i == 0) {
          sliderNavItem.classList.add('active')
        }
        sliderNavItem.addEventListener('mouseenter', () => handlerSliderNavEnter(slider, i, sliderNav))
      }
      slider.parentNode.addEventListener('mouseleave', () => handlerSliderLeave(slider, sliderNav))
    }
  }
}

// Lazy load
const lazyImages = document.querySelectorAll('img[data-src]')
const windowHeight = document.documentElement.clientHeight

const points = document.querySelectorAll('.cd_item_point')
for (const point of points) {
  point.addEventListener('click', (e) => {
    e.target.parentNode.classList.toggle('active')
  })
}

}