const dbRestaurant = require('../models/restaurant')

module.exports = {
  createRestaurant:(req, res) => {
    if (/[,]/gi.test(req.body.menu)) {
      req.body.menu = req.body.menu.split(',')
    } else {
      req.body.menu = req.body.menu
    }
    dbRestaurant.create(req.body,(err,restaurant) => {
      ((err)) ? res.send(err) : res.send(restaurant)
    })
  },
  getAllRestaurant:(req, res) => {
    dbRestaurant.find().populate('menu').exec((err,restaurant) => {
        ((err)) ? res.send(err) : res.send(restaurant)
      })
  },
  getOneRestaurant:(req, res) => {
    dbRestaurant.findById(req.params.id).populate('menu').exec((err, restaurant) => {
      ((err)) ? res.send(err) : res.send(restaurant)
    })
  },
  updateRestaurant:(req, res) => {
    if (/[,]/gi.test(req.body.menu)) {
      req.body.menu = req.body.menu.split(',')
    } else {
      req.body.menu = req.body.menu
    }
    dbRestaurant.findByIdAndUpdate(req.params.id, {
      $set:{name:req.body.name, owner:req.body.owner, address:req.body.address, open_status:req.body.open_status},
      $addToSet: {menu: {$each: req.body.menu}}
      }, (err,restaurant) => {
      ((err)) ? res.send(err) : res.send(restaurant)
    })
  },
  deleteRestaurant:(req, res) => {
    dbRestaurant.findByIdAndRemove(req.params.id,(err,restaurant) => {
      ((err)) ? res.send(err) : res.send(restaurant)
    })
  }
}
