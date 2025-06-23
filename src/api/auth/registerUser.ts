import { RegistrationDTO } from "../../types/Auth/RegistrationDTO";
import api from "../axios/axios";

export async function registerUser(data: RegistrationDTO): Promise<void> {
  const payload: RegistrationDTO = {
    ...data,
    birthDate: new Date(data.birthDate).toISOString(),
  };

  try {
    const response = await api.post("/User/register", payload);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Ошибка регистрации (${status}): ${JSON.stringify(data)}`);
    }
    throw new Error(error.message);
  }
}
