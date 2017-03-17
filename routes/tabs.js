var express = require('express');
var chromix = require("chromix-too")().chromix;
var router = express.Router();

/* Index */
/**
 * @swagger
 * /tabs:
 *   get:
 *     description: Index of all current tabs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All open tabs
 */
router.get('/', function(req, res, next) {
  chromix("chrome.tabs.query", {}, {}, function(tabs){
    res.send(tabs);
  });
});

/* Create */
router.post('/', function(req, res, next) {
  res.send({thing: 'respond with a resource'});
});

/* Read */
router.get('/:id', function(req, res, next) {
  chromix("chrome.tabs.get", {}, parseInt(req.params.id), function(tab){
    if (tab) {
      res.send(tab);
    } else {
      res.send(404, {status: 404, message: 'Not Found'});
    }
  });
});

/* Update */
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var newUrl = req.query.url;
  if (id && newUrl) {
    chromix("chrome.tabs.update", {}, parseInt(id), { url: newUrl }, function(tab){
      res.send(tab);
    });
  } else {
    res.send(400, {status: 400, message: 'Id and Url required for update.', params: req.params, query: req.query})
  }
  
});

/* Delete */
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    chromix("chrome.tabs.remove", {}, parseInt(id), function(tab){
      res.send(tab);
    });
  } else {
    res.send(400, {status: 400, message: 'Id required for delete.'})
  }
});

module.exports = router;
