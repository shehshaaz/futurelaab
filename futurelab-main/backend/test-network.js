const https = require('https');

// Test if we can reach bhashsms.com
console.log('Testing connectivity to bhashsms.com...');

const req = https.request({
    hostname: 'bhashsms.com',
    path: '/',
    method: 'GET',
    timeout: 10000
}, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Successfully connected to bhashsms.com');

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response headers:', res.headers);
        console.log('Connection test completed');
    });
});

req.on('error', (error) => {
    console.error('Connection error:', error.message);
});

req.on('timeout', () => {
    console.error('Connection timeout');
    req.destroy();
});

req.end();