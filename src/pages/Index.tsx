import { Plane } from 'lucide-react';
import TripPlannerForm from '@/components/TripPlannerForm';

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Plane className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Wanderlust AI
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Your personal travel planner. Tell us where you want to go, and we'll craft the perfect itinerary.
          </p>
        </header>

        {/* Main Card */}
        <main className="bg-card rounded-2xl shadow-card p-6 sm:p-10 border border-border/50">
          <TripPlannerForm />
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by AI • Made with ❤️ for travelers
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
