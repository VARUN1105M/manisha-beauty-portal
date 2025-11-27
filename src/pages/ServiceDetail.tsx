import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  details?: string[];
}

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    if (!id) return;
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();
    if (data) setService(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-muted-foreground">Service not found</p>
          <div className="text-center mt-4">
            <Button onClick={() => navigate("/services")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate("/services")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {service.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4">
            {service.description}
          </p>
          <div className="flex items-center gap-2 text-xl">
            <span className="text-muted-foreground">Starts at</span>
            <div className="flex items-center gap-1 font-semibold text-primary">
              <IndianRupee className="h-5 w-5" />
              <span>{service.price.replace("₹", "")}</span>
            </div>
          </div>
        </header>

        {service.details && service.details.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Our {service.name} Options
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {service.details.map((detail, idx) => (
                <Card
                  key={idx}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-4xl">💎</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-center text-foreground">
                      {detail}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/booking")}
            className="px-8"
          >
            Book This Service
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetail;
