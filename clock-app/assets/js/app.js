const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const formAlarm = document.getElementById("form-alarm");
let alarm;
let isPermitShowNotification = false;
let isCreatedNotification = false;
let notificationConter = 0;

document.addEventListener('DOMContentLoaded', () => {
    const [input, button] = formAlarm.children; 

    if ('Notification' in window) {
        Notification.requestPermission((request) => {
            isPermitShowNotification = request === 'granted';
            console.log(isPermitShowNotification);
            if(!isPermitShowNotification) {
                input.value = "";
                input.disabled = true;
                button.disabled =true;
            }
        });
    }

    getCurrentTime();
    const alarm = new Date(localStorage.getItem('alarma'));

    if (localStorage.getItem('alarma') !== null) {
        input.value = formatNumber(alarm.getHours()) + ':' + formatNumber(alarm.getMinutes());
    }
});



setInterval(function() {    
    getCurrentTime();
}, 1000);

formAlarm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('time');
    const currentDate = new Date();
    const setAlarm = new Date();
    
    if (value === null || value === "" ) {
        alert("Seleccione una hora valida");
    } else {
        console.log(value);
        let alarmHours = parseInt(value.substring(0,2));
        let alarmMinutes = parseInt(value.substring(3));
    
        const lasHorasSonMenores = alarmHours < currentDate.getHours();
        const lasHorasSonIguales = alarmHours === currentDate.getHours();
        const losMinutosSonMenoresOIguales = alarmMinutes <= currentDate.getMinutes();

        if ( lasHorasSonMenores || ( lasHorasSonIguales && losMinutosSonMenoresOIguales ) ){
            setAlarm.setDate( setAlarm.getDate() + 1);
        }
        setAlarm.setHours( alarmHours );
        setAlarm.setMinutes( alarmMinutes );
        setAlarm.setSeconds( 0 );
        alarm = setAlarm;

        console.log( setAlarm );
        localStorage.setItem( "alarma", setAlarm.toString() );
    }
});

const showAlarm = () => {
    if (isPermitShowNotification && localStorage.getItem('alarma') !== null) 
    {
        const currentTime = new Date();
        const alarm = new Date(localStorage.getItem('alarma'));
        const isTheSameDay = currentTime.getDate() === alarm.getDate();
        const isTheSameHour = currentTime.getHours() === alarm.getHours();
        const isTheSameMinutes = currentTime.getMinutes() === alarm.getMinutes();
        if (isTheSameDay && isTheSameHour && isTheSameMinutes && notificationConter < 10) {
            new Notification("Ya es hora", {
                body: "Ya es hora",
                image: "../Chencho.png"
            });
            notificationConter++;
        }

        if (notificationConter == 10){
            formAlarm.children[0].value = "";
            localStorage.removeItem('alarma')
        }
    }
};


function getCurrentTime(){
    showAlarm();
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentSeconds = currentDate.getSeconds();
    const currentMinutes = currentDate.getMinutes();

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
}

function formatNumber( value ){
    if (value < 10) {
        return "0" + value;
    }
    return value;
    // return value < 10 ? "0" + value : value;
}
// const formatNumber = value => value < 10 ? "0" + value : value;