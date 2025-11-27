-- Add details column to services table for storing service sub-items
ALTER TABLE public.services 
ADD COLUMN details TEXT[];