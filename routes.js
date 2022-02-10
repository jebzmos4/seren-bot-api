'use strict';
const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/health', Controller.health);
router.post('/messages', Controller.messages);
router.post('/callback', Controller.callback);
router.post('/interact', Controller.interact);

module.exports = function(app, prefix = '') {
    app.use(prefix, router);
  };
