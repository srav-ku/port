import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';

// Test Firebase connection and Firestore operations
export async function testFirebaseConnection(): Promise<void> {
  console.log('🔥 Testing Firebase Connection...');
  
  try {
    // Test 1: Check Auth State
    console.log('📝 Test 1: Auth State');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ User is signed in:', user.email);
        console.log('🆔 User UID:', user.uid);
      } else {
        console.log('❌ No user is signed in');
      }
    });

    // Test 2: Test Firestore Write (Simple Document)
    console.log('📝 Test 2: Firestore Write Test');
    const testDoc = doc(db, 'test', 'connection-test');
    await setDoc(testDoc, {
      message: 'Firebase connection working!',
      timestamp: new Date().toISOString(),
      test: true
    });
    console.log('✅ Test document written successfully');

    // Test 3: Test Firestore Read
    console.log('📝 Test 3: Firestore Read Test');
    const docSnap = await getDoc(testDoc);
    if (docSnap.exists()) {
      console.log('✅ Test document read successfully:', docSnap.data());
    } else {
      console.log('❌ Test document not found');
    }

    // Test 4: Test Collection Creation
    console.log('📝 Test 4: Collection Creation Test');
    const testCollection = collection(db, 'portfolio');
    const portfolioDoc = await addDoc(testCollection, {
      content: {
        hero: {
          title: { first: 'Test', last: 'User' },
          description: 'Test portfolio content'
        }
      },
      lastModified: new Date().toISOString(),
      version: '1.0.0'
    });
    console.log('✅ Portfolio collection created with document ID:', portfolioDoc.id);

  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    
    // Provide specific error details
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
    }
  }
}

// Test Content Context Save Operation
export async function testContentSave(): Promise<void> {
  console.log('📝 Testing Content Save Operation...');
  
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('❌ No authenticated user found. Please login first.');
      return;
    }

    console.log('✅ Current user:', user.email);
    
    // Test saving a portfolio document
    const portfolioDoc = doc(db, 'portfolio', 'main');
    const testContent = {
      content: {
        personalInfo: { name: { first: 'Test', last: 'Portfolio' }, email: 'test@example.com', tagline: 'Test Developer' },
        hero: { title: { first: 'Hello', last: 'World' }, description: 'This is a test portfolio', buttons: { primary: { text: 'Contact', action: 'contact' } } },
        about: { title: 'About Me', description: 'Test about content', secondParagraph: 'More about me', kpiCards: [], keyTechnologies: [], education: [] },
        skills: { title: 'Skills', categories: [] },
        projects: { title: 'Projects', filterCategories: [], projects: [] },
        experience: { title: 'Experience', experiences: [] },
        certifications: { title: 'Certifications', certifications: [] },
        contact: { title: 'Contact', subtitle: 'Get in touch', description: 'Contact me', bulletPoints: [], form: { title: 'Contact Form', fields: { firstName: { label: 'First Name', placeholder: 'John' }, lastName: { label: 'Last Name', placeholder: 'Doe' }, email: { label: 'Email', placeholder: 'john@example.com' }, subject: { label: 'Subject', placeholder: 'Hello' }, message: { label: 'Message', placeholder: 'Your message' } }, submitButton: { text: 'Send' } }, email: 'test@example.com', emailCard: { title: 'Email Me' } },
        socialLinks: [],
        navigation: []
      },
      lastModified: new Date().toISOString(),
      version: '1.0.0'
    };

    await setDoc(portfolioDoc, testContent, { merge: true });
    console.log('✅ Portfolio content saved successfully!');
    
    // Verify it was saved
    const savedDoc = await getDoc(portfolioDoc);
    if (savedDoc.exists()) {
      console.log('✅ Portfolio content verified in Firestore!');
      console.log('📄 Document data preview:', {
        lastModified: savedDoc.data().lastModified,
        version: savedDoc.data().version,
        hasContent: !!savedDoc.data().content
      });
    }

  } catch (error) {
    console.error('❌ Content save test failed:', error);
  }
}

// Make functions available globally for console testing
(window as any).testFirebaseConnection = testFirebaseConnection;
(window as any).testContentSave = testContentSave;

console.log('🔧 Firebase test functions loaded. Run in console:');
console.log('- testFirebaseConnection() - Test basic Firebase connectivity');
console.log('- testContentSave() - Test portfolio content saving');