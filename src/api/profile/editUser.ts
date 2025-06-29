import { EditProfileDTO } from '../../types/Profile/EditProfileDTO';
import api from '../axios/axiosAuth';

export async function editUser(data: EditProfileDTO): Promise<any> {
    try {
        const response = await api.put('/User/edit', data);
        console.log(response);
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка редактирования профиля (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}