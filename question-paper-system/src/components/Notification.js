import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { getCurrentUser } from '../utils/auth';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;
        
        const result = await API.graphql({
          query: `query GetNotifications($userId: ID!) {
            getNotifications(userId: $userId) {
              items {
                id
                message
                type
                createdAt
                read
              }
            }
          }`,
          variables: { userId: user.username }
        });
        
        setNotifications(result.data.getNotifications.items);
        setUnreadCount(result.data.getNotifications.items.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await API.graphql({
        query: `mutation UpdateNotification($input: UpdateNotificationInput!) {
          updateNotification(input: $input) {
            id
            read
          }
        }`,
        variables: {
          input: {
            id: notificationId,
            read: true
          }
        }
      });
      
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(unreadCount - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="notification-container">
      <div className="notification-icon">
        <i className="bell-icon"></i>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>
      
      <div className="notification-dropdown">
        <h3>Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul>
            {notifications.map(notification => (
              <li 
                key={notification.id} 
                className={notification.read ? '' : 'unread'}
                onClick={() => markAsRead(notification.id)}
              >
                <p>{notification.message}</p>
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;