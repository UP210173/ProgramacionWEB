const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const formAlarm = document.getElementById("form-alarm");

document.addEventListener('DOMContentLoaded', () => {
    getCurrentTime();
});

formAlarm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('time');

    if( value === null || value === " "){
        alert("Selecciona un hora especifica");
    }else{
        
        //Obtener horas y minutos de cada valor
        let alarmHours = parseInt(value.substring(0,2));
        let alarmMinutes = parseFloat(value.substring(3));

        const currentDate = new Date();
        const setAlarm = new Date();

        const HorasMayores = alarmHours < currentDate.getHours();
        const HorasIguales =  alarmHours === currentDate.getHours();
        const MinutosMenoresIguales = alarmMinutes <= currentDate.getMinutes();
        

        if(HorasMayores || HorasIguales && MinutosMenoresIguales){
            setAlarm.setDate(setAlarm.getDate + 1);
        }
            setAlarm.setHours(alarmHours);
            setAlarm.setMinutes(alarmMinutes);
            setAlarm.setSeconds(0);
        
            localStorage.setItem("Alarma", setAlarm.toString);
        //console.log(setAlarm);
    }
});

setInterval(function() {    
    getCurrentTime();
}, 1000);

function getCurrentTime(){
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
