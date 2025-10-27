const mongoose = require('mongoose');
// Require all models to ensure they're registered with Mongoose
require('./models/User');
require('./models/Test');
require('./models/Category');
require('./models/Banner');
require('./models/Location');
const Cart = require('./models/Cart');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/futurelabs')
    .then(async () => {
        console.log('✅ Connected to MongoDB');

        try {
            // Find all cart items
            const carts = await Cart.find().populate('test');
            console.log('\n📋 Cart Items Found:', carts.length);

            if (carts.length > 0) {
                console.log('\nCart Details:');
                carts.forEach(cart => {
                    console.log(`- User: ${cart.user}, Test: ${cart.test ? cart.test.name : 'Unknown'}, Quantity: ${cart.quantity}`);
                });
            } else {
                console.log('\nNo cart items found in the database.');
            }
        } catch (err) {
            console.error('\n❌ Error querying carts:', err.message);
        } finally {
            // Close connection
            await mongoose.disconnect();
            console.log('\n🔌 Database connection closed');
        }
    })
    .catch(err => {
        console.error('❌ Connection Error:', err.message);
    });