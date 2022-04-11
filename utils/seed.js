const connection = require('../config/connection');
const { Thought, User, Reaction } = require('../models');
const { getRandomName, getRandomReactions } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// // Creates a connection to mongodb
// connection.once('open', async () => {
//   // Delete the entries in the collection
//   await Thought.deleteMany({});
//   await User.deleteMany({});

//   // Empty arrays for randomly generated posts and comments
//     const users = [];
//         const reactions = [];

//     await User.collection.insertMany(users);
//     await Thought.collection.insertOne();
//     });

//     console.table(users);
//     console.info('Seeding complete! 🌱');
//     process.exit(0);
//     });