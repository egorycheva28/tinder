import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import SubmitButton from './SubmitButton';
import { profileUser } from '../../../api/profile/profileUser';
import { ProfileDTO } from '../../../types/Profile/ProfileDTO';
import FormField from './FormField';
import { editUser } from '../../../api/profile/editUser';
import { EditProfileDTO } from '../../../types/Profile/EditProfileDTO';

const ProfileForm: React.FC = () => {
    const [profile, setProfile] = useState<ProfileDTO | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<Partial<Record<keyof EditProfileDTO, string>>>({});
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const [editedProfile, setEditedProfile] = useState<EditProfileDTO>(
        {
            firstName: '',
            lastName: '',
            birthDate: null,
            educationLevel: null,
            course: null,
            email: '',
            telegram: '',
            photoUrl: null,
            about: '',
            gender: null
        });

    const birthDateValue = editedProfile?.birthDate ? new Date(editedProfile?.birthDate).toISOString().slice(0, 10) : '';

    const courseOptions =
        editedProfile?.educationLevel === 'Bachelor'
            ? ['1', '2', '3', '4'].map(v => ({ value: v, label: v }))
            : ['1', '2'].map(v => ({ value: v, label: v }));

    const genderOptions = [
        { value: 'Male', label: 'Мужчина' },
        { value: 'Female', label: 'Женщина' },
    ];

    const educationOptions = [
        { value: 'Bachelor', label: 'Бакалавриат' },
        { value: 'Master', label: 'Магистратура' },
    ];

    const genderTranslations = {
        Male: 'Мужской',
        Female: 'Женский',
        '': ''
    };

    const educationTranslations = {
        Bachelor: 'Бакалавриат',
        Master: 'Магистратура',
        '': ''
    };

    const validate = (): boolean => {
        const e: typeof errors = {};

        if (typeof editedProfile.firstName === 'string' &&
            !/^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]{1,49}$/.test(editedProfile.firstName)) {
            e.firstName = 'Некорректное имя. С большой буквы, только буквы, длина 2–50.';
        }
        if (typeof editedProfile.lastName === 'string' &&
            !/^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]{1,49}$/.test(editedProfile.lastName)) {
            e.lastName = 'Некорректная фамилия. С большой буквы, только буквы, длина 2–50.';
        }
        if (!editedProfile.birthDate) {
            e.birthDate = 'Поле обязательно.';
        }
        const date = new Date(editedProfile?.birthDate || "");
        const year = date.getFullYear();
        if (year < 1900 || year > 2008) {
            e.birthDate = 'Достпуная дата рождения с 1900 по 2008 года.';
        }
        if (!editedProfile.email) {
            e.email = 'Поле обязательно.';
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedProfile.email)) {
            e.email = 'Некорректный формат электронной почты.';
        }
        if (!editedProfile.telegram) {
            e.telegram = 'Поле обязательно.';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleAvatarClick = () => {
        setIsAvatarModalOpen(true);
    };

    const formatDate = (date: (Date | '' | string)) => {
        if (!date) return "Нет данных";
        return new Date(date).toLocaleDateString("ru-RU");
    };


    const edit = () => {
        setIsEditing(true);
    };

    const save = async () => {
        const result = await editProfile();
        if (!result) return;
        getProfile();
        setIsEditing(false);
        setErrors({});

    };

    const cancel = () => {
        setIsEditing(false);
        setErrors({});
        setEditedProfile({
            ...editedProfile,
            lastName: profile?.lastName,
            firstName: profile?.firstName,
            birthDate: profile?.birthDate,
            educationLevel: profile?.educationLevel,
            course: profile?.course,
            email: profile?.email,
            telegram: profile?.telegram,
            photoUrl: profile?.photoUrl,
            about: profile?.about,
            gender: profile?.gender,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({ ...prev, [name]: value }));
    };

    const getProfile = async () => {
        setLoading(true);
        try {
            const result = await profileUser();
            setProfile(result);
            setEditedProfile({
                ...editedProfile,
                lastName: result?.lastName,
                firstName: result?.firstName,
                birthDate: result?.birthDate,
                educationLevel: result?.educationLevel,
                course: result?.course,
                email: result?.email,
                telegram: result?.telegram,
                photoUrl: result?.photoUrl,
                about: result?.about,
                gender: result?.gender,
            });
            localStorage.setItem('photoUrl', result.photoUrl);
        } catch (err: any) {
            console.error(err);
            alert('Ошибка получения профиля: ' + (err.message || 'Неизвестная ошибка'));
        } finally {
            setLoading(false);
        }
    };

    const editProfile = async () => {
        if (!validate()) return false;
        setLoading(true);
        try {
            if (editedProfile.email === profile?.email) {
                editedProfile.email = null;
            }
            if (editedProfile.telegram === profile?.telegram) {
                editedProfile.telegram = null;
            }
            if (editedProfile.photoUrl === '') {
                localStorage.setItem('photoUrl', "");
            }
            const date = new Date(editedProfile?.birthDate || "");
            editedProfile.birthDate = date.toISOString();
            const result = await editUser(editedProfile);

            if (editedProfile.photoUrl !== profile?.photoUrl) {
                window.location.reload();
            }
            return true;
        } catch (err: any) {
            console.error(err);
            alert('Ошибка редактирования профиля: ' + (err.message || 'Неизвестная ошибка'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await getProfile();
            setLoading(false);
        }

        loadData();
    }, [isEditing]);

    return (
        <Box sx={{ maxWidth: 1700, margin: '0 auto', padding: 2, top: 50, position: 'relative' }}>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ width: '100%', gap: 2 }}
            >
                <Box sx={{ flexBasis: '33%', textAlign: isEditing ? 'left' : 'center' }}>
                    <Avatar
                        src={editedProfile.photoUrl || ""}
                        sx={{ width: 350, height: 350, marginX: 'auto', bgcolor: 'grey.400', mb: 4, cursor: isEditing ? 'pointer' : 'default', mt: 2, border: '2px solid #F500A1' }}
                        {...(isEditing ? { onClick: handleAvatarClick } : {})}
                    >
                        {editedProfile.lastName?.[0]}
                        {editedProfile.firstName?.[0]}
                    </Avatar>
                    <Dialog open={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)}>
                        <DialogTitle sx={{ backgroundColor: '#0A0A0A', color: '#F500A1' }}>Введите URL аватарки</DialogTitle>
                        <DialogContent sx={{ backgroundColor: '#0A0A0A' }}>
                            <FormField
                                label="Аватарка"
                                name="photoUrl"
                                type="text"
                                placeholder="Url на аватарку"
                                value={editedProfile?.photoUrl || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </DialogContent>
                        <DialogActions sx={{ backgroundColor: '#0A0A0A' }}>
                            <SubmitButton
                                text="Отмена"
                                onClick={() => setIsAvatarModalOpen(false)}
                                variant="contained"
                                color="primary"
                                width="130px"
                            />
                            <SubmitButton
                                text="Сохранить"
                                onClick={() => setIsAvatarModalOpen(false)}
                                variant="contained"
                                color="primary"
                                width="130px"
                            />
                        </DialogActions>
                    </Dialog>
                    {isEditing ? (
                        <>
                            <FormField
                                label="Фамилия"
                                name="lastName"
                                type="text"
                                placeholder="Фамилия"
                                value={editedProfile?.lastName || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                            <FormField
                                label="Имя"
                                name="firstName"
                                type="text"
                                placeholder="Имя"
                                value={editedProfile?.firstName || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                        </>
                    ) : (
                        <Typography variant="h4" sx={{ color: '#fff' }}>
                            {editedProfile?.lastName} {editedProfile?.firstName}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ flexBasis: '55%' }}>
                    <Typography variant="h4" align="left" sx={{ color: '#F500A1', mb: 2, mt: 2 }}>
                        Личные данные
                    </Typography>
                    <Box component="div" display="flex" flexDirection="column">
                        {isEditing ? (
                            <>
                                <FormField
                                    label="Пол"
                                    name="gender"
                                    type="text"
                                    placeholder="Пол"
                                    value={editedProfile?.gender || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    options={genderOptions}
                                    error={!!errors.gender}
                                    helperText={errors.gender}
                                />
                                <FormField
                                    label="Дата рождения"
                                    name="birthDate"
                                    type="date"
                                    placeholder="Дата рождения"
                                    value={birthDateValue}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    error={!!errors.birthDate}
                                    helperText={errors.birthDate}
                                />
                                <FormField
                                    label="Возраст"
                                    value={profile?.age || ''}
                                    disabled={isEditing}
                                />
                                <FormField
                                    label="Уровень образования"
                                    name="educationLevel"
                                    type="text"
                                    placeholder="Уровень образования"
                                    value={editedProfile?.educationLevel || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    options={educationOptions}
                                    error={!!errors.educationLevel}
                                    helperText={errors.educationLevel}
                                />
                                <FormField
                                    label="Курс"
                                    name="course"
                                    type="number"
                                    placeholder="Крус"
                                    value={editedProfile?.course || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    options={courseOptions}
                                    error={!!errors.course}
                                    helperText={errors.course}
                                />
                                <FormField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={editedProfile?.email || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />

                                <FormField
                                    label="Телеграм"
                                    name="telegram"
                                    type="text"
                                    placeholder="Телеграм"
                                    value={editedProfile?.telegram || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    error={!!errors.telegram}
                                    helperText={errors.telegram}
                                />
                                <FormField
                                    label="О себе"
                                    name="about"
                                    type="text"
                                    placeholder="О себе"
                                    value={editedProfile?.about || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </>
                        ) : (
                            <>
                                <FormField
                                    label="Пол"
                                    value={genderTranslations[editedProfile?.gender || '']}
                                    disabled={!isEditing}
                                />
                                <FormField
                                    label="Дата рождения"
                                    value={formatDate(editedProfile?.birthDate || '')}
                                    disabled={!isEditing}
                                />
                                <FormField
                                    label="Возраст"
                                    value={profile?.age || ''}
                                    disabled={!isEditing}
                                />
                                <FormField
                                    label="Уровень образования"
                                    value={educationTranslations[editedProfile?.educationLevel || '']}
                                    disabled={!isEditing}
                                />
                                <FormField
                                    label="Курс"
                                    value={editedProfile?.course || ''}
                                    disabled={!isEditing}
                                />
                                <FormField
                                    label="Email"
                                    value={editedProfile?.email || ''}
                                    disabled={!isEditing}
                                />

                                <FormField
                                    label="Телеграм"
                                    value={editedProfile?.telegram || ''}
                                    disabled={!isEditing}
                                />
                                <FormField
                                    label="О себе"
                                    value={editedProfile?.about || ''}
                                    disabled={!isEditing}
                                />
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ textAlign: 'center', display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
                {!isEditing ? (
                    <SubmitButton
                        text="Редактировать"
                        onClick={edit}
                        variant="contained"
                        color="primary"
                        width="170px"
                    />
                ) : (
                    <>
                        <SubmitButton
                            text="Отмена"
                            onClick={cancel}
                            variant="outlined"
                            width="170px"
                        />
                        <SubmitButton
                            text="Сохранить"
                            onClick={save}
                            variant="contained"
                            width="170px"
                        />
                    </>
                )}
            </Box>
        </Box >
    );
};

export default ProfileForm;
