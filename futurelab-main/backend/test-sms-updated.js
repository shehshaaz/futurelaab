const sendSMS = require('./utils/sendSMS');

// Test the updated SMS functionality
async function testSMS() {
    try {
        console.log('Testing updated SMS functionality...');

        // Temporarily set NODE_ENV to production to test actual SMS sending
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';

        const result = await sendSMS({
            phone: '9742100448',
            message: 'Test OTP for FutureLabs: 123456. This is a test message.'
        });

        console.log('SMS test result:', result);

        // Restore original NODE_ENV
        process.env.NODE_ENV = originalEnv;

        if (result.success) {
            console.log('SMS test completed successfully');
        } else {
            console.log('SMS test completed with issues:', result.message);
        }
    } catch (error) {
        console.error('SMS test failed:', error);
    }
}

testSMS();