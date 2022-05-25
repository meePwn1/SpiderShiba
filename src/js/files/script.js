// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


// Header
let scrollLast = 0;
const defaultOffSet = 250;
const headerElement = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => headerElement.classList.contains('_hide');






window.addEventListener('scroll', () => {
	if (scrollPosition() > scrollLast && !containHide() && defaultOffSet <= scrollPosition()) {
		headerElement.classList.add('_hide');
	} else if (scrollPosition() < scrollLast && containHide()) {
		headerElement.classList.remove('_hide');
	}

	scrollLast = scrollPosition();

})


////Диаграмма
const spans = document.querySelectorAll('[data-color]');
const spansWidth = document.querySelectorAll('.chart-skills__item span');

if (spans) {
	for (let index = 0; index < spans.length; index++) {
		const span = spans[index];
		const colorSpan = span.dataset.color;
		spans[index].style.backgroundColor = `${colorSpan}`;
	}
}

if (spansWidth) {
	for (let index = 0; index < spansWidth.length; index++) {
		const span = spansWidth[index];
		const number = +span.textContent.replace('%', '');
		const spanWidth = 300 * number / 100;
		spans[index].style.width = `${spanWidth}px`;
	}
}

