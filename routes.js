'use strict';
const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.get('/health', Controller.health);
router.post('/messages', Controller.messages);
router.get('/callback', Controller.callback);

module.exports = function(app, prefix = '') {
    app.use(prefix, router);
  };
