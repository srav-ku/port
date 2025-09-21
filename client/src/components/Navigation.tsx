import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'home', label: 'Home', shortcut: '1' },
  { id: 'about', label: 'About', shortcut: '2' },
  { id: 'skills', label: 'Skills', shortcut: '3' },
  { id: 'projects', label: 'Projects', shortcut: '4' },
  { id: 'experience', label: 'Experience', shortcut: '5' },
  { id: 'certifications', label: 'Certifications', shortcut: '6' },
  { id: 'contact', label: 'Contact', shortcut: '7' },
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = sections.find(s => s.shortcut === e.key);
      if (section) {
        onSectionChange(section.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSectionChange]);

  return (
    <nav 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-background/80' : 'backdrop-blur-sm bg-background/40'
      } border border-border rounded-full px-6 py-3 shadow-lg`}
      data-testid="navigation-main"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover-elevate ${
                activeSection === section.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid={`nav-${section.id}`}
            >
              {section.label}
              {activeSection === section.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
        
        <div className="w-px h-6 bg-border" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
          data-testid="theme-toggle"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </Button>
      </div>
    </nav>
  );
}