// forward.js

const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const TELEGRAPH_URL = 'https://postapi.lbbai.cc/v1/chat/completions';
    const request = event.body;

    const modifiedRequest = {
        ...request,
        url: TELEGRAPH_URL,
        headers: {
            ...request.headers,
            'Content-Type': 'application/json',
            'Origin': 'https://8162403981.ai701.live',
            'Referer': 'https://8162403981.ai701.live/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.62'
        }
    };

    try {
        const response = await fetch(modifiedRequest.url, modifiedRequest);
        const body = await response.json();

        // 添加允许跨域访问的响应头
        const headers = {
            ...response.headers,
            'Access-Control-Allow-Origin': '*',
            'Request-Url': request.headers.origin,
            'Our-Chat-Site': 'https://c.glf.one/'
        };

        return {
            statusCode: response.status,
            headers,
            body: JSON.stringify(body)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Internal server error'})
        };
    }
};