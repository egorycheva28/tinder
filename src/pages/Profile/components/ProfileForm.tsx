import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
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

    const [editedProfile, setEditedProfile] = useState<EditProfileDTO>(
        {
            firstName: '',
            lastName: '',
            birthDate: null,
            educationLevel: null,
            course: null,
            email: '',
            telegram: '',
            photoUrl: '',
            about: '',
            gender: null
        });

    const birthDateValue = editedProfile?.birthDate ? new Date(editedProfile?.birthDate).toISOString().slice(0, 10) : '';

    const courseOptions =
        profile?.educationLevel === 'Bachelor'
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

    /*const validate = (): boolean => {
        const e: typeof errors = {};

        if (!/^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]{1,49}$/.test(editedProfile.firstName)) {
            e.firstName = 'Некорректное имя. С большой буквы, только буквы, длина 2–50.';
        }
        if (!/^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]{1,49}$/.test(editedProfile.lastName)) {
            e.lastName = 'Некорректная фамилия. С большой буквы, только буквы, длина 2–50.';
        }
        if (!editedProfile.birthDate) {
            e.birthDate = 'Поле обязательно.';
        }
        if (!editedProfile.email) {
            e.email = 'Поле обязательно.';
        }
        if (!editedProfile.telegram) {
            e.telegram = 'Поле обязательно.';
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };*/

    const formatDate = (date: (Date | '' | string)) => {
        if (!date) return "Нет данных";
        return new Date(date).toLocaleDateString("ru-RU");
    };


    const edit = () => {
        setIsEditing(true);
    };

    const save = () => {
        editProfile();
        getProfile();
        setIsEditing(false);
    };

    const cancel = () => {
        setIsEditing(false);
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
        setLoading(true);
        try {
            if (editedProfile.email === profile?.email) {
                editedProfile.email = null;
            }
            if (editedProfile.telegram === profile?.telegram) {
                editedProfile.telegram = null;
            }
            const date = new Date(editedProfile?.birthDate || "");
            editedProfile.birthDate = date.toISOString();
            const result = await editUser(editedProfile);
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
        };

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
                        sx={{ width: 350, height: 350, marginX: 'auto', bgcolor: 'grey.400', mb: 4, cursor: 'pointer', mt: 2 }}
                    >
                        БЗ
                    </Avatar>
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
                            />
                            <FormField
                                label="Имя"
                                name="firstName"
                                type="text"
                                placeholder="Имя"
                                value={editedProfile?.firstName || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </>
                    ) : (
                        <Typography variant="h4" >
                            {editedProfile?.lastName} {editedProfile?.firstName}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ flexBasis: '55%' }}>
                    <Typography variant="h4" align="left" sx={{ color: '#2C2C2C', mb: 2, mt: 2 }}>
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
                                />
                                <FormField
                                    label="Дата рождения"
                                    name="birthDate"
                                    type="date"
                                    placeholder="Дата рождения"
                                    value={birthDateValue}
                                    onChange={handleChange}
                                    disabled={!isEditing}
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
                                />
                                <FormField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={editedProfile?.email || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />

                                <FormField
                                    label="Телеграм"
                                    name="telegram"
                                    type="text"
                                    placeholder="Телеграм"
                                    value={editedProfile?.telegram || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
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
                            text="Сохранить"
                            onClick={save}
                            variant="contained"
                            width="170px"
                        />
                        <SubmitButton
                            text="Отмена"
                            onClick={cancel}
                            variant="outlined"
                            width="170px"
                        />
                    </>
                )}
            </Box>
        </Box >
    );
};

export default ProfileForm;
