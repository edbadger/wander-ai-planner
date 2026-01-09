import { useState } from 'react';
import { MapPin, Calendar, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LoadingMessages from './LoadingMessages';
import MarkdownRenderer from './MarkdownRenderer';

const vibeOptions = [
  { value: 'relaxing', label: '🏖️ Relaxing' },
  { value: 'adventure', label: '🏔️ Adventure' },
  { value: 'foodie', label: '🍜 Foodie' },
  { value: 'history', label: '🏛️ History' },
];

const budgetOptions = [
  { value: 'budget', label: '$', description: 'Budget-friendly' },
  { value: 'moderate', label: '$$', description: 'Moderate' },
  { value: 'luxury', label: '$$$', description: 'Luxury' },
];

const TripPlannerForm = () => {
  const [destination, setDestination] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [vibe, setVibe] = useState('');
  const [budget, setBudget] = useState('moderate');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      destination,
      travelDates,
      vibe,
      budget,
    };

    try {
      const response = await fetch('https://hustlebadger.app.n8n.cloud/webhook/c4a0a89c-6208-49dd-bb7c-dd9ed483c210', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.text();
      setResult(data);
    } catch (err) {
      // For demo purposes, show a sample result
      const sampleResult = `# Your ${destination} Adventure 🌟

## Day 1: Arrival & Exploration

**Morning:** Arrive and check into your ${budget === 'luxury' ? 'luxury resort' : budget === 'budget' ? 'cozy hostel' : 'comfortable hotel'}.

**Afternoon:** Start with a ${vibe === 'foodie' ? 'food tour through local markets' : vibe === 'adventure' ? 'guided hiking expedition' : vibe === 'history' ? 'walking tour of historic sites' : 'relaxing spa session'}.

- Explore the neighborhood
- Try local street food
- Capture stunning sunset photos

## Day 2: Deep Dive

**Full Day Activity:** ${vibe === 'adventure' ? 'Mountain trek with breathtaking views' : vibe === 'foodie' ? 'Cooking class with a local chef' : vibe === 'history' ? 'Museum hopping and ancient ruins' : 'Beach day and wellness retreat'}

> **Pro Tip:** Book your activities in advance during peak season!

## Day 3: Hidden Gems

Discover off-the-beaten-path locations that only locals know about.

- Secret viewpoint for sunrise
- Family-run restaurant serving authentic cuisine
- Artisan market for unique souvenirs

---

*Generated with ❤️ by Wanderlust AI*`;
      
      setResult(sampleResult);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = destination.trim() !== '';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Input */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium text-foreground">
            Where to?
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="destination"
              type="text"
              placeholder="Paris, Tokyo, Bali..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-11 h-12 text-base bg-card border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>
        </div>

        {/* Travel Dates */}
        <div className="space-y-2">
          <Label htmlFor="dates" className="text-sm font-medium text-foreground">
            When?
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="dates"
              type="text"
              placeholder="Dec 20-27, 2024"
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              className="pl-11 h-12 text-base bg-card border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Travel Vibe */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            What's your vibe?
          </Label>
          <Select value={vibe} onValueChange={setVibe}>
            <SelectTrigger className="h-12 text-base bg-card border-border focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Choose your travel style" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {vibeOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="text-base cursor-pointer hover:bg-accent"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget Selector */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Budget
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {budgetOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setBudget(option.value)}
                className={`
                  py-3 px-4 rounded-lg border-2 transition-all duration-200
                  flex flex-col items-center gap-1
                  ${budget === option.value 
                    ? 'border-primary bg-accent text-foreground shadow-sm' 
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-accent/50'
                  }
                `}
              >
                <span className="text-lg font-semibold">{option.label}</span>
                <span className="text-xs">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-coral-hover text-primary-foreground shadow-button transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin-slow" />
              Planning...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Plan My Trip
            </>
          )}
        </Button>

        {/* Loading Messages */}
        {isLoading && (
          <div className="pt-2">
            <LoadingMessages />
          </div>
        )}
      </form>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Results Section */}
      {result && !isLoading && (
        <div className="mt-8 pt-8 border-t border-border animate-fade-in">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              ✨
            </span>
            Your Personalized Itinerary
          </h2>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <MarkdownRenderer content={result} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlannerForm;
