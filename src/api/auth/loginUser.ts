import { LoginDTO } from '../../types/Auth/LoginDTO';
import api from '../axios/axios';

export async function loginUser(data: LoginDTO): Promise<any> {
  try {
    const response = await api.post('/User/login', data);
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Ошибка входа (${status}): ${JSON.stringify(data)}`);
    }
    throw new Error(error.message);
  }
}
