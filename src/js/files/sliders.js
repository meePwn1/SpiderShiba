/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Autoplay, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.marquee-page__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.marquee-page__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 15,
			// autoHeight: true,
			speed: 4000,

			//touchRatio: 0,
			allowTouchMove: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,


			// Эффекты
			// effect: 'fade',
			autoplay: {
				delay: 0,
				stopOnLastSlide: false,
				reverseDirection: true,
				disableOnInteraction: false // или сделать так, чтобы восстанавливался autoplay после взаимодействия
			},


			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			// on: {

			// }
		});
	}
	if (document.querySelector('.slider-team-page__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.slider-team-page__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination],

			pagination: {
				el: '.slider-team-page__bullets',
				clickable: true,
			},
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 54,
			speed: 600,
			// loop: true,
			// watchOverflow: true,

			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 1,
					spaceBetween: 15
				},
				478: {
					slidesPerView: 1,
					spaceBetween: 20

				},
				// when window width is >= 768px
				768: {
					slidesPerView: 2,
					spaceBetween: 20
				},
				// when window width is >= 992px
				992: {
					slidesPerView: 3,
					spaceBetween: 54
				}
			}
		});
	}
	if (document.querySelector('.team-page__list-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.team-page__list-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			// autoHeight: true,
			speed: 5000,

			//touchRatio: 0,
			allowTouchMove: false,
			loop: true,
			loopedSlides: 10,
			//preloadImages: false,
			//lazy: true,


			// Эффекты
			// effect: 'fade',
			autoplay: {
				delay: 0,
				stopOnLastSlide: false,
				reverseDirection: true,
				disableOnInteraction: false // или сделать так, чтобы восстанавливался autoplay после взаимодействия
			},


			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			// on: {

			// }
		});
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});