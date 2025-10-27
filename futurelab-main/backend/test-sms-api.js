const https = require('https');
const querystring = require('querystring');

// Test the SMS API endpoint specifically
console.log('Testing SMS API endpoint...');

// Prepare query parameters (using test credentials)
const queryParams = querystring.stringify({
    user: 'futurelabssms',
    pass: '123456',
    sender: 'FULABS',
    phone: '9742100448',
    text: 'Test message'
});

const url = `/api/sendmsg.php?${queryParams}`;

console.log('Full URL path:', url);

const req = https.request({
    hostname: 'bhashsms.com',
    path: url,
    method: 'GET',
    timeout: 15000
}, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Headers:', res.headers);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response body:', data);
        console.log('SMS API test completed');
    });
});

req.on('error', (error) => {
    console.error('SMS API error:', error.message);
});

req.on('timeout', () => {
    console.error('SMS API timeout');
    req.destroy();
});

req.end();