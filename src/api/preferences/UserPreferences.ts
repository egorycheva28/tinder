import { Filters } from "../../pages/Preferences/components/FiltersBar";
import { UserPreviewDTO } from "../../types/Preferences/UserPreviewDTO";
import api from "../axios/axios";

export async function getNextUserPreview(
  filters?: Filters
): Promise<UserPreviewDTO> {
  const token = localStorage.getItem('token');

  const body: Record<string, any> = {};
  if (filters) {
    if (filters.educationLevel) body.educationLevel = filters.educationLevel;
    if (filters.course !== '')        body.course        = filters.course;
    if (filters.minAge   !== '')      body.minAge        = filters.minAge;
    if (filters.maxAge   !== '')      body.maxAge        = filters.maxAge;
    if (filters.gender   !== '')      body.gender        = filters.gender;
  }

  const response = await api.post<UserPreviewDTO>(
    '/UserPreference/next',
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log('Next user preview:', response.data);
  return response.data;
}

export async function setUserPreference(
  toUserId: string,
  isLiked: boolean
): Promise<void> {
  const token = localStorage.getItem('token');
  await api.post(
    '/UserPreference/set-preference',
    {},

    {
      params: {
        toUserId,
        isLiked,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}