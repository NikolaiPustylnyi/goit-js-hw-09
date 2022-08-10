import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let intervalId = null;

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    dataDay: document.querySelector('[data-days]'),
    dataHour: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
    userDataInput: document.querySelector('#datetime-picker'),
}

refs.btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
     onClose(selectedDates){
        if (selectedDates[0] < Date.now()) {
            window.alert("Please choose a date in the future")
            return;
        }

        const chosenDate = selectedDates[0].getTime();
        refs.btnStart.addEventListener('click', startTimer);
        refs.btnStart.disabled = false;

        function startTimer() {
            refs.btnStart.disabled = true;
            refs.userDataInput.disabled = true;
            intervalId = setInterval(() => {
                const delta = chosenDate - Date.now();
                convertMs(delta);
               if (delta < 1000) {
                clearInterval(intervalId) };        
            }, 1000);
            
        }
     }
}

flatpickr(refs.userDataInput, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    refs.dataDay.textContent = days;
    refs.dataHour.textContent = hours;
    refs.dataMinutes.textContent = minutes;
    refs.dataSeconds.textContent = seconds;

    return { days, hours, minutes, seconds};
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}