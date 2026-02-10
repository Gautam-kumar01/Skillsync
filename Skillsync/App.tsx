/**
 * SkillSync — Main Application Entry Point
 *
 * Architecture:
 * - AuthProvider wraps the entire app for authentication state
 * - DataProvider manages all CRUD data (skills, certs, goals)
 * - Layout provides sidebar navigation and responsive shell
 * - Page components handle their own forms, filters, and displays
 *
 * Data Flow:
 * App → AuthProvider → (Auth | DataProvider → Layout → Page)
 *
 * Storage:
 * All data persisted to localStorage with 'skillsync_' prefix.
 * Users, skills, certifications, and goals are stored as JSON arrays.
 */

import { useState } from 'react';
import type { Page } from '@/types';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { Auth } from '@/components/Auth';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { Skills } from '@/components/Skills';
import { Certifications } from '@/components/Certifications';
import { CareerGoals } from '@/components/CareerGoals';
import { Profile } from '@/components/Profile';

/**
 * Main app shell that switches between auth and authenticated views.
 */
function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // Show login/register when not authenticated
  if (!isAuthenticated) {
    return <Auth />;
  }

  /**
   * Render the active page based on navigation state.
   */
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'skills':
        return <Skills />;
      case 'certifications':
        return <Certifications />;
      case 'goals':
        return <CareerGoals />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <DataProvider>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
    </DataProvider>
  );
}

/**
 * Root App component — wraps everything in AuthProvider.
 */
export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
