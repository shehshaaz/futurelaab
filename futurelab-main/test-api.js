const axios = require('axios');

async function testAPI() {
    console.log('🔍 Testing FutureLabs API endpoints...\n');

    // Test base URL
    const baseURL = 'http://localhost:5000/api/v1';

    try {
        // Test health endpoint
        console.log('🧪 Testing health endpoint...');
        const healthResponse = await axios.get(`${baseURL}/health`);
        console.log(`✅ Health Check: ${healthResponse.data.message}`);
        console.log(`   Status: ${healthResponse.data.status}`);
        console.log(`   Timestamp: ${healthResponse.data.timestamp}\n`);

        // Test categories endpoint
        console.log('🧪 Testing categories endpoint...');
        const categoriesResponse = await axios.get(`${baseURL}/category`);
        console.log(`✅ Categories: Found ${categoriesResponse.data.count} categories\n`);

        // Test tests endpoint
        console.log('🧪 Testing tests endpoint...');
        const testsResponse = await axios.get(`${baseURL}/tests`);
        console.log(`✅ Tests: Found ${testsResponse.data.count} tests\n`);

        // Test banners endpoint
        console.log('🧪 Testing banners endpoint...');
        const bannersResponse = await axios.get(`${baseURL}/banners`);
        console.log(`✅ Banners: Found ${bannersResponse.data.count} banners\n`);

        console.log('🎉 All API tests passed! The backend is working correctly.');

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Connection refused. Make sure the backend server is running on port 5000.');
            console.log('   Run "cd backend && npm run dev" to start the backend server.');
        } else if (error.response) {
            console.log(`❌ API Error: ${error.response.status} - ${error.response.statusText}`);
            console.log(`   URL: ${error.response.config.url}`);
            console.log(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
        } else {
            console.log(`❌ Error: ${error.message}`);
        }
    }
}

testAPI();