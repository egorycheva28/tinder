import { UserDTO } from '../../types/Reactions/UserDTO';
import api from '../axios/axios';

export interface LikedUsersResponse {
  count: number;
  users: UserDTO[];
}

export async function getLikedUsers(): Promise<LikedUsersResponse> {
  const token = localStorage.getItem('token');
  const response = await api.get<LikedUsersResponse>(
    '/UserReaction/liked',
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