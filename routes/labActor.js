const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let labActor=require('../models/labActor')
module.exports={
    createLabActor:function(req,res){
        let newActorDetails = req.body;
        console.log(newActorDetails)
        console.log(newActorDetails.length)
        d=new Date();
        let nowYear = d.getFullYear();
        let labAry=[]
        for(let i=0;i<newActorDetails.length;i++){
            let bY=nowYear-newActorDetails[i].currentAge
        let labActor1 = new labActor({
            "_id":new mongoose.Types.ObjectId(),
            "name":newActorDetails[i].name,
            "bYear":bY
        });
        labActor1.save(function (err) {
            if (err) {
                throw err;
            } else {
                console.log('Done'+i);
            }
        });
        labAry[i]=labActor1
    }
    res.json(labAry);
    }
}