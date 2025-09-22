import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface AdminSetupData {
  email: string;
  password: string;
  displayName?: string;
}

export async function setupAdminUser({ email, password, displayName }: AdminSetupData): Promise<boolean> {
  try {
    console.log('Creating admin user...');
    
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('Admin user created with UID:', user.uid);
    
    // Set admin role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: displayName || 'Admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });
    
    console.log('Admin role set in Firestore successfully!');
    
    return true;
  } catch (error: any) {
    console.error('Error setting up admin user:', error);
    
    // Handle specific error cases
    if (error.code === 'auth/email-already-in-use') {
      console.log('Email already in use. Checking if user has admin role...');
      
      // If email exists, just try to set admin role
      try {
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: displayName || 'Admin',
            role: 'admin',
            lastLogin: new Date().toISOString()
          }, { merge: true });
          
          console.log('Admin role updated for existing user!');
          return true;
        }
      } catch (roleError) {
        console.error('Error updating admin role:', roleError);
      }
    }
    
    return false;
  }
}

// Quick setup function for development - can be called from console
export async function quickAdminSetup(): Promise<void> {
  const email = 'admin@sravanth-kumar.com';
  const password = 'admin123';
  
  console.log('Starting quick admin setup...');
  console.log('Email:', email);
  console.log('Password:', password);
  
  const success = await setupAdminUser({
    email,
    password,
    displayName: 'Portfolio Admin'
  });
  
  if (success) {
    console.log('✅ Admin setup completed successfully!');
    console.log('You can now login with:');
    console.log('Email:', email);
    console.log('Password:', password);
  } else {
    console.log('❌ Admin setup failed. Check console for errors.');
  }
}

// Make it available globally for console access
(window as any).quickAdminSetup = quickAdminSetup;
(window as any).setupAdminUser = setupAdminUser;