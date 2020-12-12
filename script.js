const startingMinutes = 15;
const restMinutes = 5;
let time = startingMinutes * 60;
let time2 = restMinutes * 60;
var restTime = false;
const countdownEl = document.getElementById('countdown');
const timeType = document.getElementById('time-type');


setInterval(update, 1000);

function update(){
    if(!restTime){
        timeType.innerHTML = "Work Time";
        updateCountdown();        
    }else{
        timeType.innerHTML = "Rest Time";
        updateRestTimeCountdown();
    }
}

function updateCountdown(){
    let minutes = Math.floor(time/60);
    minutes = minutes < 10 ? '0'+minutes : minutes;  
    let seconds = time % 60;

    seconds = seconds < 10 ? '0'+seconds : seconds;

    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if(time>0){
        restTime = false;
        time--;       
    }else{
        
        restTime = true;
        timeType.innerHTML = "Rest Time";
        time = startingMinutes * 60;
    }   
}

function updateRestTimeCountdown(){
    let minutes = Math.floor(time2/60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let seconds = time2 % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes} : ${seconds}`;
    if(time2>0){
        restTime = true;
        time2--;                
    }else{
        restTime = false;
        timeType.innerHTML = "Work Time";
        time2 = restMinutes * 60;
    }
}
