import api from '../axios/axiosAuth';

export async function readNotification(notificationId: number): Promise<any> {
    try {
        const response = await api.post(`/Notification/mark-as-read/${notificationId}`);
        console.log(response);
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка при чтении уведомления (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}