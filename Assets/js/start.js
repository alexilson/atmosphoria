function getLocationData() {
    let locationEL = document.getElementById("location");
    let locationValue = locationEL.value.trim();
    console.log(locationValue);

    const zipCodePattern = /^\d{5}$/;
    if (zipCodePattern.test(locationValue)) {
        return locationValue
    } else {
        alert("Please enter a valid 5 digit zip code")
        return null
    }
}

document.getElementById("startForm").addEventListener("submit", function (event) {
    event.preventDefault();
});

function getSelectedAccent() {
    let dropdown = document.getElementById("accent")
    let selectedAccent = dropdown.value
    console.log(selectedAccent)
    return selectedAccent;
}

let clickButton = document.getElementById("btn")
clickButton.addEventListener("click", function () {
    event.preventDefault();
    let inputLocation = getLocationData();

    if (inputLocation !== null) {
        let inputAccent = getSelectedAccent();
        let urlQuery = `./index.html?q=${inputLocation}&accent=${inputAccent}`;
        window.location.href = urlQuery;
    }
})