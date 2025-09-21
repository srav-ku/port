import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projectsContent } from '@/content/siteData';

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState<typeof projectsContent.projects[0] | null>(null);

  const filteredProjects = selectedFilter === 'All Projects' 
    ? projectsContent.projects 
    : projectsContent.projects.filter(project => project.category === selectedFilter);

  return (
    <section className="min-h-screen-safe section-padding section-spacing pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">{projectsContent.title}</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Side Icon Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-20 flex lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0"
          >
            {projectsContent.filterCategories.map((category) => {
              const project = projectsContent.projects.find(p => p.category === category) || projectsContent.projects[0];
              return (
                <div
                  key={category}
                  className="group relative flex-shrink-0"
                >
                  <button
                    onClick={() => setSelectedFilter(category)}
                    className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-2xl lg:text-3xl hover-elevate ${
                      selectedFilter === category
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                    data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {project.icon}
                  </button>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 lg:ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="bg-popover text-popover-foreground text-sm font-medium px-3 py-2 rounded-lg shadow-lg border whitespace-nowrap">
                      {category}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-b border-border rotate-45" />
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Filter Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6 lg:mb-8"
            >
              <input
                type="text"
                placeholder="Filter"
                value={selectedFilter}
                readOnly
                className="w-full sm:w-64 px-4 py-3 bg-muted/50 border border-border rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
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
                    className="motion-reduce-ok"
                  >
                    <Card 
                      className="group cursor-pointer overflow-hidden hover-elevate h-full"
                      onClick={() => setSelectedProject(project)}
                      data-testid={`project-${project.id}`}
                    >
                      <div className="p-4 sm:p-6">
                        {/* Project Icon & Title */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-2xl">{project.icon}</div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2">
                              {project.title}
                            </h4>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        
                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Project Detail Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-auto safe-top safe-bottom"
              onClick={() => setSelectedProject(null)}
            >
              <div className="min-h-screen flex items-start justify-center section-padding py-8 lg:py-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="max-w-4xl w-full motion-reduce-ok"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <div className="flex justify-end mb-4 lg:mb-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedProject(null)}
                      className="bg-background/80 backdrop-blur-sm rounded-full min-h-[44px] min-w-[44px]"
                      data-testid="button-close-modal"
                      aria-label="Close project details"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <Card className="overflow-hidden">
                    <div className="relative h-48 sm:h-64 lg:h-80">
                      <picture>
                        <img 
                          src={selectedProject.image} 
                          alt={selectedProject.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6 mb-6">
                        <div className="min-w-0">
                          <h3 className="text-2xl sm:text-3xl font-bold mb-2">{selectedProject.title}</h3>
                          <p className="text-muted-foreground text-base sm:text-lg">Project Overview</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          {selectedProject.github && (
                            <Button
                              variant="outline"
                              onClick={() => window.open(selectedProject.github, '_blank', 'noopener,noreferrer')}
                              data-testid="button-github"
                              className="min-h-[44px]"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </Button>
                          )}
                          {selectedProject.url && (
                            <Button
                              onClick={() => window.open(selectedProject.url, '_blank', 'noopener,noreferrer')}
                              data-testid="button-demo"
                              className="min-h-[44px]"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 lg:mb-8 leading-relaxed text-base sm:text-lg">
                        {selectedProject.description}
                      </p>
                      
                      <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold mb-4 text-base lg:text-lg">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs sm:text-sm">
                                {tech}
                              </Badge>
                            ))}
                          </div>
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