-- Create services table
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  duration text,
  price text,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES public.services(id),
  service_name text NOT NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create gallery images table
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  category text NOT NULL,
  alt_text text,
  created_at timestamptz DEFAULT now()
);

-- Create career applications table
CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  experience_years integer,
  skills text[],
  resume_url text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Create available slots table
CREATE TABLE public.available_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_blocked boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(slot_date, start_time)
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.available_slots ENABLE ROW LEVEL SECURITY;

-- Public read access for services
CREATE POLICY "Anyone can view services"
  ON public.services FOR SELECT
  USING (true);

-- Public insert for bookings
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Public read for available bookings
CREATE POLICY "Anyone can view bookings"
  ON public.bookings FOR SELECT
  USING (true);

-- Public read access for gallery
CREATE POLICY "Anyone can view gallery images"
  ON public.gallery_images FOR SELECT
  USING (true);

-- Public insert for career applications
CREATE POLICY "Anyone can submit career applications"
  ON public.career_applications FOR INSERT
  WITH CHECK (true);

-- Public read for available slots
CREATE POLICY "Anyone can view available slots"
  ON public.available_slots FOR SELECT
  USING (true);

-- Insert default services
INSERT INTO public.services (name, description, category, duration, price) VALUES
('Facial Treatment', 'Deep cleansing facial for glowing skin', 'facial', '60 mins', '₹800'),
('Bridal Makeup', 'Complete bridal makeup package', 'bridal', '3 hours', '₹5000'),
('Hair Coloring', 'Professional hair coloring service', 'hair', '90 mins', '₹1500'),
('Threading', 'Eyebrow and face threading', 'threading', '20 mins', '₹100'),
('Mehandhi Application', 'Traditional mehandhi design', 'mehandhi', '45 mins', '₹500'),
('Hair Cut & Style', 'Haircut with styling', 'hair', '45 mins', '₹400'),
('Waxing', 'Full body waxing service', 'waxing', '60 mins', '₹1200'),
('Jewelry Rental', 'Bridal jewelry rental service', 'jewelry', 'Daily', '₹2000/day');

-- Insert sample gallery images (will be replaced with real images)
INSERT INTO public.gallery_images (url, category, alt_text) VALUES
('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', 'bridal', 'Beautiful bridal makeup'),
('https://images.unsplash.com/photo-1487412947147-5cebf100ffc2', 'hair', 'Elegant hairstyle'),
('https://images.unsplash.com/photo-1560066984-138dadb4c035', 'mehandhi', 'Traditional mehandhi design'),
('https://images.unsplash.com/photo-1519699047748-de8e457a634e', 'bridal', 'Bridal look complete'),
('https://images.unsplash.com/photo-1562322140-8baeececf3df', 'hair', 'Modern hair styling');

-- Generate available slots for next 30 days (9 AM to 6 PM, hourly slots)
INSERT INTO public.available_slots (slot_date, start_time, end_time)
SELECT 
  CURRENT_DATE + i AS slot_date,
  (h || ':00:00')::time AS start_time,
  ((h + 1) || ':00:00')::time AS end_time
FROM 
  generate_series(0, 29) AS i,
  generate_series(9, 17) AS h;