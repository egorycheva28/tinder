import React, { useState, useEffect } from 'react';
import { Box, Checkbox, List, ListItem, ListItemText, Typography } from '@mui/material';
import { NotificationDTO } from '../../../types/Notifications/NotiificationDTO';
import { getNotifications } from '../../../api/notifications/getNotifications';
import { readNotification } from '../../../api/notifications/readNotification';

const NotificationForm: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationDTO[] | null>(null);
    const [isRead, setIsRead] = useState<boolean>(false);

    const getListNotifications = async () => {
        //setLoading(true);
        try {
            const result = await getNotifications();
            setNotifications(result);

        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения уведомлений: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            //setLoading(false);
        }
    };

    const readedNotification = async (notificationId: number) => {
        try {
            await readNotification(notificationId);
            setIsRead(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка при чтении уведомления: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            //setLoading(false);
        }
    };
    const getUnreadCount = async () => {
        const result: NotificationDTO[] = await getNotifications();
        if (!result) return 0;
        return result.filter(n => !n.isRead).length;
    };

    const updateNotificationsCount = async () => {
        try {
            const count = await getUnreadCount();
            localStorage.setItem('notificationsCount', count.toString());
        } catch (err) {
            console.error('Ошибка при обновлении уведомлений:', err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            //setLoading(true);
            await getListNotifications();
            await updateNotificationsCount();
            setIsRead(false);
            //setLoading(false);
        };

        loadData();
    }, [isRead]);

    return (
        <Box sx={{ padding: '20px', top: 50, position: 'relative' }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Уведомления
            </Typography>
            {notifications && notifications.length > 0 ? (
                notifications.some(n => !n.isRead) ? (
                    <List>
                        {notifications?.filter(notification => !notification.isRead).map((notification) => (
                            <ListItem key={notification.id} divider>
                                <ListItemText
                                    primary={notification.message}
                                    secondary={
                                        <>
                                            <Typography variant="caption" color="textSecondary">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </Typography>
                                        </>
                                    }
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Checkbox
                                        checked={notification.isRead}
                                        onChange={() => readedNotification(notification.id)}
                                        color="primary"
                                    />
                                    <Typography variant="caption" color="textSecondary">
                                        не прочитано
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography>Нет новых уведомлений</Typography>)
            ) : (
                <Typography>Нет новых уведомлений</Typography>
            )}
        </Box>
    );
};

export default NotificationForm;