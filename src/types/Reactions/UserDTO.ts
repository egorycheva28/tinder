export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  educationLevel: 'Bachelor' | 'Master';
  photoUrl?: string | null;
  course: number;
  age: number;
  about?: string | null;
  telegram?: string | null;
  isMatched?: boolean;
}