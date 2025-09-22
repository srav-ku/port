import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestoreService } from './firestore';

// Debug function to test complete data saving
export async function debugContentSaving(): Promise<void> {
  console.log('🔍 Debug: Testing complete content saving...');
  
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('❌ No authenticated user found.');
      return;
    }

    console.log('✅ Current user:', user.email);

    // Create a comprehensive test content object with ALL fields
    const completeTestContent = {
      personalInfo: {
        name: { first: 'Sravanth', last: 'Kumar' },
        email: 'sravanthskr2004@gmail.com',
        tagline: 'Full Stack Developer'
      },
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/sravanth', label: 'GitHub', iconName: 'Github' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/sravanth', label: 'LinkedIn', iconName: 'Linkedin' }
      ],
      navigation: [
        { id: 'home', label: 'Home', shortcut: '1' },
        { id: 'about', label: 'About', shortcut: '2' },
        { id: 'skills', label: 'Skills', shortcut: '3' },
        { id: 'projects', label: 'Projects', shortcut: '4' }
      ],
      hero: {
        title: { first: 'Sravanth', last: 'Kumar' },
        description: 'Building amazing web applications',
        buttons: { primary: { text: 'Contact Me', action: 'contact' } }
      },
      about: {
        title: 'About Me',
        description: 'I am a passionate developer',
        secondParagraph: 'I love creating innovative solutions',
        kpiCards: [
          { value: '50+', label: 'Projects' },
          { value: '3+', label: 'Years' }
        ],
        keyTechnologies: [
          { name: 'React' },
          { name: 'Node.js' },
          { name: 'TypeScript' }
        ],
        education: [
          {
            id: '1',
            institution: 'University',
            degree: 'Computer Science',
            period: '2020-2024',
            description: 'Focused on web development'
          }
        ]
      },
      skills: {
        title: 'My Skills',
        categories: [
          {
            name: 'Frontend',
            skills: ['React', 'TypeScript', 'JavaScript']
          },
          {
            name: 'Backend',
            skills: ['Node.js', 'Python', 'Express']
          }
        ]
      },
      projects: {
        title: 'My Projects',
        filterCategories: ['Web', 'Mobile', 'AI'],
        projects: [
          {
            id: 'project1',
            title: 'Awesome App',
            category: 'Web',
            description: 'Amazing web application',
            technologies: ['React', 'Node.js'],
            icon: '🚀',
            url: 'https://app.demo',
            github: 'https://github.com/user/app',
            image: ''
          }
        ]
      },
      experience: {
        title: 'Work Experience',
        experiences: [
          {
            id: '1',
            company: 'Tech Corp',
            position: 'Developer',
            period: '2022-2024',
            location: 'Remote',
            description: 'Built web applications',
            achievements: ['Improved performance', 'Led projects'],
            technologies: ['React', 'Node.js']
          }
        ]
      },
      certifications: {
        title: 'Certifications',
        certifications: [
          {
            id: '1',
            name: 'React Developer',
            issuer: 'Meta',
            date: '2023',
            credentialId: 'CERT123',
            url: 'https://certification.url',
            icon: '⚛️'
          }
        ]
      },
      contact: {
        title: 'Contact Me',
        subtitle: 'Get in touch',
        description: 'Let\'s work together',
        bulletPoints: [
          { text: 'Quick response' },
          { text: 'Professional service' }
        ],
        form: {
          title: 'Contact Form',
          fields: {
            firstName: { label: 'First Name', placeholder: 'John' },
            lastName: { label: 'Last Name', placeholder: 'Doe' },
            email: { label: 'Email', placeholder: 'john@example.com' },
            subject: { label: 'Subject', placeholder: 'Hello' },
            message: { label: 'Message', placeholder: 'Your message' }
          },
          submitButton: { text: 'Send Message' }
        },
        email: 'sravanthskr2004@gmail.com',
        emailCard: { title: 'Email Me' }
      }
    };

    console.log('📋 Test content structure:', Object.keys(completeTestContent));

    // Test 1: Direct Firestore save
    console.log('📝 Test 1: Direct Firestore save');
    const portfolioDoc = doc(db, 'portfolio', 'main');
    await setDoc(portfolioDoc, {
      content: completeTestContent,
      lastModified: new Date().toISOString(),
      version: '1.0.0',
      debugTest: true
    }, { merge: true });
    
    console.log('✅ Direct save completed');

    // Test 2: Verify data was saved
    console.log('📝 Test 2: Verifying saved data');
    const savedDoc = await getDoc(portfolioDoc);
    if (savedDoc.exists()) {
      const data = savedDoc.data();
      console.log('✅ Document exists');
      console.log('📊 Content sections in Firestore:', Object.keys(data.content || {}));
      console.log('🏠 Hero section exists:', !!data.content?.hero);
      console.log('👤 About section exists:', !!data.content?.about);
      console.log('💼 Skills section exists:', !!data.content?.skills);
      console.log('🚀 Projects section exists:', !!data.content?.projects);
      console.log('💼 Experience section exists:', !!data.content?.experience);
      console.log('🏆 Certifications section exists:', !!data.content?.certifications);
      console.log('📧 Contact section exists:', !!data.content?.contact);
    } else {
      console.log('❌ Document not found');
    }

    // Test 3: Using FirestoreService
    console.log('📝 Test 3: Using FirestoreService');
    const serviceResult = await firestoreService.saveContent(completeTestContent);
    console.log('🔄 FirestoreService result:', serviceResult);

  } catch (error: any) {
    console.error('❌ Debug test failed:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
  }
}

// Test the admin editing flow
export async function debugAdminEditing(): Promise<void> {
  console.log('🎨 Debug: Testing admin editing flow...');
  
  // Simulate editing the hero section
  const testUpdate = {
    'hero.title.first': 'Updated',
    'hero.title.last': 'Name',
    'hero.description': 'Updated description from debug test',
    'about.title': 'Updated About Title',
    'skills.title': 'Updated Skills Title'
  };

  console.log('📝 Simulating content updates:', testUpdate);

  // We'll test this through the browser console since we need the ContentContext
  console.log('ℹ️  To test admin editing:');
  console.log('1. Login to admin interface');
  console.log('2. Make changes to any fields');
  console.log('3. Click "Save to Cloud"');
  console.log('4. Check Firestore for all sections');
}

// Make functions available globally
(window as any).debugContentSaving = debugContentSaving;
(window as any).debugAdminEditing = debugAdminEditing;

console.log('🔧 Debug functions loaded:');
console.log('- debugContentSaving() - Test complete data saving');
console.log('- debugAdminEditing() - Test admin editing flow');