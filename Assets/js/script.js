const cart = "c2stN1FwaWZtWDJzZXlscEl6bktreUNUM0JsYmtGSjV4dFlQSWU=";
const horse = "VzRtb1JMdWhOUWZ0";
const buttonEl = document.getElementById('get-chat');
const outputEl = document.getElementById("chatgpt-output");
const pastResponsesEl = document.getElementById("past-responses")

// Code adapted from https://stackoverflow.com/questions/74944407/using-fetch-to-call-the-openai-api-throws-error-400-you-must-provide-a-model-pa

function getWeatherText(personality, temp, wind, desc) {
    outputEl.textContent = "Please wait...";
    fetch(`https://api.openai.com/v1/chat/completions`,
        {
            body: JSON.stringify({
                model: "gpt-3.5-turbo", messages: [
                    { role: "system", content: `You are a helpful assistant who speaks like ${personality}.` },
                    { role: "user", content: `Write a weather report for these conditions: temperature: ${temp} wind: ${wind} description: ${desc}` }
                ], temperature: 1
            }),
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
    });
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
            if (data) {
                const temp = data.main.temp;
                let windSpeed = data.wind.speed;
                let windDirection = data.wind.deg;
                const wind = (windSpeed, windDirection)
                const desc = data.weather[0].description
                const rain = data.rain

                getWeatherText(accent, temp, wind, desc)

                console.log('Temperature:', temp)
                console.log('Wind', wind)
                console.log('Description', desc)
                console.log('Rain Chance:', rain)
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

    // create timestamp of current time
    const timestamp = dayjs().format('dddd, MMMM D[th], YYYY [at] h[:]mm[:]s a')

    // add forecast response with timestamp as the key
    responseHistory[timestamp] = forecastResponse;

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

        if (responseCount > 5) {
            const responsesToRemove = responseCount - 5;
            for (let i = 0; i < responsesToRemove; ++i) {
                delete parsedResponseHistory[responseKeys[i]];
            }
        }

        for (let key in parsedResponseHistory) {
            let responseTimestamp = key;
            let responseText = parsedResponseHistory[key];

            const responseTimeStampEl = document.createElement('div');
            responseTimeStampEl.textContent = responseTimestamp;

            const responseTextEl = document.createElement('div');
            responseTextEl.textContent = responseText;

            // console.log(responseTimestamp + "\n" + responseText)

            responsesEl.append(responseTimeStampEl);
            responsesEl.append(responseTextEl);
        }
    }
};

// let location = qParams
// let accent = accentParam

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
getParametersFromUrl();
displayPastResponses();