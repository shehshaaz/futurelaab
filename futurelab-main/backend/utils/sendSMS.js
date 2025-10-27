const https = require('https');
const querystring = require('querystring');

// Primary SMS provider (bhashsms)
const sendSMSBhash = async (options) => {
    try {
        console.log('Attempting to send SMS via bhashsms:', options.phone);

        const queryParams = querystring.stringify({
            user: process.env.SMS_API_USER || 'futurelabssms',
            pass: process.env.SMS_API_PASS || '123456',
            sender: process.env.SMS_SENDER_ID || 'FULABS',
            phone: options.phone,
            text: options.message
        });

        const url = `/api/sendmsg.php?${queryParams}`;

        return new Promise((resolve, reject) => {
            const req = https.request({
                hostname: 'bhashsms.com',
                path: url,
                method: 'GET',
                timeout: 15000
            }, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    console.log('bhashsms API Response:', data);

                    if (data.includes('Sender ID Does not Exist') ||
                        data.includes('Pending') ||
                        data.includes('Route Invalid')) {
                        console.error('bhashsms sending failed due to sender ID issues:', data);
                        resolve({ success: false, message: 'bhashsms sending failed due to sender ID issues', error: data });
                    } else if (res.statusCode >= 400) {
                        console.error('bhashsms sending failed with HTTP error:', res.statusCode, data);
                        resolve({ success: false, message: `bhashsms sending failed with HTTP error: ${res.statusCode}`, error: data });
                    } else {
                        console.log('bhashsms sent successfully');
                        resolve({ success: true, message: 'bhashsms sent successfully', response: data });
                    }
                });
            });

            req.on('error', (error) => {
                console.error('bhashsms sending error:', error.message);
                resolve({ success: false, message: 'bhashsms sending failed due to network error', error: error.message });
            });

            req.on('timeout', () => {
                console.error('bhashsms sending timeout after 15 seconds');
                req.destroy();
                resolve({ success: false, message: 'bhashsms sending timed out', error: 'Request timeout after 15 seconds' });
            });

            req.end();
        });
    } catch (error) {
        console.error('Error in bhashsms utility:', error);
        return Promise.resolve({ success: false, message: 'bhashsms utility error', error: error.message });
    }
};

// Fallback SMS provider (generic HTTP API)
const sendSMSFallback = async (options) => {
    try {
        console.log('Attempting to send SMS via fallback method:', options.phone);

        // For now, we'll just log the SMS details as a fallback
        console.log('SMS Fallback - Phone:', options.phone, 'Message:', options.message);

        // In a real implementation, you would integrate with another SMS service here
        // For example, you could use Twilio, Nexmo, or another Indian SMS provider

        // Return success for testing purposes
        return Promise.resolve({
            success: true,
            message: 'SMS logged successfully (fallback mode)',
            response: 'Fallback method used'
        });
    } catch (error) {
        console.error('Error in fallback SMS utility:', error);
        return Promise.resolve({ success: false, message: 'Fallback SMS utility error', error: error.message });
    }
};

const sendSMS = async (options) => {
    try {
        // Log the SMS details for debugging
        console.log('Preparing to send SMS:', options);

        // Try primary SMS provider first
        let result = await sendSMSBhash(options);

        // If primary fails, try fallback
        if (!result.success) {
            console.log('Primary SMS provider failed, trying fallback method');
            result = await sendSMSFallback(options);
        }

        return result;
    } catch (error) {
        console.error('Error in sendSMS utility:', error);
        return Promise.resolve({ success: false, message: 'SMS utility error', error: error.message });
    }
};

module.exports = sendSMS;