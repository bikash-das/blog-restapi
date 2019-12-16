const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

//get all the posts
router.get('/', async (req,res) => {
    try{
        const posts = await /* we can await the response */ Post.find();
        res.json(posts);
        // console.log(posts[0]);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/specific', (req,res) => {
    res.send('We are on <em>Specific Posts</em>');
});

// router.post('/', (req,res) => {
//     console.log('got hit');
//     // console.log(req.body); //not displaying anything, error was in postman, we need to set as JSON in body while sending data
//     // res.send('thanks');
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });  //required: ../models/Post
//     // console.log(post);
//     post.save()    /* this returns promise */
//     .then(data => {
//         res.status(200).json(data);
//     })
//     .catch(err => {
//         console.log("Error: Cannot post. Reason: One of the required fields is empty");
//         res.json({
//             status: 400,
//             message: 'error'
//         });
//     });

// });
//this one submits the post
router.post('/', async(req,res) => {    /* added async and await */
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err){
        res.json( {message: err});
    }});

// get specific post
router.get('/:post_id', async (req,res) => {   /* kind of dynamic paramter post_id */
    // console.log(req.params.post_id);
    try{
        const post = await Post.findById(req.params.post_id); /* await because it might take some time. */
        res.json(post);
    }catch(err){
        res.json({message: err});
    }
});

// delete 
router.delete('/:post_id', async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.post_id}); /* come back with promise, so we use async */
        res.json(removedPost);
    } catch (err){
        res.json( {message: err});
    }
});

//update a post using patch
router.patch('/:post_id', async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.post_id}, /* id of post to update */ /* here it is params */
            {$set:  /* set takes an object, fields to update */
                {title: req.body.title} /* NOTE: it's body */
            }
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;
