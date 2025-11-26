import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const skillOptions = [
  "Hair Styling",
  "Hair Coloring",
  "Facial Treatments",
  "Bridal Makeup",
  "Threading",
  "Waxing",
  "Mehandhi",
  "Customer Service",
];

const Careers = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    experience_years: "",
    skills: [] as string[],
    message: "",
  });

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("career_applications").insert({
      name: formData.name,
      phone: formData.phone,
      experience_years: parseInt(formData.experience_years) || 0,
      skills: formData.skills,
      message: formData.message,
    });

    if (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest. We'll contact you soon.",
      });
      setFormData({
        name: "",
        phone: "",
        experience_years: "",
        skills: [],
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're always looking for talented beauty professionals to join our growing team
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Why Work With Us?</CardTitle>
              <CardDescription>Benefits of joining Manisha Beauty Care</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Professional Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuous training and skill development opportunities
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Competitive Compensation</h3>
                  <p className="text-sm text-muted-foreground">
                    Fair pay with performance incentives
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Positive Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Supportive team culture and friendly atmosphere
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Flexible Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Work-life balance with flexible scheduling
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Apply Now</CardTitle>
              <CardDescription>Fill in your details and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    required
                    placeholder="Enter years of experience"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Your Skills *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <label
                          htmlFor={skill}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about yourself (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your experience, achievements, or anything you'd like us to know"
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Careers;
