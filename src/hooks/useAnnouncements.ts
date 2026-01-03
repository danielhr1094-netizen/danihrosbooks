import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Announcement = Tables<'announcements'>;
type AnnouncementInsert = TablesInsert<'announcements'>;
type AnnouncementUpdate = TablesUpdate<'announcements'>;

export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('start_at', { ascending: false });
      
      if (error) throw error;
      return data as Announcement[];
    },
  });
}

export function useActiveAnnouncements(limit?: number) {
  return useQuery({
    queryKey: ['announcements', 'active', limit],
    queryFn: async () => {
      const now = new Date().toISOString();
      let query = supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .lte('start_at', now)
        .order('start_at', { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Filter out expired announcements
      return (data as Announcement[]).filter(a => !a.end_at || new Date(a.end_at) > new Date());
    },
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (announcement: AnnouncementInsert) => {
      const { data, error } = await supabase
        .from('announcements')
        .insert(announcement)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...announcement }: AnnouncementUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('announcements')
        .update(announcement)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export type { Announcement };
