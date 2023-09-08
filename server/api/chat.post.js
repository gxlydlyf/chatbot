export default defineEventHandler(async (event) => {
	let messages = [];
	const previosMessages = await readBody(event);
	messages = messages.concat(previosMessages);
	console.log(messages);
	let prompt =
		messages.map((message) => `${message.role}: ${message.message}`).join('\n') + `\nAI:`;
	const req = await fetch('https://lpi.glf.one/v1/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo-16k',
			messages: prompt,
			temperature: 0.9,
			max_tokens: 512,
			top_p: 1.0,
			frequency_penalty: 0,
			presence_penalty: 0.6,
			stop: [' User:', ' AI:']
		})
	});

	const res = await req.json();
	const result = res.choices[0];
	return {
		message: result.text
	};
});
