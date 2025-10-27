const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking FutureLabs setup requirements...\n');

// Check Node.js version
exec('node --version', (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Node.js is not installed. Please install Node.js (v16 or higher)');
        return;
    }

    const version = stdout.trim();
    console.log(`✅ Node.js: ${version}`);

    // Check npm version
    exec('npm --version', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ npm is not installed. Please install Node.js which includes npm');
            return;
        }

        const version = stdout.trim();
        console.log(`✅ npm: ${version}`);

        // Check MongoDB
        exec('mongod --version', (error, stdout, stderr) => {
            if (error) {
                console.log('⚠️  MongoDB is not installed or not in PATH');
                console.log('\n📝 To install MongoDB:');
                console.log('   1. Visit https://www.mongodb.com/try/download/community');
                console.log('   2. Download MongoDB Community Server for your OS');
                console.log('   3. Run the installer and follow the setup wizard');
                console.log('   4. Make sure to install MongoDB as a service');
                console.log('\n🔄 After installing MongoDB, restart your terminal/command prompt');
                return;
            }

            const versionMatch = stdout.match(/db version (.*)/);
            const version = versionMatch ? versionMatch[1] : 'Unknown';
            console.log(`✅ MongoDB: ${version}`);

            // Check if backend .env file exists
            const envPath = path.join(__dirname, 'backend', '.env');
            if (fs.existsSync(envPath)) {
                console.log('✅ Backend .env file exists');
            } else {
                console.log('⚠️  Backend .env file not found');
                console.log('   Run "cd backend && cp .env.example .env" to create it');
            }

            console.log('\n🎉 Setup check completed!');
            console.log('\n🚀 To run the application:');
            console.log('   1. Start MongoDB (if not running as a service)');
            console.log('   2. Run "npm run dev" to start both frontend and backend');
            console.log('   3. Visit http://localhost:3000 in your browser');
        });
    });
});