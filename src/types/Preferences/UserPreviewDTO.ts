export interface UserPreviewDTO {
  id: string;
  firstName?: string;
  lastName?: string;
  educationLevel: 'Bachelor' | 'Master';
  photoUrl?: string;
  course: number;
  age: number;
  about?: string;
}