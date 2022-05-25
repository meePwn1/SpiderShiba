import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartDeferred from 'chartjs-plugin-deferred';
Chart.register(
	ChartDataLabels,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Decimation,
	Filler,
	Legend,
	Title,
	Tooltip,
	SubTitle,
	ChartDeferred
);
const ctx = document.getElementById('myChart').getContext('2d');


const data = {
	labels: ['19%', '5%', '6%', '30%', '10%', '15%', '15%'],
	datasets: [{
		label: 'Tokenomics',
		data: [68.4, 18, 21.6, 108, 36, 54, 60],
		backgroundColor: [
			'#4e00ff',
			'#ff850b',
			'#663090',
			'#1dbee1',
			'#133d81',
			'#ff0000',
			'#0096f2',
		],
		hoverOffset: 4,
		cutout: '80%',
	}]
};
export const config = {
	type: 'doughnut',
	data: data,
	options: {
		borderWidth: 0,
		plugins: {
			datalabels: {
				color: '#000000',
				opacity: 0.7,
				font: {
					size: 15,
					weight: 600,
					family: 'SFProDisplay'
				}
			},
			legend: {
				display: false,
			},
			deferred: {
				xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
				yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
				delay: 500      // delay of 500 ms after the canvas is considered inside the viewport
			}
		}
	}
};



// const myChart = new Chart(
// 	ctx,
// 	config
// );
const myChart = new Chart(ctx, config);
myChart.render();
const observer = new IntersectionObserver(function (entries) {
	if (entries[0].isIntersecting === true) {
		myChart.updateSeries([0], false); // reset data to 0, then
		myChart.updateSeries([75], true); // set original data and animate
		// you can disconnect the observer if you only want this to animate once
		// observer.disconnect();
	}
}, { threshold: [0.2] });