import api from '../axios/axios';
import { UserDTO } from '../../types/Reactions/UserDTO';

export interface MatchesUsersResponse {
  count: number;
  users: UserDTO[];
}

export async function getMatchedUsers(): Promise<MatchesUsersResponse> {
  const token = localStorage.getItem('token');
  const { data } = await api.get<MatchesUsersResponse>(
    '/UserReaction/matches',
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}
