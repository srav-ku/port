import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Code, Server, Cloud, Palette } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500/20 to-purple-500/20',
    iconColor: 'text-blue-500',
    icon: Code
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'GraphQL', 'REST APIs'],
    color: 'from-green-500/20 to-teal-500/20',
    iconColor: 'text-green-500',
    icon: Server
  },
  {
    title: 'Tools & Cloud',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'GitHub Actions'],
    color: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-500',
    icon: Cloud
  },
  {
    title: 'Design & UX',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Accessibility'],
    color: 'from-pink-500/20 to-purple-500/20',
    iconColor: 'text-pink-500',
    icon: Palette
  }
];

export default function SkillsSection() {
  return (
    <section className="min-h-screen flex items-center py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light mb-6">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`p-6 h-full bg-gradient-to-br ${category.color} border-primary/10 hover-elevate`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${category.iconColor.replace('text-', 'bg-')}/10`}>
                    <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill}
                      className="text-sm text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}