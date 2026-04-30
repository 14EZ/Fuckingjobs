import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Project } from './types';
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetails';

export default function App() {
  const [projects, setProjects] = useLocalStorage<Project[]>('reconstruct_projects', []);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const normalizedProjects = projects.map(p => ({
    ...p,
    type: p.type || 'custom',
    notes: Array.isArray(p.notes) ? p.notes : []
  }));

  const selectedProject = normalizedProjects.find(p => p.id === selectedProjectId);

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(normalizedProjects.map(p => (p.id === updatedProject.id ? updatedProject : p)));
  };

  const handleCreateProject = (newProject: Project) => {
    setProjects([...normalizedProjects, newProject]);
    setSelectedProjectId(newProject.id);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(normalizedProjects.filter(p => p.id !== id));
    if (selectedProjectId === id) setSelectedProjectId(null);
  };

  // Sort ongoing first, then finished, and by recent
  const sortedSidebarProjects = [...normalizedProjects].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="flex h-screen bg-light overflow-hidden font-sans text-main">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-main text-slate-400 flex flex-col hidden md:flex border-r border-main shrink-0">
        <div className="p-6 flex items-center gap-3 font-semibold text-lg text-white">
          <span className="uppercase tracking-wider">FUCKING JOBS</span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setSelectedProjectId(null)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              !selectedProjectId ? 'bg-orange text-main font-medium' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <div className="pt-6 pb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0">
            Recent Projects
          </div>
          <div className="space-y-1">
            {sortedSidebarProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-md truncate transition-colors ${
                  selectedProjectId === project.id ? 'bg-orange text-main font-medium' : 'hover:bg-slate-800 hover:text-white text-sm'
                }`}
              >
                <span className="truncate">{project.name}</span>
                {project.status === 'finished' && (
                  <span className="w-2 h-2 rounded-full bg-teal shrink-0 ml-2" title="Finished" />
                )}
                {project.status === 'ongoing' && (
                  <span className="w-2 h-2 rounded-full bg-light shrink-0 ml-2" title="Ongoing" />
                )}
              </button>
            ))}
            {sortedSidebarProjects.length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-500 italic">No projects yet</div>
            )}
          </div>
        </nav>
      </aside>

      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-main text-white z-10 flex items-center px-4 justify-between shadow-md">
        <div className="flex items-center gap-2 font-semibold tracking-wider uppercase">
          FUCKING JOBS
        </div>
        <button 
          onClick={() => setSelectedProjectId(null)}
          className="text-sm font-medium text-slate-300 hover:text-orange"
        >
          Dashboard
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen bg-light overflow-hidden pt-16 md:pt-0">
        <div className="flex-1 overflow-y-auto w-full">
          {selectedProjectId && selectedProject ? (
            <ProjectDetails 
              project={selectedProject} 
              onUpdate={handleUpdateProject} 
              onDelete={() => handleDeleteProject(selectedProject.id)}
              onBack={() => setSelectedProjectId(null)}
            />
          ) : (
             <Dashboard 
               projects={normalizedProjects} 
               onCreateProject={handleCreateProject} 
               onSelectProject={setSelectedProjectId}
             />
          )}
        </div>
      </main>
    </div>
  );
}
