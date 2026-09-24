let time = 60;
let display = document.getElementById("timer") ;
let start = document.getElementById("start") ;
let pause = document.getElementById("pause") ;
let stop = document.getElementById("stop") ;
let interval = null ;
let paused = false ;

start.addEventListener("click", () => {
    interval = setInterval(update, 1000) ;

    start.disabled = true ;
    pause.disabled = false ;
    stop.disabled = false ;
});

pause.addEventListener("click", () => {
    if (!paused) {
        clearInterval(interval) ;
        pause.textContent = "resume" ;
        paused = true ;
    } 
    else {
        interval = setInterval(update, 1000) ;
        pause.textContent = "pause" ;
        paused = false ;
    }
});

stop.addEventListener("click", () => {
    clearInterval(interval) ;
    time = 60 ;
    display.textContent = time ;
    display.classList.remove("warning") ;

    start.disabled = false ;
    pause.disabled = true ;
    stop.disabled = true ;
});


function update() {
    time--;
    display.textContent = time ;

    if (time <= 15) {
        display.classList.add("warning") ;
    }

    if (time <= 0) {
        clearInterval(interval) ;
        alert("Take a short break!") ;

        start.disabled = false ;
        pause.disabled = true ;
        stop.disabled = true ;
    }

}