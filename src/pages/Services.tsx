import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IndianRupee } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  price: string;
  details?: string[];
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("category");
    if (data) setServices(data);
  };

  const categories = ["all", ...new Set(services.map((s) => s.category))];
  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of beauty treatments and services designed to make you look and feel your best
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="font-serif text-xl">{service.name}</CardTitle>
                  <Badge variant="secondary" className="capitalize">
                    {service.category}
                  </Badge>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {service.details && service.details.length > 0 && (
                  <ul className="mb-4 space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center gap-1 font-semibold text-primary">
                  <IndianRupee className="h-4 w-4" />
                  <span>{service.price.replace("₹", "")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Services;
