var express = require('express');
var chromix = require("chromix-too")().chromix;
var router = express.Router();

/**
 * @swagger
 * definitions:
 *   error:
 *     properties:
 *       status:
 *         type: integer
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   tab:
 *     properties:
 *       active: 
 *         type: boolean
 *       audible: 
 *         type: boolean
 *       autoDiscardable: 
 *         type: boolean
 *       discarded: 
 *         type: boolean
 *       favIconUrl: 
 *         type: string
 *       height: 
 *         type: integer
 *       highlighted: 
 *         type: boolean
 *       id: 
 *         type: integer
 *       incognito: 
 *         type: boolean
 *       index: 
 *         type: integer
 *       mutedInfo: 
 *         type: object
 *         properties:
 *           muted: 
 *             type: boolean
 *       pinned: 
 *         type: boolean
 *       selected: 
 *         type: boolean
 *       status: 
 *         type: string
 *       title: 
 *         type: string
 *       url: 
 *         type: string
 *       width: 
 *         type: integer
 *       windowId: 
 *         type: integer
 */

/* Index */
/**
 * @swagger
 * /tabs:
 *   get:
 *     operationId: getTabs
 *     summary: Get all open Tabs
 *     description: Index of all current tabs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All open tabs
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/tab'
 */
router.get('/', function(req, res, next) {
  chromix("chrome.tabs.query", {}, {}, function(tabs){
    res.send(tabs);
  });
});

/* Create */
/**
 * @swagger
 * /tabs:
 *   post:
 *     operationId: createTab
 *     summary: Create Tab
 *     description: Create Tab
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: Url for new Tab
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Newly created tab
 *         schema:
 *           $ref: '#/definitions/tab'
 *       400:
 *         description: Missing parameters
 *         schema:
 *           $ref: '#/definitions/error'
 */
router.post('/', function(req, res, next) {
  var newUrl = req.query.url;
  if (newUrl) {
    chromix("chrome.tabs.create", {}, { url: newUrl }, function(tab){
      res.send(tab);
    });
  } else {
    res.send(400, {status: 400, message: 'Url required for create.'})
  }
});

/* Read */
/**
 * @swagger
 * /tabs/{id}:
 *   get:
 *     operationId: getTab
 *     summary: Get open Tab by Id
 *     description: Open tab by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tab's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Requested tab
 *         schema:
 *           $ref: '#/definitions/tab'
 *       404:
 *         description: Not found
 *         schema:
 *           $ref: '#/definitions/error'
 */
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
/**
 * @swagger
 * /tabs/{id}:
 *   put:
 *     operationId: updateTab
 *     summary: Update Tab by Id
 *     description: Update Tab by Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tab's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: url
 *         description: New url
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Requested tab
 *         schema:
 *           $ref: '#/definitions/tab'
 *       400:
 *         description: Missing parameters
 *         schema:
 *           $ref: '#/definitions/error'
 */
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var newUrl = req.query.url;
  if (id && newUrl) {
    chromix("chrome.tabs.update", {}, parseInt(id), { url: newUrl }, function(tab){
      res.send(tab);
    });
  } else {
    res.send(400, {status: 400, message: 'Id and Url required for update.'})
  }
});

/* Delete */
/* Read */
/**
 * @swagger
 * /tabs/{id}:
 *   delete:
 *     operationId: deleteTab
 *     summary: Deletes Tab by Id
 *     description: Delete tab by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tab's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Succesfully deleted tab
 *       400:
 *         description: Missing parameters
 *         schema:
 *           $ref: '#/definitions/error'
 */
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  if (id) {
    chromix("chrome.tabs.remove", {}, parseInt(id), function(tab){
      res.send(204);
    });
  } else {
    res.send(400, {status: 400, message: 'Id required for delete.'})
  }
});

module.exports = router;
