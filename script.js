const apiKey = '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' // test key

fetch(
    `https://api.openai.com/v1/chat/completions`,
    {
        body: JSON.stringify({model: "gpt-3.5-turbo", messages: [{role: "user", content: "Say this is a test!"}], temperature: 0, max_tokens: 7}),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
        },
            }
).then((response) => {
    if (response.ok) {
        response.json().then((json) => {
            console.log(json);
        });
    }
});