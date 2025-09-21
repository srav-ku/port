import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { navigationSections } from '@/content/siteData';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = navigationSections.find(s => s.shortcut === e.key);
      if (section) {
        onSectionChange(section.id);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSectionChange]);

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 hidden lg:block ${
          isScrolled ? 'backdrop-blur-md bg-background/85' : 'backdrop-blur-sm bg-background/50'
        } border border-border rounded-full px-4 xl:px-6 py-3 shadow-lg mx-4`}
        data-testid="navigation-main"
      >
        <div className="flex items-center gap-4 xl:gap-6">
          <div className="flex items-center gap-1">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full hover-elevate min-h-[36px] ${
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
            className="rounded-full min-h-[36px] min-w-[36px]"
            data-testid="theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:hidden ${
          isScrolled ? 'backdrop-blur-md bg-background/90' : 'backdrop-blur-sm bg-background/70'
        } border-b border-border shadow-sm safe-top`}
        data-testid="navigation-mobile"
      >
        <div className="flex items-center justify-between section-padding py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-primary">Sravanth</span>
            <span className="text-lg font-light text-foreground">Kumar</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full min-h-[44px] min-w-[44px]"
              data-testid="theme-toggle-mobile"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full min-h-[44px] min-w-[44px]"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
            <div className="section-padding py-4 space-y-2">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover-elevate min-h-[44px] ${
                    activeSection === section.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`nav-mobile-${section.id}`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Add spacing to sections when mobile nav is visible */}
      <div className="h-16 lg:h-0" />
    </>
  );
}