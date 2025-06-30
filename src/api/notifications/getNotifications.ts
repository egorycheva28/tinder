import api from '../axios/axiosAuth';

export async function getNotifications(): Promise<any> {
    try {
        const response = await api.get('/Notification');
        console.log(response);
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка получения уведомлений (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}