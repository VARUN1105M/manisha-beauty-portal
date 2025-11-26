import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Service {
  id: string;
  name: string;
}

interface AvailableSlot {
  slot_date: string;
  start_time: string;
  end_time: string;
}

const Booking = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    service_id: "",
    service_name: "",
    customer_name: "",
    phone: "",
    booking_time: "",
    notes: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("id, name");
    if (data) setServices(data);
  };

  const fetchAvailableSlots = async (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const { data: slots } = await supabase
      .from("available_slots")
      .select("slot_date, start_time, end_time")
      .eq("slot_date", dateStr)
      .eq("is_blocked", false);

    const { data: bookings } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", dateStr);

    if (slots && bookings) {
      const bookedTimes = bookings.map((b) => b.booking_time);
      const available = slots.filter((slot) => !bookedTimes.includes(slot.start_time));
      setAvailableSlots(available);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !formData.booking_time) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      ...formData,
      booking_date: format(selectedDate, "yyyy-MM-dd"),
    });

    if (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Booking Confirmed!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      setFormData({
        service_id: "",
        service_name: "",
        customer_name: "",
        phone: "",
        booking_time: "",
        notes: "",
      });
      setSelectedDate(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book an Appointment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your preferred service, date, and time
          </p>
        </header>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-serif">Appointment Details</CardTitle>
            <CardDescription>Fill in your details to book an appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">Select Service *</Label>
                <Select
                  value={formData.service_id}
                  onValueChange={(value) => {
                    const service = services.find((s) => s.id === value);
                    setFormData({
                      ...formData,
                      service_id: value,
                      service_name: service?.name || "",
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
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
                <Label>Select Date *</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  className="rounded-md border"
                />
              </div>

              {selectedDate && availableSlots.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="time">Select Time *</Label>
                  <Select
                    value={formData.booking_time}
                    onValueChange={(value) => setFormData({ ...formData, booking_time: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots.map((slot) => (
                        <SelectItem key={slot.start_time} value={slot.start_time}>
                          {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requests or notes"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Booking;
