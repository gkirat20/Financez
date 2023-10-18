// controllers/notificationController.js
const { Notification } = require('../relationships');

async function createNotification(notificationData) {
    return await Notification.create(notificationData);
}

async function getNotificationById(id) {
    return await Notification.findByPk(id);
}

async function updateNotification(id, updatedData) {
    const notification = await Notification.findByPk(id);
    if (notification) {
        await notification.update(updatedData);
        return notification;
    }
    return null;
}

async function deleteNotification(id) {
    const notification = await Notification.findByPk(id);
    if (notification) {
        await notification.destroy();
        return true;
    }
    return false;
}

module.exports = {
    createNotification,
    getNotificationById,
    updateNotification,
    deleteNotification
};
