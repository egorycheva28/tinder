import { UUID } from "crypto";

export interface ProfileDTO {
    id: UUID;
    firstName: string;
    lastName: string;
    birthDate: Date;
    age: number;
    educationLevel: 'Bachelor' | 'Master';
    course: number;
    email: string;
    telegram: string;
    photoUrl: string;
    about: string;
    gender: 'Male' | 'Female';
}