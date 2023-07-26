const express=require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const Post =  mongoose.model("Post")
const User =  mongoose.model("User")

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
     Post.find({postedBy:req.params.id})
     .populate("postedBy","_id name")
     .then((posts,err)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json({user,posts})
     })
     .catch(err=>{
        console.log(err)
    })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})



router.put('/follow', requireLogin, async (req, res) => {
    try {
      const followedUser = await User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
      }, { new: true });
      const currentUser = await User.findByIdAndUpdate(req.user._id, {
        $push: { following: req.body.followId }
      }, { new: true }).select("-password");
      res.json(currentUser);
    } catch (err) {
      res.status(422).json({ error: err });
    }
  });
  


  router.put('/unfollow', requireLogin, async (req, res) => {
    try {
      const followedUser = await User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
      }, { new: true });
      const currentUser = await User.findByIdAndUpdate(req.user._id, {
        $push: { following: req.body.followId }
      }, { new: true }).select("-password");
      res.json(currentUser);
    } catch (err) {
      res.status(422).json({ error: err });
    }
  });
  
  router.put('/updatepic',requireLogin, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, { $set: { pic: req.body.pic } }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(422).json({ error: 'Pic cannot post' });
    }
  });
 router.post('/search-users',(req,res)=>{
  let userPattern= new RegExp("^"+req.body.query)
  User.find({email:{$regex:userPattern}})
  .select("_id email")
  .then(user=>{
    res.json({user})
  }).catch(err=>{
    console.log(err)
  })
 })
module.exports= router