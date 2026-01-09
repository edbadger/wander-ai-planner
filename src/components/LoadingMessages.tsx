import { useEffect, useState } from 'react';
import { Plane, MapPin, Utensils, Camera, Compass } from 'lucide-react';

const messages = [
  { text: "Checking the weather...", icon: Compass },
  { text: "Finding hidden gems...", icon: MapPin },
  { text: "Curating local restaurants...", icon: Utensils },
  { text: "Discovering photo spots...", icon: Camera },
  { text: "Planning your perfect route...", icon: Plane },
];

const LoadingMessages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = messages[currentIndex].icon;

  return (
    <div className="flex items-center justify-center gap-3 text-muted-foreground animate-fade-in">
      <CurrentIcon className="w-5 h-5 text-primary animate-pulse" />
      <span className="text-sm font-medium">{messages[currentIndex].text}</span>
    </div>
  );
};

export default LoadingMessages;
