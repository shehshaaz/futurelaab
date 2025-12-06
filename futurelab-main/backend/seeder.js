const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './.env' });

// Load models
const User = require('./models/User');
const Test = require('./models/Test');
const Category = require('./models/Category');
const Banner = require('./models/Banner');
const Location = require('./models/Location');
const Cart = require('./models/Cart');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const tests = JSON.parse(fs.readFileSync(`${__dirname}/_data/tests.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/_data/categories.json`, 'utf-8'));
const banners = JSON.parse(fs.readFileSync(`${__dirname}/_data/banners.json`, 'utf-8'));
const locations = JSON.parse(fs.readFileSync(`${__dirname}/_data/locations.json`, 'utf-8'));

// Create sample cart data using existing user and test IDs
const cartData = [
    {
        user: "5d7a514b5d2c12c7449be046", // John Doe
        test: "5d7a514b5d2c12c7449be050", // Complete Health Checkup
        quantity: 1
    },
    {
        user: "5d7a514b5d2c12c7449be046", // John Doe
        test: "5d7a514b5d2c12c7449be051", // Women's Wellness Special
        quantity: 1
    },
    {
        user: "5d7a514b5d2c12c7449be047", // Jane Smith
        test: "5d7a514b5d2c12c7449be052", // Cardiac Care Package
        quantity: 2
    }
];

// Import into DB
const importData = async () => {
    try {
        await User.create(users);
        await Test.create(tests);
        await Category.create(categories);
        await Banner.create(banners);
        await Location.create(locations);
        await Cart.create(cartData);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Test.deleteMany();
        await Category.deleteMany();
        await Banner.deleteMany();
        await Location.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}