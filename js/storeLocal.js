// get the date running so as to know at what specific time, day and year at which
// he or she started the search

// set interval for the date to keep on reoccurring

let date = new Date();

let hours = date.getHours(); // get the hour in number

// using an operator to display whether it is am or pm
const amPm = (hours >= 12)? "pm":"am";


//convert to 12 hours
// checking if it has exceed 12 the reduce it to 1 2 3... and so on 
if(hours > 12) {
    hours -= 12;
};

let hLength = hours.toString().length; // convert it to string

// display it with zero
if (hLength == 1) {
    hours = "0" + hours;
};


let mins = date.getMinutes(); // get the minutes in number
let mLength = mins.toString().length; // convert it to string
// display it with zero
if (mLength == '1') {
    mins = "0" + mins;
    };

let seconds = date.getSeconds(); // get the seconds in number
let sLength = seconds.toString().length; // convert it to string
// display it with zero
if (sLength == '1') {
    seconds = "0" + seconds;
};


// javascript only display days (0=6) with number so you need an array
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[date.getDay()];

// javascript only display month (0-11) with number so you need an array
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let month = months[date.getMonth()];

let year = date.getFullYear();


// let clock = document.getElementById("clock");

// modifying the html tag
// clock.innerHTML = hours + ":" + mins + '<small id="small2">' + amPm + '</small>'+ " " + '<small id="small1">' + seconds + '</small>' + '<p>' + day + "/" + month +"/" + year + '</p>';

clockValue = day + "/" + month +"/" + year;
clockTime = hours + ":" + mins  + amPm ;

/*using windows and load event to get data from a non existing local storage yet
which would return `null` at the first onload and then using
if statement to set a new local storage that would then be destroyed later
after its content had been pushed to users global array.*/ 
window.addEventListener('load', function() {
    let getOnLoad = JSON.parse(localStorage.getItem("search"));

    // checking if there is data in the local storage
        if(getOnLoad != null) { 

            // Yes there is data then set the new local storage 
            localStorage.setItem("reLoad", JSON.stringify(getOnLoad));

            // Then get the data back and push it to our users global array
            let checkUser = JSON.parse(localStorage.getItem("reLoad"));

            checkUser.forEach(function(item, index) {
                notUsers.push(item)
            })

            // terminate the localStorage
            localStorage.removeItem("reLoad")

        }
})


let notUsers = [];


let form = document.getElementById("form_method");

form.addEventListener("submit", function() {
    let search = this.live_search.value;

    let searchDate = clockValue;

    let searchTime = clockTime;

    if(search.length != 0) {

        let makeSearchNull = JSON.parse(localStorage.getItem("search"));

        if(makeSearchNull == null) {

            let searchHistory = {
                'search': search,
                'searchDate': searchDate,
                'searchTime': searchTime
            };

            notUsers.push(searchHistory);

            localStorage.setItem("search", JSON.stringify(notUsers));
        } else {

            let searchHistory = {
                'search': search,
                'searchDate': searchDate,
                'searchTime': searchTime
            };

            notUsers.push(searchHistory);

            localStorage.setItem("search", JSON.stringify(notUsers));
        }
    }
    
})