import express from "express";
import db from "../public/javascripts/db";
import Request from '../public/javascripts/request';

const router = express.Router();

router.get("/init_Graphique", (req, res, next) => {

    db.query(Request.getInit_Graphique(), (err, row)=> {
        if(!err) {
            res.send(row);
        }
    });    
});

router.get("/vitesse_Pompe", (req, res, next) => {

    db.query(Request.getVitesse_Pompe(), (err, row)=> {
        if(!err) {
            res.send(row);
        }
    });    
});

router.get("/etat_Pompe", (req, res, next) => {

    db.query(Request.getEtat_Pompe(), (err, row)=> {
        if(!err) {
            res.send(row);
        }
    });  
});

router.get("/refresh_Graphique", (req, res, next) => {

    db.query(Request.getRefresh_Graphique(), (err, row)=> {
        if(!err) {
            res.send(row);
        }
    });  
});

router.post('/upPompe', function(req, res) {
    var pompe = req.body;
    //console.log(pompe.str);
    db.query(Request.update(pompe.str),(err, result) =>{
        if(err) throw err;
        //console.log(result);
    })
});

module.exports = router;