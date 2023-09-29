const express = require('express')
const router = express.Router()

const UserNotificationsController = require('../../controllers/users/UserNotificationsController')

router.post('/search/all', UserNotificationsController.getAllNotifications)
router.post('/change/state', UserNotificationsController.changeStateNotification)

module.exports = router