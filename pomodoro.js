const sets = [25, 5];
const classes = [ "bg-danger", "bg-info" ];

const body = document.getElementById("body");
const time = document.getElementById("time");
const cycle = document.getElementById("cycle");
const startButton = document.getElementById("startButton");

let lastClassName = body.className;
let cycles;
let startTime;
let timer;

let audioElem;

function playSound() {
    audioElem = new Audio();
    audioElem.src = "chime.mp3";
    audioElem.play();
}

startButton.addEventListener("click", (e) => {
    playSound();
    cycles = 0;
    restartTimer();
});

function restartTimer(){
    cycles++;
    startTime = Date.now();
    if(timer) clearInterval(timer);
    timer = setInterval(updateTimer, 200);
}

function updateTimer(){
    let now = Date.now();
    let ellapsedTime = Math.round((now - startTime) / 1000);
    let setFinishTime = 0;

    for(let i = 0; i < sets.length; i++){
        setFinishTime += sets[i] * 60;
        if(setFinishTime > ellapsedTime){
            const remainingTime = setFinishTime - ellapsedTime;
            time.textContent = Math.floor(remainingTime / 60) + ":" + ('0' + remainingTime % 60).slice(-2);
            cycle.textContent = cycles;
            body.classList.remove(...classes);
            body.classList.add(classes[i]);
            return;
        }
    }

    restartTimer();
}


setInterval(() => {
    let className = body.className;
    if (className !== lastClassName) {
        playSound();
        lastClassName = className;
    }
}, 200);