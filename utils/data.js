const dayjs = require('dayjs');

const formatDate = function (date){
    return dayjs(date).format('MMM DD YYYY [at] hh:mm a');
}
formatDate();

const usernames = [
    'levigun',
    'hello123',
    'rachelsab',
    'hi123'
];

const reactions = [
    'Happy',
    'Bored',
    'Sad',
    'Angry',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;

const getRandomReactions = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            reactionName: getRandomArrItem(reactions),
            score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
        });
    }
    return results;
};

module.exports = { formatDate, getRandomName, getRandomReactions}