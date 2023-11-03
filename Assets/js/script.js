const cart = "c2stN1FwaWZtWDJzZXlscEl6bktreUNUM0JsYmtGSjV4dFlQSWU=";
const horse = "VzRtb1JMdWhOUWZ0";
const buttonEl = document.getElementById('get-chat');
const outputEl = document.getElementById("chatgpt-output");
const pastResponsesEl = document.getElementById("past-responses");
const currentTimestampEl = document.getElementById("current-timestamp");

// Code adapted from https://stackoverflow.com/questions/74944407/using-fetch-to-call-the-openai-api-throws-error-400-you-must-provide-a-model-pa

function getWeatherText(personality, city, temp, windSpeed, windDirection, desc) {
    outputEl.textContent = "Please wait...";
    fetch(`https://api.openai.com/v1/chat/completions`,
        {
            body: JSON.stringify({model: "gpt-3.5-turbo", messages: [
                {role: "system", content: `You are a helpful assistant who speaks like ${personality}.`},
                {role: "user", content: `Write a weather report for these conditions:City: ${city} temperature: ${temp} wind speed: ${windSpeed} wind direction: ${windDirection} (convert to compass direction, do not say the degrees)  description: ${desc}, and include a fun fact about the city.`}
                ], temperature: 1}),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + atob(cart) + (4 * 2) + atob(horse)
            },
        }
    ).then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (json) {
                    outputEl.textContent = json.choices[0].message.content;
                    setLocalStorage(json.choices[0].message.content)
                    return json;
                });
        }
        else {
            console.error(`Error: ${response.status}`);
            return;
        }
    })
    .catch(function (error) {
        console.error('Fetch error:', error);
        outputEl.textContent = "Error: " + error;
    })
}

const weatherApiKey = "0342114cc7d6945eec750a7ba15b3f3d"

function getWeatherFromZip(location, units, accent) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=${weatherApiKey}&units=${units}`;

    fetch(apiUrl)
    .then((response) => {
      if (response.status !== 200) {
        console.error(`Error: ${response.status}`);
        return;
      }
      return response.json();
    })
    .then((data) => {
        if (data){
            const city = data.name;
            const temp = data.main.temp;
            const windSpeed = data.wind.speed;
            const windDirection = data.wind.deg;
            const desc = data.weather[0].description

            getWeatherText(accent, city, temp, windSpeed, windDirection, desc)

            console.log('City: '. city)
            console.log('Temperature:', temp)
            console.log('Wind Speed', windSpeed)
            console.log('Wind Direction', windDirection)
            console.log('Description', desc)
            console.log(data)
        } else {
            console.log('No weather data available')
        }

        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });

}

function setLocalStorage(forecastResponse) {

    // create response history object in correct scope
    const responseHistory = {}

    // check if a pastResponses object exists in local storage and grab it, create it if not
    if (localStorage.getItem('pastResponses')) {
        const pastResponsesLS = localStorage.getItem('pastResponses');
        const parsedresponseHistory = JSON.parse(pastResponsesLS);
        Object.assign(responseHistory, parsedresponseHistory);  // code from Xpert
    }

    // add forecast response with timestamp as the key
    responseHistory[currentTimestamp] = forecastResponse;

    // convert response object to string
    const updatedResponseHistory = JSON.stringify(responseHistory);

    // put it in local storage
    localStorage.setItem('pastResponses', updatedResponseHistory);
}

function displayPastResponses() {
    if (localStorage.getItem('pastResponses')) {
        const pastResponsesLS = localStorage.getItem('pastResponses');
        const parsedResponseHistory = JSON.parse(pastResponsesLS);
        const responsesEl = document.getElementById('past-responses');
        // assisted from XPERT
        const responseKeys = Object.keys(parsedResponseHistory);
        const responseCount = responseKeys.length;

        // code from XPERT
        if (responseCount > 5) {
            let startIndex = responseCount - 5;
            for (let i = responseCount - 1; i >= startIndex; --i) {
                let key = responseKeys[i]
                let responseTimestamp = key;
                let responseText = parsedResponseHistory[key];

                const responseTimeStampEl = document.createElement('div');
                responseTimeStampEl.textContent = responseTimestamp;

                const responseTextEl = document.createElement('div');
                responseTextEl.textContent = responseText;

                const responseContainerEl = document.createElement('div');
                responseContainerEl.appendChild(responseTimeStampEl);
                responseContainerEl.appendChild(responseTextEl);

                responsesEl.append(responseContainerEl);

                if (i === startIndex) {
                    break;
                }
            }
        } else {
            for (let i = responseCount - 1; i >= 0; i--) { // Iterate over all response keys
                let key = responseKeys[i];
                let responseTimestamp = key;
                let responseText = parsedResponseHistory[key];

                const responseTimeStampEl = document.createElement('div');
                responseTimeStampEl.textContent = responseTimestamp;

                const responseTextEl = document.createElement('div');
                responseTextEl.textContent = responseText;

                responsesEl.prepend(responseTextEl); // Prepend the elements to display the latest response on top
            }
        }
    }
};

// assisted from XPERT Learning Assistant
function getParametersFromUrl() {
    let urlString = window.location.search;
    let urlParams = new URLSearchParams(urlString);
    let qParam = urlParams.get('q');
    let accentParam = urlParams.get('accent');
    console.log(qParam);
    console.log(accentParam);
    getWeatherFromZip(qParam, 'imperial', accentParam)
}


function createTimestamp () {
    const timestamp = dayjs().format('dddd, MMMM D[th], YYYY [at] h[:]mm[:]ss a');
    currentTimestampEl.textContent = timestamp;
    return timestamp;
}

buttonEl.onclick = function () {
    window.location.href = "./start.html";
}

const currentTimestamp = createTimestamp();
getParametersFromUrl();
displayPastResponses();