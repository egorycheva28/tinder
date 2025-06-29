import { MessageDTO } from "../../types/Messenger/MessageDTO";
import api from "../axios/axios";

export interface RawDialogDTO {
  fromUserId: string;
  fromFirstName: string;
  fromLastName: string;
  fromPhotoUrl?: string;
  toUserId: string;
  toFirstName: string;
  toLastName: string;
  toPhotoUrl?: string;
  lastMessageContent: string;
  lastMessageTime: string;
  unreadCount: number;
}

export async function getDialogs(): Promise<RawDialogDTO[]> {
  const token = localStorage.getItem('token');
  const { data } = await api.get<RawDialogDTO[]>('/Message/dialogs', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
}

export async function getChatMessages(withUserId: string): Promise<MessageDTO[]> {
  const token = localStorage.getItem('token');
  const { data } = await api.get<MessageDTO[]>(`/Message/chat/${withUserId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
}

export async function sendMessage(
  toUserId: string,
  content: string
): Promise<void> {
  const token = localStorage.getItem('token');
  await api.post(
    '/Message/send',
    { toUserId, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function deleteMessage(messageId: string): Promise<void> {
  const token = localStorage.getItem('token');
  await api.delete(
    `/Message/delete/${messageId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function editMessage(messageId: string, newContent: string): Promise<void> {
  const token = localStorage.getItem('token');
  await api.put(
    `/Message/edit/${messageId}`,
    { newContent },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}