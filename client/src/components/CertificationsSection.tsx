import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink, Calendar } from 'lucide-react';

// todo: remove mock functionality
const certifications = [
  {
    id: 1,
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2023',
    logo: '☁️',
    description: 'Certified in developing and maintaining applications on AWS platform with focus on core services, security, and deployment.',
    skills: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFormation'],
    credentialId: 'AWS-DEV-2023-001',
    verifyUrl: 'https://aws.amazon.com/verification'
  },
  {
    id: 2,
    name: 'Google Cloud Professional',
    issuer: 'Google Cloud',
    date: '2023',
    logo: '🌐',
    description: 'Professional certification in cloud architecture, data engineering, and application development on Google Cloud Platform.',
    skills: ['GCP', 'Kubernetes', 'BigQuery', 'Cloud Functions', 'Terraform'],
    credentialId: 'GCP-PRO-2023-002',
    verifyUrl: 'https://cloud.google.com/verification'
  },
  {
    id: 3,
    name: 'Meta Frontend Developer',
    issuer: 'Meta (Facebook)',
    date: '2022',
    logo: '⚛️',
    description: 'Comprehensive certification covering modern React development, state management, and frontend best practices.',
    skills: ['React', 'Redux', 'JavaScript', 'HTML/CSS', 'Testing'],
    credentialId: 'META-FE-2022-003',
    verifyUrl: 'https://meta.com/verification'
  },
  {
    id: 4,
    name: 'Certified Kubernetes Admin',
    issuer: 'Cloud Native Computing Foundation',
    date: '2022',
    logo: '⚙️',
    description: 'Hands-on certification demonstrating skills in Kubernetes cluster administration and container orchestration.',
    skills: ['Kubernetes', 'Docker', 'Container Security', 'Networking', 'Storage'],
    credentialId: 'CKA-2022-004',
    verifyUrl: 'https://cncf.io/verification'
  }
];

export default function CertificationsSection() {
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
          <h2 className="text-4xl lg:text-5xl font-light mb-6">Certifications</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Professional certifications validating expertise and commitment to excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group perspective-1000"
            >
              <div className="relative h-80 transform-style-preserve-3d transition-transform duration-700 hover:rotate-y-180">
                {/* Front of card */}
                <Card className="absolute inset-0 p-6 backface-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover-elevate">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{cert.logo}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>
                      
                      <div className="flex items-center gap-2 text-primary mb-4">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">Verified Certification</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {cert.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{cert.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-4 opacity-70">
                      Hover to view details
                    </div>
                  </div>
                </Card>

                {/* Back of card */}
                <Card className="absolute inset-0 p-6 backface-hidden rotate-y-180 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{cert.name}</h3>
                      <button
                        onClick={() => console.log('Verify clicked:', cert.verifyUrl)}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                        data-testid={`button-verify-${cert.id}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        Verify
                      </button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {cert.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Skills Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="text-xs text-muted-foreground">
                        <div>Credential ID: {cert.credentialId}</div>
                        <div className="mt-1">Issued by: {cert.issuer}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}