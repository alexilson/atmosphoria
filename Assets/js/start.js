function getLocationData() {
    let locationEL = document.getElementById("location");
    let locationValue = locationEL.value;
    console.log(locationValue);
    getWeatherFromZip(locationValue)
}

document.getElementById("startForm").addEventListener("submit", function (event) {
    event.preventDefault();
    getLocationData();
});

function getSelectedAccent() {
    let dropdown = document.getElementById("accent")
    let selectedAccent = dropdown.value
    console.log(selectedAccent)
}

let clickButton = document.getElementById("btn")
clickButton.addEventListener("click", function() {
    getLocationData();
    getSelectedAccent();
    window.location.href = "index.html";
})