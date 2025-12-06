const { spawn } = require('child_process');
const os = require('os');

function startMongoDB() {
    console.log('Attempting to start MongoDB...');

    let command;
    let args;

    if (os.platform() === 'win32') {
        // Windows
        command = 'net';
        args = ['start', 'MongoDB'];
    } else if (os.platform() === 'darwin') {
        // macOS
        command = 'brew';
        args = ['services', 'start', 'mongodb-community'];
    } else {
        // Linux
        command = 'sudo';
        args = ['systemctl', 'start', 'mongod'];
    }

    const process = spawn(command, args, { stdio: 'inherit' });

    process.on('close', (code) => {
        if (code === 0) {
            console.log('✅ MongoDB started successfully');
        } else {
            console.log('❌ Failed to start MongoDB with exit code:', code);
            console.log('\nPlease try starting MongoDB manually:');
            if (os.platform() === 'win32') {
                console.log('1. Open Command Prompt as Administrator');
                console.log('2. Run: net start MongoDB');
            } else if (os.platform() === 'darwin') {
                console.log('1. Run: brew services start mongodb-community');
            } else {
                console.log('1. Run: sudo systemctl start mongod');
            }
        }
    });
}

startMongoDB();