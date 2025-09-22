import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SiteContent } from '@shared/contentSchema';

const PORTFOLIO_DOC_ID = 'main';
const COLLECTION_NAME = 'portfolio';

export class FirestoreService {
  private unsubscribe: Unsubscribe | null = null;

  /**
   * Save portfolio content to Firestore
   */
  async saveContent(content: SiteContent): Promise<boolean> {
    try {
      console.log('🔄 FirestoreService: Starting save operation...');
      console.log('📋 Content sections to save:', Object.keys(content));
      
      // Validate content structure
      const requiredSections = ['personalInfo', 'socialLinks', 'navigation', 'hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const availableSections = Object.keys(content);
      const missingSections = requiredSections.filter(section => !availableSections.includes(section));
      
      if (missingSections.length > 0) {
        console.warn('⚠️  Missing sections detected:', missingSections);
      }
      
      // Create deep clone to avoid reference issues
      const contentClone = JSON.parse(JSON.stringify(content));
      
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const saveData = {
        content: contentClone,
        lastModified: new Date().toISOString(),
        version: '1.0.0',
        debug: {
          savedAt: new Date().toISOString(),
          sectionsCount: Object.keys(contentClone).length,
          sections: Object.keys(contentClone)
        }
      };
      
      await setDoc(docRef, saveData, { merge: true });
      
      console.log('✅ FirestoreService: Save completed successfully!');
      console.log('📊 Saved sections:', Object.keys(contentClone));
      
      return true;
    } catch (error) {
      console.error('❌ Error saving content to Firestore:', error);
      return false;
    }
  }

  /**
   * Load portfolio content from Firestore
   */
  async loadContent(): Promise<SiteContent | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.content as SiteContent;
      }
      
      return null;
    } catch (error) {
      console.error('Error loading content from Firestore:', error);
      return null;
    }
  }

  /**
   * Get document metadata (last modified, version, etc.)
   */
  async getContentMetadata(): Promise<{lastModified: string, version: string} | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          lastModified: data.lastModified || '',
          version: data.version || '1.0.0'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error loading content metadata:', error);
      return null;
    }
  }

  /**
   * Subscribe to real-time content updates
   */
  subscribeToContent(callback: (content: SiteContent | null, metadata?: any) => void): void {
    const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
    
    this.unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback(data.content as SiteContent, {
          lastModified: data.lastModified,
          version: data.version
        });
      } else {
        callback(null);
      }
    }, (error) => {
      console.error('Error in content subscription:', error);
      callback(null);
    });
  }

  /**
   * Unsubscribe from real-time updates
   */
  unsubscribeFromContent(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  /**
   * Check if content exists in Firestore
   */
  async contentExists(): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTION_NAME, PORTFOLIO_DOC_ID);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error('Error checking if content exists:', error);
      return false;
    }
  }
}

export const firestoreService = new FirestoreService();