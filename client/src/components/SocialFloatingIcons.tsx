import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Mail, href: 'mailto:sravanthkumarrr@gmail.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/sravanthkumar', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/sravanthkumar', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/sravanthkumar', label: 'Twitter' },
];

export default function SocialFloatingIcons() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40 hidden lg:block"
      data-testid="social-floating-icons"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Email at top */}
        <motion.div
          className="text-xs text-muted-foreground rotate-90 origin-center whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          sravanthkumarrr@gmail.com
        </motion.div>
        
        {/* Connecting Line */}
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-border to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Social Icons */}
        <div className="flex flex-col gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover-elevate transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.preventDefault();
                console.log(`${social.label} clicked:`, social.href);
              }}
              data-testid={`social-${social.label.toLowerCase()}`}
            >
              <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-2 py-1 bg-background border border-border rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.label}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}