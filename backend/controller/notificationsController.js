import notificationModal from '../modal/notificationsModal.js';

 export const createNotification = async (request, response) => {
    try {
        const newNotification = await notificationModal.create(request.body);
        response.status(201).json(newNotification);
    } catch (error) {
        console.error('Error creating notification:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
} 

export const getNotification = async (request, response) => {
    try {
        const notifications = await notificationModal.find();
        response.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
}
                           










