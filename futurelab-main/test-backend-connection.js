const fetch = require('node-fetch');

async function testBackendConnection() {
    const baseUrl = 'http://localhost:5000';

    try {
        console.log('Testing connection to backend...');

        // Test basic connection
        const response = await fetch(`${baseUrl}/api/v1/health`);

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Backend is running:', data);
        } else {
            console.log('❌ Backend returned error status:', response.status);
        }
    } catch (error) {
        console.log('❌ Failed to connect to backend:', error.message);
        console.log('Please make sure the backend server is running on port 5000');
    }
}

testBackendConnection();