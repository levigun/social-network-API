const app = require('express').Router();
const { User, Thought, Reaction} = require('../models');

// USERS 

// get all users
app.get('/users', (req, res) => {
    User.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: 'something went wrong' });
      }
    });
  });

// get a single user
app.get('/users/:_id', async (req, res) => {
    try {
        const singleUser = await User.findOne({_id: req.params._id});
        res.status(200).json(singleUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = await User.create({ username: req.body.username, email: req.body.email});
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// update a user
app.put('/users/:_id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({_id: req.params._id});
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// adding a friend of a specific user
app.put('/users/:_id/friends/:friendId', async (req,res) => {
    try {
        const newFriend = await User.findOneAndUpdate({_id: req.params._id}, { friends: req.params.friendId });
        res.status(200).json(newFriend);
    } catch (err) {
        res.status(500).json(err);
    }
});

// deleting a friend of a specific user
app.delete('/users/:_id/friends/:friendId', async (req, res) => {
    try {
        const deletedFriend = await User.findOneAndUpdate({ _id: req.params._id }, { $pull: { friends: req.params.friendId }}, { new: true });
        res.status(200).json(deletedFriend);
    } catch (err) {
        res.status(500).json(err);
    }
});


// THOUGHTS

// get all thoughts
app.get('/thoughts', (req, res) => {
    Thought.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: 'something went wrong' });
      }
    });
  });

// get a single thought
app.get('/thoughts/:_id', async (req, res) => {
    try {
        const singleThought = await Thought.findOne({_id: req.params._id});
        res.status(200).json(singleThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new thought and add the thought to the array of the user's table
app.post('/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);

        const updateUser = await User.findOneAndUpdate({ username: req.body.username}, {$push: { thoughts: newThought}});
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a thought
app.put('/thoughts/:_id', async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate({_id: req.params._id}, { thoughtText: req.body.thoughtText, createdAt: req.body.createdAt });
        res.status(200).json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a thought
app.delete('/thoughts/:_id', async (req, res) => {
    try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params._id });
        res.status(200).json(deletedThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// post a reaction to a thought
app.post('/thoughts/:_id/reactions', async (req, res) => {
    try {
        const newReaction = await Thought.findOneAndUpdate({ _id: req.params._id }, { reactions: { reactionBody: req.body.reactionBody }});
        res.status(200).json(newReaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a reaction to a thought
app.delete('/thoughts/:_id/:_id', async (req, res) => {
    try {
        const deleteReaction = await Thought.findOneAndUpdate({ _id: req.params._id }, { $pull: { reactions: { _id: req.params._id } } }, { new: true });
        res.status(200).json(deleteReaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = app;