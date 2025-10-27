const https = require('https');

// Test the OTP generation endpoint
console.log('Testing OTP generation endpoint...');

// Test data
const testData = {
    phone: '9742100448'
};

// Convert to JSON
const postData = JSON.stringify(testData);

// API endpoint (adjust URL as needed for your setup)
const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/auth/otp/generate',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

console.log('Sending request to:', options);

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Headers:', res.headers);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response body:', data);

        try {
            const jsonData = JSON.parse(data);
            console.log('Parsed JSON response:', jsonData);
        } catch (err) {
            console.log('Response is not valid JSON');
        }

        console.log('OTP API test completed');
    });
});

req.on('error', (error) => {
    console.error('API error:', error.message);
});

req.on('timeout', () => {
    console.error('API timeout');
    req.destroy();
});

// Write data to request body
req.write(postData);
req.end();