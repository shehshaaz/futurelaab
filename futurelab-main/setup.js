const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏥 Welcome to FutureLabs Setup!\n');

// Function to execute commands
function runCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`⚠️  stderr: ${stderr}`);
            return;
        }
        if (stdout) {
            console.log(stdout);
        }
        if (callback) callback();
    });
}

// Check if we're in the right directory
if (!fs.existsSync('backend') || !fs.existsSync('frontend')) {
    console.error('❌ Please run this script from the root directory of the FutureLabs project');
    console.error('   The directory should contain both "backend" and "frontend" folders');
    process.exit(1);
}

console.log('📋 Checking prerequisites...\n');

// Check Node.js
exec('node --version', (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Node.js is not installed. Please install Node.js (v16 or higher)');
        console.log('   Download from: https://nodejs.org/');
        process.exit(1);
    }

    const nodeVersion = stdout.trim();
    console.log(`✅ Node.js: ${nodeVersion}`);

    // Check npm
    exec('npm --version', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ npm is not installed');
            process.exit(1);
        }

        const npmVersion = stdout.trim();
        console.log(`✅ npm: ${npmVersion}\n`);

        // Start setup process
        console.log('🚀 Starting setup process...\n');

        // Install root dependencies
        console.log('📦 Installing root dependencies...');
        runCommand('npm install', () => {
            console.log('✅ Root dependencies installed\n');

            // Install backend dependencies
            console.log('📦 Installing backend dependencies...');
            runCommand('cd backend && npm install', () => {
                console.log('✅ Backend dependencies installed\n');

                // Install frontend dependencies
                console.log('📦 Installing frontend dependencies...');
                runCommand('cd frontend && npm install', () => {
                    console.log('✅ Frontend dependencies installed\n');

                    // Check if .env file exists in backend
                    const envPath = path.join(__dirname, 'backend', '.env');
                    if (!fs.existsSync(envPath)) {
                        console.log('📝 Creating backend .env file...');
                        const envContent = `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/futurelabs
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
`;
                        fs.writeFileSync(envPath, envContent);
                        console.log('✅ Backend .env file created\n');
                    } else {
                        console.log('✅ Backend .env file already exists\n');
                    }

                    // Instructions for MongoDB
                    console.log('📋 MongoDB Setup Instructions:');
                    console.log('   1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community');
                    console.log('   2. Make sure MongoDB is running (usually runs as a service on Windows)');
                    console.log('   3. After MongoDB is installed and running, seed the database:\n');
                    console.log('      cd backend');
                    console.log('      node seeder -i\n');

                    // Final instructions
                    console.log('🎉 Setup completed successfully!');
                    console.log('\n🚀 To run the application:');
                    console.log('   Option 1 - Separate terminals:');
                    console.log('     Terminal 1: cd backend && npm run dev');
                    console.log('     Terminal 2: cd frontend && npm start');
                    console.log('\n   Option 2 - Single command:');
                    console.log('     npm run dev\n');
                    console.log('   Then visit http://localhost:3000 in your browser\n');

                    console.log('📝 For detailed MongoDB installation instructions, see MONGODB_INSTALLATION.md');
                    console.log('🔗 For connection details, see CONNECTION_GUIDE.md\n');
                });
            });
        });
    });
});