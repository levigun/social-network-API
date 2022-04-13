
const { faker } = require('@faker-js/faker');
const Thought = require('../models/Thought');
const db = require('../config/connection');
const User = require('../models/User');


async function createThoughts() {

    await Thought.deleteMany();

    const thoughts = [];

    for (let index = 0; index < 10; index++) {

        // generate a fake thought

        const thought = await Thought.create({
            thoughtText: faker.lorem.paragraph(1),
            // username: faker.name.findName(),
            reactions: []
        });

        thoughts.push(thought);

    }
    return thoughts;
}

async function main() {

    const thoughts = await createThoughts();


    await User.deleteMany()
    const users = [];
    // create users
    // for each user add random thoughs in them
    for (let index = 0; index < thoughts.length; index++) {

        const user = await User.create({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            thoughts: [thoughts[index]._id],
            friends: [
                faker.random.arrayElement(users)?._id,
            ]
        });



        users.push(user);
    }

    // for each thought insert reactions
    // reaction is associated to user

    for (let index = 0; index < thoughts.length; index++) {
        const thought = thoughts[index];
        thought.reactions = [
            {
                // put the reaction faker
                userId: faker.random.arrayElement(users)?._id,
                reactionBody: faker.lorem.sentence(1)
            }
        ]
        await thought.save()
    }

    console.log('seed done');
}

db.on('error', (err) => console.log(err));
db.once('open', () => {

    main();
});