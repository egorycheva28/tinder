import { useState, useEffect, useCallback } from "react";
import { getChatMessages } from "../api/messages/messages";
import { MessageDTO } from "../types/Messenger/MessageDTO";

export function useMessages(withUserId: string | null) {
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!withUserId) {
      setMessages([]);
      return;
    }
    setLoading(true);
    try {
      const msgs = await getChatMessages(withUserId);
      setMessages(msgs);
    } catch (e) {
      console.error('Ошибка загрузки сообщений', e);
    } finally {
      setLoading(false);
    }
  }, [withUserId]);

  useEffect(() => {
    load();
  }, [load]);

  return { messages, loading, refresh: load };
}