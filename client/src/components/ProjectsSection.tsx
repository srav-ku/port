import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Globe, Smartphone, Code, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import webAppMockup from '@assets/generated_images/Web_application_interface_mockup_414f218b.png';
import mobileAppMockup from '@assets/generated_images/Mobile_app_interface_mockup_9cace1c0.png';

// todo: remove mock functionality
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    domain: 'ecommerce.demo',
    category: 'web',
    image: webAppMockup,
    description: 'A full-stack e-commerce platform with real-time inventory management, secure payments, and admin dashboard.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    features: ['Real-time inventory', 'Payment processing', 'Admin dashboard', 'Mobile responsive'],
    github: 'https://github.com/example/ecommerce',
    demo: 'https://ecommerce.demo'
  },
  {
    id: 2,
    title: 'Task Management App',
    domain: 'tasks.app',
    category: 'mobile',
    image: mobileAppMockup,
    description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Expo'],
    features: ['Real-time sync', 'Team collaboration', 'Push notifications', 'Offline support'],
    github: 'https://github.com/example/tasks',
    demo: 'https://tasks.app'
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    domain: 'analytics.demo',
    category: 'web',
    image: webAppMockup,
    description: 'Advanced analytics dashboard with data visualization, real-time metrics, and customizable reports.',
    technologies: ['Next.js', 'D3.js', 'GraphQL', 'MongoDB'],
    features: ['Data visualization', 'Real-time metrics', 'Custom reports', 'Export functionality'],
    github: 'https://github.com/example/analytics',
    demo: 'https://analytics.demo'
  }
];

const filters = [
  { id: 'all', label: 'All Projects', icon: Globe },
  { id: 'web', label: 'Web Apps', icon: Code },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
  { id: 'opensource', label: 'Open Source', icon: Database }
];

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-light mb-6">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Filter Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-2 p-1 bg-muted/50 rounded-full">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover-elevate'
                }`}
                data-testid={`filter-${filter.id}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="group cursor-pointer overflow-hidden hover-elevate h-full"
                  onClick={() => setSelectedProject(project)}
                  data-testid={`project-${project.id}`}
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Small thumbnail on left */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Project info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">{project.domain}</p>
                      
                      {/* Tech stack - show on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 2).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-auto"
              onClick={() => setSelectedProject(null)}
            >
              <div className="min-h-screen flex items-start justify-center p-6 pt-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="max-w-4xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <div className="flex justify-end mb-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedProject(null)}
                      className="bg-background/80 backdrop-blur-sm rounded-full"
                      data-testid="button-close-modal"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <Card className="overflow-hidden">
                    <div className="relative h-80">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                          <p className="text-muted-foreground text-lg">{selectedProject.domain}</p>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => console.log('GitHub clicked:', selectedProject.github)}
                            data-testid="button-github"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </Button>
                          <Button
                            onClick={() => console.log('Demo clicked:', selectedProject.demo)}
                            data-testid="button-demo"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                        {selectedProject.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-4 text-lg">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-sm">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-4 text-lg">Key Features</h4>
                          <ul className="space-y-3">
                            {selectedProject.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}