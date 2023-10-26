const dingo = "sk-7QpifmX2seylpIznKkyCT3BlbkFJ5xtYPIe"
const baby = "W4moRLuhNQft"

// Code adapted from https://stackoverflow.com/questions/74944407/using-fetch-to-call-the-openai-api-throws-error-400-you-must-provide-a-model-pa

fetch(
    `https://api.openai.com/v1/chat/completions`,
    {
        body: JSON.stringify({model: "gpt-3.5-turbo", messages: [{role: "user", content: "What color is the sky? But answer like a pirate."}], temperature: 0}),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + dingo + (4 * 2) + baby
        },
            }
).then(function (response) {
    if (response.ok) {
        response.json()
.then(function (json) {
    console.log(json.choices[0].message.content);
});
}
});