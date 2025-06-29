export interface NotificationDTO {
    id: number;
    message?: string | null;
    isRead: boolean;
    createdAt: Date;
}