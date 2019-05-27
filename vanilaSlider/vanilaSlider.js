(() => {

  function Slider(param) {
    const slider = document.querySelector(param.slider),
      slides = document.querySelectorAll(param.slides),
      wrap = newElement("div", ["vanilaSlider__list"]),
      slideCount = slides.length,
      showCount = param.showCount || 1,
      wrapWidth = slideCount * 100 / showCount,
      showLimit = slideCount - showCount,
      context = this;
    let btnPrev = document.querySelector(param.btnPrev) || false,
      btnNext = document.querySelector(param.btnNext) || false,
      currentSlide = 0,
      sliderInteval;

    this.init = () => {
      slider.innerHTML = null;
      wrap.style.width = wrapWidth + "%";
      slider.classList.add("vanilaSlider");
      slides.forEach(it => {
        it.classList.add("vanilaSlider__item");
        wrap.appendChild(it);
      });
      addControllers();
      addEvents();
      slider.appendChild(wrap);
    }

    this.nextSlide = (e) => {
      e ? e.preventDefault() : null;
      changeCurrentSlide("next");
      wrap.style.transform = `translateX(-${100 / slideCount * currentSlide}%)`;
    }

    this.prevSlide = (e) => {
      e ? e.preventDefault() : null;
      changeCurrentSlide("prev");
      wrap.style.transform = `translateX(-${100 / slideCount * currentSlide}%)`;
    }

    this.autoSlide = time => {
      sliderInteval = setTimeout(() => {
        this.nextSlide();
        this.autoSlide(time);
      }, time);
    }

    this.stopAutoSlide = () => {
      clearTimeout(sliderInteval);
    }

    function addControllers() {
      if (!btnPrev || !btnNext) {
        btnPrev = newElement("button", ["vanilaSlider__controllers", "vanilaSlider__controllers--prev"], slider);
        btnNext = newElement("button", ["vanilaSlider__controllers", "vanilaSlider__controllers--next"], slider);
      } else {
        slider.appendChild(btnPrev);
        slider.appendChild(btnNext);
      }
    }

    function newElement(nodeName, arrClass, append) {
      let newNode = document.createElement(nodeName);
      arrClass.forEach(it => {
        newNode.classList.add(it);
      });
      return append ? append.appendChild(newNode) : newNode;
    }

    function changeCurrentSlide(direct) {
      if (direct == "next") {
        currentSlide >= showLimit ? currentSlide = 0 : currentSlide++;
      } else if (direct == "prev") {
        currentSlide <= 0 ? currentSlide = showLimit : currentSlide--;
      }
    }

    function addEvents() {
      btnNext.addEventListener("click", context.nextSlide);
      btnPrev.addEventListener("click", context.prevSlide);
    }
    this.init();
  }
  window.VanilaSlider = Slider;

})();
