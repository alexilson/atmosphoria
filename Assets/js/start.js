function getLocationData() {
    let locationEL = document.getElementById("location");
    let locationValue = locationEL.value.trim();
    console.log(locationValue);
    // getWeatherFromZip(locationValue)
    return locationValue;
}

document.getElementById("startForm").addEventListener("submit", function (event) {
    event.preventDefault();
    getLocationData();
});

function getSelectedAccent() {
    let dropdown = document.getElementById("accent")
    let selectedAccent = dropdown.value
    console.log(selectedAccent)
    return selectedAccent;
}

let clickButton = document.getElementById("btn")
clickButton.addEventListener("click", function() {
    event.preventDefault();
    let inputLocation = getLocationData();
    let inputAccent = getSelectedAccent();
    let urlQuery = `./index.html?q=${inputLocation}&accent=${inputAccent}`; 
    window.location.href = urlQuery;
})