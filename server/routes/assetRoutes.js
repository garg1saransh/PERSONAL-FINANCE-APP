const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

router.get('/', assetController.getAssets);
router.post('/', assetController.addAsset);
router.delete('/:id', assetController.deleteAsset);

module.exports = router;
