/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '0d20ff942186c94d0f12c1bc0f393ab8';

// Create a new date instance dynamically with JS
let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let newDate = d.toLocaleString('en-ES', { month: 'long', day: 'numeric', year:'numeric'});

document.getElementById('generate').addEventListener('click', action);

function action(e){
    const postalCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    /*if (postalCode.length === 0 || feel.length === 0) {
        alert('Are you missing something?');
    } */
    getTemp(baseUrl,postalCode,apiKey)
    .then(function (data){
        //Route
        postData('http://localhost:8000/addData', {temp: data.main.temp, date: newDate, feel: feelings})
    .then(function(){
        //User Interface
        updateUI()
        })    
    })
}

//Async GET
const getTemp = async (baseUrl, postalCode, apiKey)=>{
    const response = await fetch(baseUrl + postalCode + ',es' + '&units=metric' + '&APPID=' + apiKey)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        console.log('ok get');
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
}

//Async POST
const postData = async (url = '', data = {})=>{
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log('ok post');
        const newData = await postRequest.json();
        console.log(newData, 'ok post vel');
        return newData;
    }
    catch(error){
        console.log('error', error);
    }
}

//User Interface 
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/getData');
    try {
        const allData = await request.json();
        console.log('Updating UI');
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = `${allData.temp}°`;
        document.getElementById('content').innerHTML = allData.feel;
    }
    catch(error) {
        console.log('error, error');
    }
}

