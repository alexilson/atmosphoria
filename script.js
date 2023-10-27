const cart = "c2stN1FwaWZtWDJzZXlscEl6bktreUNUM0JsYmtGSjV4dFlQSWU=";
const horse = "VzRtb1JMdWhOUWZ0";
const buttonEl = document.getElementById('get-chat');
const outputEl = document.getElementById("chatgpt-output");

// Code adapted from https://stackoverflow.com/questions/74944407/using-fetch-to-call-the-openai-api-throws-error-400-you-must-provide-a-model-pa

function getWeatherText(personality, temp, wind, desc, rain) {
    outputEl.textContent = "Please wait...";
    fetch(`https://api.openai.com/v1/chat/completions`,
        {
            body: JSON.stringify({model: "gpt-3.5-turbo", messages: [
                {role: "system", content: `You are a helpful assistant who speaks like ${personality}.`},
                {role: "user", content: `Write a weather report for these conditions: temperature: ${temp} wind: ${wind} description: ${desc} percent chance of rain: ${rain}`}
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
        outputEl.textContent =json.choices[0].message.content;
        return json;
    });
    }
    });
}

getWeatherText(45, "12mph NE", "Partially Cloudy", "42%")

const weatherApiKey = "0342114cc7d6945eec750a7ba15b3f3d"

function getWeatherFromZip(zipCode) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${weatherApiKey}`;

    fetch(apiUrl)
    .then((response) => {
      if (response.status !== 200) {
        console.error(`Error: ${response.status}`);
        return;
      }
      return response.json();
    })
    .then((data) => {
        
        console.log(data);
        
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
 
}

getWeatherFromZip('78717')

buttonEl.addEventListener("click", function() {
    getWeatherText("a pirate", 45, "12mph NE", "Partially Cloudy", "42%");
});

function getLocationData() {
    let locationEL = document.getElementById("location");
    let locationValue = locationEL.value;
    console.log(locationValue);
}

document.getElementById("startForm").addEventListener("submit", function (event) {
    event.preventDefault();
    getLocationData();
});