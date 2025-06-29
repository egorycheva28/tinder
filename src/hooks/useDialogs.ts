import { useState, useEffect, useCallback } from 'react';
import { getDialogs as fetchRawDialogs, RawDialogDTO } from '../api/messages/messages';
import { DialogDTO } from '../types/Messenger/DialogDTO';
import { useAuthStorage } from './useAuthStorage';

export function useDialogs() {
  const { userId } = useAuthStorage();
  const [dialogs, setDialogs] = useState<DialogDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!userId) {
      setDialogs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const raw: RawDialogDTO[] = await fetchRawDialogs();
      const shaped: DialogDTO[] = raw.map(d => ({
        withUserId:         d.toUserId,
        withFirstName:      d.toFirstName,
        withLastName:       d.toLastName,
        withPhotoUrl:       d.toPhotoUrl,
        lastMessageContent: d.lastMessageContent,
        lastMessageTime:    d.lastMessageTime,
        unreadCount:        d.unreadCount,
      }));
      setDialogs(shaped);
    } catch (e) {
      console.error('Ошибка загрузки диалогов', e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  return { dialogs, loading, refresh: load };
}
