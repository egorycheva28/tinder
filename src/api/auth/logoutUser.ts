import api from '../axios/axiosAuth';

export async function logoutUser(): Promise<any> {
  try {
    const response = await api.get('/User/logout');
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Ошибка выхода (${status}): ${JSON.stringify(data)}`);
    }
    throw new Error(error.message);
  }
}
