let isWorkTime = true
let isPaused = true

let pomodoroWorkMinutes = 25 * 60
let pomodoroRestMinutes = pomodoroWorkMinutes * 0.2

let initialTimeInSeconds = getCurrentTimeInSeconds()
let timerStartTimeInSeconds = initialTimeInSeconds + pomodoroWorkMinutes

let leftTime = calculateLeftTime()

const countDownViewer = document.getElementById('countdown')
const statusTime = document.getElementById('time-type')
const onOffBtn = document.getElementById('btn-on-off')

const restAudio = new Audio('./rest.wav')
const workAudio = new Audio('./work.wav')

statusTime.innerHTML = 'Work Time'
countDownViewer.innerHTML = '25 : 00'

//Timer Controls

onOffBtn.addEventListener('change', ({ target }) => {
  target.checked ? playTimer() : pauseTimer()
})

function playTimer() {
  initialTimeInSeconds = getCurrentTimeInSeconds()
  timerStartTimeInSeconds = initialTimeInSeconds + leftTime
  isPaused = false
}

function pauseTimer() {
  isPaused = true
}

function increaseMinutes() {
  if (pomodoroWorkMinutes < 3600) {
    pomodoroWorkMinutes += 60
    pomodoroRestMinutes = pomodoroWorkMinutes * 0.2
    initialTimeInSeconds = getCurrentTimeInSeconds()
    timerStartTimeInSeconds = initialTimeInSeconds + pomodoroWorkMinutes
    leftTime = calculateLeftTime()
    const [minutesLeft, secondsLeft] = getTimeLeftInMinAndSec(leftTime)
    updateUI(minutesLeft, secondsLeft)
  }
}

function decreaseMinutes() {
  if (pomodoroWorkMinutes > 60) {
    pomodoroWorkMinutes -= 60
    pomodoroRestMinutes = pomodoroWorkMinutes * 0.2
    initialTimeInSeconds = getCurrentTimeInSeconds()
    timerStartTimeInSeconds = initialTimeInSeconds + pomodoroWorkMinutes
    leftTime = calculateLeftTime()
    const [minutesLeft, secondsLeft] = getTimeLeftInMinAndSec(leftTime)
    updateUI(minutesLeft, secondsLeft)
  }
}

function main() {
  if (!isPaused) {
    updateCountDown()
  }
}

function updateCountDown() {
  leftTime = calculateLeftTime()
  const [minutesLeft, secondsLeft] = getTimeLeftInMinAndSec(leftTime)
  updateUI(minutesLeft, secondsLeft)
  if (minutesLeft == 0 && secondsLeft == 0) {
    changeTurn()
  }
}

function updateUI(minutesLeft, secondsLeft) {
  countDownViewer.innerHTML = `  
  ${minutesLeft <= 9 ? '0' + minutesLeft : minutesLeft} 
  : 
  ${secondsLeft <= 9 ? '0' + secondsLeft : secondsLeft}`
}

function changeTurn() {
  if (isWorkTime) {
    initialTimeInSeconds = getCurrentTimeInSeconds()
    pomodoroTurnsMinutes = pomodoroRestMinutes
    timerStartTimeInSeconds = initialTimeInSeconds + pomodoroTurnsMinutes
    isWorkTime = false
    statusTime.innerHTML = 'Rest Time'
    restAudio.play()
  } else {
    initialTimeInSeconds = getCurrentTimeInSeconds()
    pomodoroTurnsMinutes = pomodoroWorkMinutes
    timerStartTimeInSeconds = initialTimeInSeconds + pomodoroTurnsMinutes
    isWorkTime = true
    statusTime.innerHTML = 'Work Time'
    workAudio.play()
  }
}

function getTimeLeftInMinAndSec(timeLeft) {
  let minutesLeft = Math.trunc(timeLeft / 60)
  let secondsLeft = timeLeft % 60
  return [minutesLeft, secondsLeft]
}

function calculateLeftTime() {
  const currentSeconds = getCurrentTimeInSeconds()
  let timeLeft = timerStartTimeInSeconds - currentSeconds
  if (timeLeft < 0) timeLeft = 0
  return timeLeft
}

function getCurrentTimeInSeconds() {
  const currentDate = new Date()
  const currentTime =
    currentDate.getHours() * 60 * 60 +
    currentDate.getMinutes() * 60 +
    currentDate.getSeconds()
  return currentTime
}

setInterval(() => {
  main()
}, 1000)

const darkCK = document.getElementById('dark')
darkCK.addEventListener('click', () => {
  const body = document.body
  const arrows = document.getElementsByClassName('arrow')
  darkCK.classList.toggle('dark-mode')
  body.classList.toggle('dark-mode')
  arrows[0].classList.toggle('dark-mode')
  arrows[1].classList.toggle('dark-mode')
})
