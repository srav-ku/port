import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ContentProvider } from '@/contexts/ContentContext';
import AdminLayout from './components/AdminLayout';
import AdminSidebar from './components/AdminSidebar';
import AdminContent from './components/AdminContent';
import AdminPreview from './components/AdminPreview';
import AdminHeader from './components/AdminHeader';

export type AdminSection = 
  | 'hero' 
  | 'about' 
  | 'skills' 
  | 'projects' 
  | 'experience' 
  | 'certifications' 
  | 'contact' 
  | 'navigation' 
  | 'social';

export default function AdminApp() {
  const [activeSection, setActiveSection] = useState<AdminSection>('hero');
  const [showPreview, setShowPreview] = useState(true);

  return (
    <ThemeProvider>
      <ContentProvider>
        <div className="min-h-screen bg-background text-foreground">
          <AdminHeader 
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
          />
          <AdminLayout>
            <AdminSidebar 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            <AdminContent 
              activeSection={activeSection}
              showPreview={showPreview}
            />
            {showPreview && <AdminPreview />}
          </AdminLayout>
        </div>
      </ContentProvider>
    </ThemeProvider>
  );
}