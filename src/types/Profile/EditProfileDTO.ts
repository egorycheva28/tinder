export interface EditProfileDTO {
    firstName?: string | null;
    lastName?: string | null;
    birthDate?: string | Date | null;
    educationLevel?: 'Bachelor' | 'Master' | null;
    course?: number | null;
    email?: string | null;
    telegram?: string | null;
    photoUrl?: string | null;
    about?: string | null;
    gender?: 'Male' | 'Female' | null;
}