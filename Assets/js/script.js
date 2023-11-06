// function to get the zip code to be returned in a variable that can be turned into a parameter for the URL
function getLocationData() {
    let locationEL = document.getElementById("location");
    let locationValue = locationEL.value.trim();
    console.log(locationValue);

    //eror handling to ensure that a valid zip code is being entered and calling a modal upon an error
    const zipCodePattern = /^\d{5}$/;

    if (zipCodePattern.test(locationValue)) {
        return locationValue
    } else {
        //provides the message to be displayed in the the showErrorModal()
        showErrorModal("Please enter a valid 5 digit zip code")
        return null
    }
}


//function to get the accent to be returned in a variable that can be turned into a paramater for the url
function getSelectedAccent() {
    let dropdown = document.getElementById("accent")
    let selectedAccent = dropdown.value
    console.log(selectedAccent)
    return selectedAccent;
}

//button that sends the accent and zip code parameters for the creation of the url with error handling to prevent it from working in the event of an error with the zipcode
let clickButton = document.getElementById("btn")
clickButton.addEventListener("click", function () {
    event.preventDefault();

    let inputLocation = getLocationData();
    if (inputLocation !== null) {
        let inputAccent = getSelectedAccent();
        let urlQuery = `./response.html?q=${inputLocation}&accent=${inputAccent}`;
        window.location.href = urlQuery;
    }
})


//dynamically creates a modal that displays when the zip code is invalid
function showErrorModal(message) {
    //creates the different elements and gives them class names
    const modalContainer = document.getElementById("modalContainer")
    const errorModal = document.createElement("div")
    errorModal.className = "modal"
    const modalContent = document.createElement("div")
    modalContent.className = "modal-content"
    const closeBtn = document.createElement("span")
    closeBtn.className = "close"
    //creates a close "x" button
    closeBtn.innerHTML = "&times;"
    const errorMsg = document.createElement("p")
    errorMsg.textContent = message

    //nests the different elements inside each other for the modal
    modalContent.appendChild(closeBtn)
    modalContent.appendChild(errorMsg)
    errorModal.appendChild(modalContent)
    modalContainer.appendChild(errorModal)

    errorModal.style.display = "block"

    //hides the modal when the button is clicked
    closeBtn.onclick = function () {
        errorModal.style.display = "none"
    }

}