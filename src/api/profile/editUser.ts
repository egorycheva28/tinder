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
            const { data } = error.response;

            if (data?.errors) {
                const fieldErrors: Partial<EditProfileDTO> & { auth?: string } = {};

                for (const key in data.errors) {
                    const field = key.charAt(0).toLowerCase() + key.slice(1);
                    fieldErrors[field as keyof EditProfileDTO] = data.errors[key][0];
                }

                const validationError = new Error('Validation failed');
                (validationError as any).validationErrors = fieldErrors;
                throw validationError;
            }

            const message = typeof data === 'string'
                ? data
                : data?.message || 'Такая почта или телеграм уже существуют';

            throw new Error(message);
        }

        throw new Error('Ошибка сети. Попробуйте позже.');
    }

}