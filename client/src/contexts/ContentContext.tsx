import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteContent, ContentUpdate } from '@shared/contentSchema';
import * as siteData from '@/content/siteData';

// Transform the current siteData to match the new schema
const transformSiteData = (): SiteContent => {
  return {
    personalInfo: siteData.personalInfo,
    socialLinks: siteData.socialLinks,
    navigation: siteData.navigationSections,
    hero: siteData.heroContent,
    about: siteData.aboutContent,
    skills: siteData.skillsContent,
    projects: siteData.projectsContent,
    experience: siteData.experienceContent,
    certifications: siteData.certificationsContent,
    contact: siteData.contactContent,
  };
};

interface ContentContextType {
  content: SiteContent;
  isDirty: boolean;
  lastSaved: Date | null;
  updateContent: (path: string, value: any) => void;
  updateMultiple: (updates: ContentUpdate[]) => void;
  resetContent: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => boolean;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

const STORAGE_KEY = 'portfolio_content_data';

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(transformSiteData());
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Initialize content from localStorage if available
  useEffect(() => {
    loadFromStorage();
  }, []);

  const setValueByPath = useCallback((obj: any, path: string, value: any) => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    
    let current = obj;
    for (const key of keys) {
      if (!(key in current)) {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[lastKey] = value;
  }, []);

  const updateContent = useCallback((path: string, value: any) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
      setValueByPath(newContent, path, value);
      return newContent;
    });
    setIsDirty(true);
  }, [setValueByPath]);

  const updateMultiple = useCallback((updates: ContentUpdate[]) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev)); // Deep clone
      updates.forEach(({ path, value }) => {
        setValueByPath(newContent, path, value);
      });
      return newContent;
    });
    setIsDirty(true);
  }, [setValueByPath]);

  const resetContent = useCallback(() => {
    setContent(transformSiteData());
    setIsDirty(false);
    setLastSaved(null);
  }, []);

  const saveToStorage = useCallback(() => {
    try {
      const dataToSave = {
        content,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      setIsDirty(false);
      setLastSaved(new Date());
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }, [content]);

  const loadFromStorage = useCallback((): boolean => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { content: savedContent, timestamp } = JSON.parse(saved);
        setContent(savedContent);
        setLastSaved(new Date(timestamp));
        setIsDirty(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return false;
    }
  }, []);

  const exportData = useCallback((): string => {
    const exportData = {
      version: '1.0.0',
      exported: new Date().toISOString(),
      content
    };
    return JSON.stringify(exportData, null, 2);
  }, [content]);

  const importData = useCallback((jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.content && typeof parsed.content === 'object') {
        setContent(parsed.content);
        setIsDirty(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }, []);

  const contextValue: ContentContextType = {
    content,
    isDirty,
    lastSaved,
    updateContent,
    updateMultiple,
    resetContent,
    saveToStorage,
    loadFromStorage,
    exportData,
    importData
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Selector hooks for specific content sections
export const usePersonalInfo = () => useContent().content.personalInfo;
export const useSocialLinks = () => useContent().content.socialLinks;
export const useNavigation = () => useContent().content.navigation;
export const useHeroContent = () => useContent().content.hero;
export const useAboutContent = () => useContent().content.about;
export const useSkillsContent = () => useContent().content.skills;
export const useProjectsContent = () => useContent().content.projects;
export const useExperienceContent = () => useContent().content.experience;
export const useCertificationsContent = () => useContent().content.certifications;
export const useContactContent = () => useContent().content.contact;