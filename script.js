// Tabs

let interval, defaultTime;
let timeLeft = 1500;

function openTimer(evt, timerType) {
	const titles = {
		pomodoroTab: 'Pomodoro Timer',
		sBreakTab: 'Short Break Timer',
		lBreakTab: 'Long Break Timer'
	};

	const times = {
		pomodoroTab: 1500,
		sBreakTab: 300,
		lBreakTab: 900
	};

	const backgroundColors = {
		pomodoroTab: 'rgb(186, 73, 73)',
		sBreakTab: 'rgb(57, 112, 151)',
		lBreakTab: 'rgb(57, 112, 151)'
	}

	defaultTime = times[timerType];
	timeLeft = times[timerType];
	resetTimer(times[timerType]);

	document.getElementById('timerTitle').textContent = titles[timerType];
	document.getElementById('timerString').textContent = `${Math.floor(times[timerType] / 60).toString().padStart(2, "0")}:00`;

	const tablinks = document.getElementsByClassName('timer__tablink');
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '');
	}

	evt.currentTarget.className += ' active';
	document.body.style.backgroundColor = backgroundColors[timerType];
}

// Sounds

const bellSound = new Audio('./sounds/bell.wav');
const startSound = new Audio('./sounds/start.wav');
const stopSound = new Audio('./sounds/stop.wav');
const resetSound = new Audio('./sounds/reset.wav');

// Пример использования звуков
function playBell() {
	bellSound.play();
}

function playStart() {
	startSound.play();
}

function playStop() {
	stopSound.play();
}

function playReset() {
	resetSound.play();
}

// Timer

const timerEl = document.getElementById('timerString');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

function updateTimer() {
	let minutes = Math.floor(timeLeft / 60);
	let seconds = timeLeft % 60;
	let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

	document.title = `${formattedTime} - Time to focus!`;
	timerEl.innerHTML = formattedTime;
}

function startTimer() {
	playStart();
	interval = setInterval(() => {
		--timeLeft;
		updateTimer();
		if (timeLeft === 0) {
			playBell();
			setTimeout(() => {
				alert("Time's up!");
				resetTimer();
			}, 0)
		}
	}, 1000);
}

function pauseTimer() {
	playStop();
	clearInterval(interval);
}

function resetTimer() {
	playReset();
	clearInterval(interval);
	timeLeft = defaultTime;
	updateTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Task list

const taskAddBtn = document.getElementById('taskAddBtn');
const taskDescription = document.getElementById('taskDescriptionInput');
const taskList = document.getElementById('taskList');

taskAddBtn.addEventListener('click', () => {
	const taskText = taskDescription.value.trim();
	if (taskText !== '') {
		taskList.insertAdjacentHTML('beforeend',
			`<li class="task-item">
		<button class="task-item__statusBtn">
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M19.7071 6.29289C20.0976 6.68342 20.0976 7.31658 19.7071 7.70711L10.4142 17C9.63316 17.7811 8.36683 17.781 7.58579 17L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L18.2929 6.29289C18.6834 5.90237 19.3166 5.90237 19.7071 6.29289Z"
					fill="#0F1729" />
			</svg>
		</button>
		<div class="task-item__text">${taskText}</div>
		<button class="task-item__deleteBtn">
			<svg width="22" height="22" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
					sketch:type="MSPage">
					<g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-467.000000, -1039.000000)"
						fill="#000000">
						<path
							d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z"
							id="cross" sketch:type="MSShapeGroup">
	
						</path>
					</g>
				</g>
			</svg>
		</button>
	</li>`);

	}
})

taskList.addEventListener('click', (event) => {
	if (event.target.closest('.task-item__deleteBtn')) {
		const taskItem = event.target.closest('.task-item');
		if (taskItem) {
			taskItem.remove();
		}
	}

	if (event.target.closest('.task-item__statusBtn')) {
		const taskItem = event.target.closest('.task-item');
		if (taskItem) {
			taskItem.classList.toggle('_complete');
		}
	}
});