import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Video, 
  MapPin,
  Shield,
  CheckCircle,
  Star,
  GraduationCap
} from "lucide-react";
import { format } from "date-fns";

interface Counselor {
  id: string;
  name: string;
  title: string;
  specializations: string[];
  rating: number;
  experience: string;
  availability: string;
  languages: string[];
  type: 'oncampus' | 'external';
}

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      title: 'Clinical Psychologist',
      specializations: ['Anxiety', 'Depression', 'Academic Stress'],
      rating: 4.9,
      experience: '8 years',
      availability: 'Mon-Fri 9:00 AM - 5:00 PM',
      languages: ['English', 'Hindi'],
      type: 'oncampus'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      title: 'Counseling Psychologist',
      specializations: ['Relationship Issues', 'Social Anxiety', 'Self-esteem'],
      rating: 4.8,
      experience: '12 years',
      availability: 'Tue-Sat 10:00 AM - 6:00 PM',
      languages: ['English', 'Hindi', 'Punjabi'],
      type: 'oncampus'
    },
    {
      id: '3',
      name: 'Dr. Anita Patel',
      title: 'Psychiatrist',
      specializations: ['Mood Disorders', 'Panic Attacks', 'Sleep Disorders'],
      rating: 4.9,
      experience: '15 years',
      availability: 'Mon-Thu 11:00 AM - 7:00 PM',
      languages: ['English', 'Hindi', 'Gujarati'],
      type: 'external'
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBookAppointment = () => {
    // In real implementation, this would submit to your backend
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
    setShowBookingForm(false);
  };

  if (showBookingForm) {
    const counselor = counselors.find(c => c.id === selectedCounselor);
    
    return (
      <div className="min-h-screen bg-gradient-soft py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-strong border-0">
            <CardHeader>
              <CardTitle>Book Your Appointment</CardTitle>
              <CardDescription>
                Complete the form below to schedule your confidential session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Details */}
              <div className="bg-primary-soft p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Appointment Details</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Counselor:</strong> {counselor?.name}</p>
                  <p><strong>Date:</strong> {selectedDate ? format(selectedDate, 'PPP') : 'Not selected'}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Type:</strong> {appointmentType}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" placeholder="Enter your student ID" />
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <Label htmlFor="reason">Brief reason for visit (optional)</Label>
                <Textarea 
                  id="reason" 
                  placeholder="Please share what you'd like to discuss (this helps us prepare better)"
                  className="min-h-[100px]"
                />
              </div>

              {/* Privacy Notice */}
              <div className="bg-accent-soft p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Confidentiality Assured</p>
                    <p className="text-muted-foreground">
                      Your appointment and all discussions are completely confidential. 
                      We follow strict privacy guidelines and will not share your information 
                      without your explicit consent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1"
                >
                  Back to Selection
                </Button>
                <Button 
                  onClick={handleBookAppointment}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <CalendarIcon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Book an Appointment</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule a confidential session with our qualified mental health professionals
          </p>
        </div>

        {/* Appointment Types */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card 
            className={`cursor-pointer transition-all duration-300 shadow-medium border-0 ${
              appointmentType === 'in-person' ? 'ring-2 ring-primary bg-primary-soft' : 'hover:shadow-strong'
            }`}
            onClick={() => setAppointmentType('in-person')}
          >
            <CardContent className="p-6 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">In-Person</h3>
              <p className="text-sm text-muted-foreground">Face-to-face sessions at our campus wellness center</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-300 shadow-medium border-0 ${
              appointmentType === 'video' ? 'ring-2 ring-primary bg-primary-soft' : 'hover:shadow-strong'
            }`}
            onClick={() => setAppointmentType('video')}
          >
            <CardContent className="p-6 text-center">
              <Video className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Video Call</h3>
              <p className="text-sm text-muted-foreground">Secure video sessions from anywhere</p>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-300 shadow-medium border-0 ${
              appointmentType === 'phone' ? 'ring-2 ring-primary bg-primary-soft' : 'hover:shadow-strong'
            }`}
            onClick={() => setAppointmentType('phone')}
          >
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone Call</h3>
              <p className="text-sm text-muted-foreground">Audio-only sessions for privacy</p>
            </CardContent>
          </Card>
        </div>

        {/* Counselors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Choose Your Counselor</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counselors.map((counselor) => (
              <Card 
                key={counselor.id}
                className={`cursor-pointer transition-all duration-300 shadow-medium border-0 ${
                  selectedCounselor === counselor.id ? 'ring-2 ring-primary bg-primary-soft' : 'hover:shadow-strong'
                }`}
                onClick={() => setSelectedCounselor(counselor.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{counselor.name}</CardTitle>
                        <CardDescription>{counselor.title}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={counselor.type === 'oncampus' ? 'default' : 'secondary'}>
                      {counselor.type === 'oncampus' ? (
                        <><GraduationCap className="w-3 h-3 mr-1" /> On-Campus</>
                      ) : (
                        <>External</>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span className="font-medium">{counselor.rating}</span>
                      <span className="text-sm text-muted-foreground">• {counselor.experience} experience</span>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {counselor.specializations.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Languages:</p>
                      <p className="text-sm text-muted-foreground">{counselor.languages.join(', ')}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {counselor.availability}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Date and Time Selection */}
        {selectedCounselor && appointmentType && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="shadow-medium border-0">
              <CardHeader>
                <CardTitle>Select Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="justify-center"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Book Button */}
        {selectedCounselor && appointmentType && selectedDate && selectedTime && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => setShowBookingForm(true)}
              className="shadow-medium"
            >
              <CalendarIcon className="w-5 h-5 mr-2" />
              Proceed to Book Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;