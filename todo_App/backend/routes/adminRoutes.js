const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const { getAllUsersWithTasks, blockUnblockUser, resetOwnPassword, getAdminStats } = require('../controllers/adminController');

router.get('/users', protect, adminOnly, getAllUsersWithTasks);
router.put('/block/:userId', protect, adminOnly, blockUnblockUser);
router.put('/reset-password', protect, adminOnly, resetOwnPassword);
router.get('/stats', protect, adminOnly, getAdminStats);

module.exports = router;