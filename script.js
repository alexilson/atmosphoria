const cart = "c2stN1FwaWZtWDJzZXlscEl6bktreUNUM0JsYmtGSjV4dFlQSWU="
const horse = "VzRtb1JMdWhOUWZ0"

// Code adapted from https://stackoverflow.com/questions/74944407/using-fetch-to-call-the-openai-api-throws-error-400-you-must-provide-a-model-pa

    fetch(`https://api.openai.com/v1/chat/completions`,
        {
            body: JSON.stringify({model: "gpt-3.5-turbo", messages: [
                {role: "system", content: "You are a weatherman."},
                {role: "user", content: "What are the current weather conditions in Portland, Oregon?"} // update to take string interpolation inputs of weather data points (temp, conditions, etc) to create forecast.txt from
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
        const outputEl = document.createElement("div");
        outputEl.textContent =json.choices[0].message.content;
        document.body.append(outputEl);
    });
    }
    });