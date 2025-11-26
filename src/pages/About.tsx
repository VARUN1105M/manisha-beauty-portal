import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted beauty partner since establishment
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center">
            <p className="text-lg leading-relaxed text-foreground/80">
              Manisha Beauty Care is a premier ladies' beauty salon dedicated to enhancing your natural beauty and confidence. 
              With years of experience and a passion for excellence, we offer a comprehensive range of beauty services tailored 
              to meet the unique needs of every client.
            </p>
          </section>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Experienced</h3>
                <p className="text-sm text-muted-foreground">
                  Skilled professionals with years of expertise
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Caring</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized attention to every client
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Trusted</h3>
                <p className="text-sm text-muted-foreground">
                  Hundreds of satisfied clients
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Premium products and services
                </p>
              </CardContent>
            </Card>
          </div>

          <section className="bg-card p-8 rounded-lg">
            <h2 className="font-serif text-2xl font-semibold mb-4 text-center">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed text-center">
              Our mission is to empower women through beauty services that boost confidence and celebrate individuality. 
              We believe that every woman deserves to look and feel her absolute best. Using only premium products and 
              the latest techniques, we're committed to delivering exceptional results in a comfortable, welcoming environment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold mb-6 text-center">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Facial Treatments</h3>
                  <p className="text-sm text-muted-foreground">
                    Rejuvenating facials for glowing, healthy skin
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Hair Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Cutting, styling, and coloring by expert stylists
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Bridal Packages</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete bridal makeup and styling for your special day
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Traditional Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Mehandhi, threading, and traditional beauty treatments
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
