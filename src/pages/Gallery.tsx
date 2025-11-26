import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GalleryImage {
  id: string;
  url: string;
  category: string;
  alt_text: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
    if (data) setImages(data);
  };

  const categories = ["all", ...new Set(images.map((img) => img.category))];
  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our portfolio of beautiful makeovers and transformations
          </p>
        </header>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 capitalize"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer">
                  <img
                    src={image.url}
                    alt={image.alt_text}
                    className="object-cover w-full h-full transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <Badge variant="secondary" className="capitalize">
                      {image.category}
                    </Badge>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={image.url}
                  alt={image.alt_text}
                  className="w-full h-auto rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Gallery;
