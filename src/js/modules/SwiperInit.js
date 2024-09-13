import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use([Navigation]);

class ResponsiveSliders {
  constructor() {
    this.infoSliderInstance = null;
    this.reviewsSliderInstance = null;

    this.handleResponsiveSliders();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  createSwiperInstance(sliderSelector, params) {
    const sliderElement = document.querySelector(sliderSelector);

    if (!sliderElement) return null;

    return new Swiper(sliderElement, {
      loop: params.loop || false,
      slidesPerView: params.slidesPerView || 1,
      spaceBetween: params.spaceBetween || 0,
      autoHeight: true,
      navigation: {
        nextEl: params.nextEl,
        prevEl: params.prevEl,
      },
      ...params.settings,
    });
  }

  handleResponsiveSliders() {
    const isMobile = window.innerWidth < 767;

    if (isMobile) {
      if (!this.infoSliderInstance) {
        this.infoSliderInstance = this.createSwiperInstance('.js-slider-target-audience-mobile-init', {
          loop: false,
          autoHeight: true,
          nextEl: '.js-swiper-button-next-1',
          prevEl: '.js-swiper-button-prev-1',
          settings: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            centeredSlides: false
          },
        });
      }

      if (!this.reviewsSliderInstance) {
        this.reviewsSliderInstance = this.createSwiperInstance('.js-slider-reviews-mobile-init', {
          loop: false,
          autoHeight: true,
          nextEl: '.js-swiper-button-next-2',
          prevEl: '.js-swiper-button-prev-2',
          settings: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            centeredSlides: false
          },
        });
      }

    } else {
      if (this.infoSliderInstance) {
        this.infoSliderInstance.destroy(true, true);
        this.infoSliderInstance = null;
      }

      if (this.reviewsSliderInstance) {
        this.reviewsSliderInstance.destroy(true, true);
        this.reviewsSliderInstance = null;
      }
    }
  }

  handleResize() {
    this.handleResponsiveSliders();
  }
}

export default ResponsiveSliders;
