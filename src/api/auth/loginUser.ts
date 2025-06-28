import { LoginDTO } from '../../types/Auth/LoginDTO';
import api from '../axios/axios';

export async function loginUser(data: LoginDTO): Promise<any> {
  try {
    const response = await api.post('/User/login', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;

      if (data?.errors) {
        const fieldErrors: Partial<LoginDTO> & { auth?: string } = {};

        for (const key in data.errors) {
          const field = key.charAt(0).toLowerCase() + key.slice(1);
          fieldErrors[field as keyof LoginDTO] = data.errors[key][0];
        }

        const validationError = new Error('Validation failed');
        (validationError as any).validationErrors = fieldErrors;
        throw validationError;
      }

      const message = typeof data === 'string'
        ? data
        : data?.message || 'Неверный логин или пароль';

      throw new Error(message);
    }

    throw new Error('Ошибка сети. Попробуйте позже.');
  }
}
