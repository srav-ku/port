import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar } from 'lucide-react';

// todo: remove mock functionality
const experiences = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    period: '2022 - Present',
    location: 'San Francisco, CA',
    description: 'Lead development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented best practices for code quality and performance.',
    achievements: [
      'Reduced application load time by 40% through optimization',
      'Led team of 5 developers on major product redesign',
      'Implemented CI/CD pipeline reducing deployment time by 60%'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker']
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2020 - 2022',
    location: 'New York, NY',
    description: 'Developed responsive web applications and mobile-first designs. Collaborated with UX designers to implement pixel-perfect interfaces and improved user experience metrics.',
    achievements: [
      'Built reusable component library used across 5+ products',
      'Improved mobile conversion rate by 25%',
      'Established frontend testing standards and practices'
    ],
    technologies: ['React', 'JavaScript', 'Sass', 'Jest', 'Figma']
  },
  {
    id: 3,
    title: 'Junior Web Developer',
    company: 'Digital Agency',
    period: '2019 - 2020',
    location: 'Austin, TX',
    description: 'Started my professional journey building websites for small businesses and learning modern web development practices. Gained experience in full-stack development and client communication.',
    achievements: [
      'Delivered 15+ client websites on time and within budget',
      'Learned multiple technology stacks and frameworks',
      'Contributed to open-source projects and community'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress']
  }
];

export default function ExperienceSection() {
  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light mb-6">Professional Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            A journey of continuous growth and impactful contributions
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
          
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline marker */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                
                <div className="ml-20">
                  <Card className="p-6 hover-elevate">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-xl font-semibold">{experience.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Building className="w-4 h-4" />
                          <span>{experience.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {experience.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}