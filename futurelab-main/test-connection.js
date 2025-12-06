const https = require('https');
const http = require('http');

async function testConnection() {
    console.log('Testing connection to backend server...');

    // Test the health endpoint
    const url = 'http://localhost:5000/api/v1/health';

    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;

        const req = protocol.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log('✅ Server is running');
                console.log('Status Code:', res.statusCode);
                console.log('Response:', data);
                resolve(true);
            });
        });

        req.on('error', (e) => {
            console.log('❌ Server is not accessible');
            console.log('Error:', e.message);
            console.log('\nTroubleshooting tips:');
            console.log('1. Make sure the backend server is running (npm run dev:backend)');
            console.log('2. Check if the server is running on port 5000');
            console.log('3. Verify MongoDB is running and accessible');
            resolve(false);
        });

        req.setTimeout(5000, () => {
            console.log('❌ Connection timeout - server not responding');
            req.destroy();
            resolve(false);
        });
    });
}

// Run the test
testConnection().then(() => {
    console.log('\nTest completed.');
});