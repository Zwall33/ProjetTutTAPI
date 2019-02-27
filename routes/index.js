import express from "express";
import db from "../public/javascripts/db";

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Accueil', menuId:'home'});
});

router.get('/releves', function(req, res, next) {
  res.render('releves', {page:'Relevés', menuId:'releves.html'});
});

router.get('/pompes', function(req, res, next) {
  res.render('pompes', {page:'Pompes', menuId:'pompes.html'});
});

router.get('/calendrier', function(req, res, next) {
  res.render('calendrier', {page:'Calendrier', menuId:'calendrier.html'});
});

router.get('/tuto', function(req, res, next) {
  res.render('tuto', {page:'Tuto', menuId:'tuto.html'});
});

module.exports = router;
