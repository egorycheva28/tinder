import { UserDTO } from '../../types/Reactions/UserDTO';
import api from '../axios/axios';

export interface DislikedUsersResponse {
  count: number;
  users: UserDTO[];
}

export async function getDislikedUsers(): Promise<DislikedUsersResponse> {
  const token = localStorage.getItem('token');
  const response = await api.get<DislikedUsersResponse>(
    '/UserReaction/disliked',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function removeUserPreference(toUserId: string): Promise<void> {
  const token = localStorage.getItem('token');
  await api.delete(
    `/UserPreference/${toUserId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}