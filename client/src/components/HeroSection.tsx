import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroContent } from '@/content/siteData';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
  return (
    <section className="min-h-screen-safe flex items-center justify-center relative overflow-hidden section-padding safe-top">
      {/* Background image with overlay - optimized loading */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source 
            srcSet="/attached_assets/generated_images/Professional_developer_workspace_hero_6c874a1c.png" 
            type="image/png"
          />
          <img 
            src="/attached_assets/generated_images/Professional_developer_workspace_hero_6c874a1c.png"
            alt="Professional developer workspace"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="motion-reduce-ok"
        >
          <h1 className="text-fluid-5xl lg:text-fluid-6xl font-light mb-4 sm:mb-6 tracking-tight">
            <span className="text-primary font-medium">{heroContent.title.first}</span>{' '}
            <span className="text-foreground">{heroContent.title.last}</span>
          </h1>
          
          <motion.p 
            className="text-fluid-lg lg:text-fluid-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 motion-reduce-ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroContent.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center motion-reduce-ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg min-h-[44px]"
              data-testid="button-my-resume"
              onClick={() => console.log('My Resume clicked')}
            >
              {heroContent.buttons.primary.text}
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.button
        onClick={onScrollToNext}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full border border-border bg-background/80 backdrop-blur-sm hover-elevate min-h-[44px] min-w-[44px] motion-reduce-ok"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        data-testid="button-scroll-down"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </motion.button>
    </section>
  );
}