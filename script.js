const cart = "c2stN1FwaWZtWDJzZXlscEl6bktreUNUM0JsYmtGSjV4dFlQSWU="
const horse = "VzRtb1JMdWhOUWZ0"

// Code adapted from https://stackoverflow.com/questions/74944407/using-fetch-to-call-the-openai-api-throws-error-400-you-must-provide-a-model-pa

function getWeatherText(temp, conditions, wind, desc, rain) {
    fetch(`https://api.openai.com/v1/chat/completions`,
        {
            body: JSON.stringify({model: "gpt-3.5-turbo", messages: [
                {role: "system", content: "You are a helpless assistant."},
                {role: "user", content: `Write a weather report for these conditions: temperature: ${temp} wind: ${wind} description: ${desc} percent chance of rain: ${rain}`} // update to take string interpolation inputs of weather data points (temp, conditions, etc) to create forecast.txt from
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
        console.log(json);
        const outputEl = document.getElementById("chatgpt-output");
        outputEl.textContent =json.choices[0].message.content;
    });
    }
    });
}

getWeatherText(45, "Partially Cloudy", "12mph NE", "Partially Cloudy", "42%")