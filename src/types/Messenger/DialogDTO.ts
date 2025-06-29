export interface DialogDTO {
  withUserId: string;
  withFirstName: string;
  withLastName: string;
  withPhotoUrl?: string;
  lastMessageContent: string;
  lastMessageTime: string;
  unreadCount: number;
}