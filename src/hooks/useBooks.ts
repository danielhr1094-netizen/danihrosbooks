import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Book = Tables<'books'>;
type BookInsert = TablesInsert<'books'>;
type BookUpdate = TablesUpdate<'books'>;

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Book[];
    },
  });
}

export function useFeaturedBooks() {
  return useQuery({
    queryKey: ['books', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Book[];
    },
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ['books', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Book;
    },
    enabled: !!id,
  });
}

export function useAudiobooks() {
  return useQuery({
    queryKey: ['books', 'audiobooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .or('audible_url.neq.null,itunes_url.neq.null')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Book[];
    },
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (book: BookInsert) => {
      const { data, error } = await supabase
        .from('books')
        .insert(book)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...book }: BookUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('books')
        .update(book)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['books', variables.id] });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}

export type { Book };
