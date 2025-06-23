export interface RegistrationDTO {
  firstName: string;            
  lastName: string;       
  birthDate: string;    
  educationLevel: 'Bachelor' | 'Master';
  course: number;
  password: string;      
  email: string;      
  telegram: string;             
  photoUrl?: string | null;     
  about?: string | null;        
  gender: 'Male' | 'Female';
}
