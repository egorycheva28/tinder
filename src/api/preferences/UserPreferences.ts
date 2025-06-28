import { UserPreviewDTO } from "../../types/Preferences/UserPreviewDTO";
import api from "../axios/axios";

export async function getNextUserPreview(): Promise<UserPreviewDTO> {
  const token = localStorage.getItem('token');
  const response = await api.post<UserPreviewDTO>(
    '/UserPreference/next',
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log('Next user preview:', response.data);
  return response.data;
}