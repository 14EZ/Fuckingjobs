import React, { useState } from 'react';
import { Project, ProjectType, PREDEFINED_STAGES } from '../types';
import { generateId, formatCurrency } from '../lib/utils';
import { FolderOpen, Plus, Activity, CheckCircle, Search } from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  onCreateProject: (p: Project) => void;
  onSelectProject: (id: string) => void;
}

type FilterTab = 'ongoing' | 'finished';

export default function Dashboard({ projects, onCreateProject, onSelectProject }: DashboardProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('ongoing');

  const activeProjects = projects.filter(p => p.status === 'ongoing');
  const finishedProjects = projects.filter(p => p.status === 'finished');

  const getFilteredAndSorted = (list: Project[]) => {
    return list
      .filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.customerName.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  };

  const displayedProjects = getFilteredAndSorted(activeTab === 'ongoing' ? activeProjects : finishedProjects);

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customerName = formData.get('customerName') as string;
    const customerAddress = formData.get('customerAddress') as string;
    const contractorName = formData.get('contractorName') as string;
    const type = formData.get('type') as ProjectType;

    const predefinedStages = PREDEFINED_STAGES[type] || [];
    const stages = predefinedStages.map(stageName => ({
      id: generateId(),
      name: stageName,
      isCompleted: false
    }));

    const newProject: Project = {
      id: generateId(),
      name: `${customerName} - ${customerAddress}`,
      customerName,
      customerAddress,
      contractorName,
      type,
      status: 'ongoing',
      notes: [],
      stages,
      expenses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onCreateProject(newProject);
    setIsCreating(false);
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-main tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Manage and track your reconstruction projects.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-orange hover:bg-orange/90 text-main px-5 py-2.5 rounded-lg shadow-sm font-semibold transition-all"
        >
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats row / Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
        <div 
          onClick={() => setActiveTab('ongoing')}
          className={`p-6 rounded-xl shadow-sm border cursor-pointer transition-all flex items-center gap-4 ${activeTab === 'ongoing' ? 'bg-orange/10 border-orange' : 'bg-white border-slate-200 hover:border-slate-300'}`}
        >
          <div className={`p-3 rounded-lg ${activeTab === 'ongoing' ? 'bg-orange text-main' : 'bg-slate-100 text-slate-500'}`}>
            <Activity size={24} />
          </div>
          <div>
            <p className={`text-sm font-medium ${activeTab === 'ongoing' ? 'text-orange' : 'text-slate-500'}`}>Active Projects</p>
            <p className="text-2xl font-bold text-main">{activeProjects.length}</p>
          </div>
        </div>
        <div 
          onClick={() => setActiveTab('finished')}
          className={`p-6 rounded-xl shadow-sm border cursor-pointer transition-all flex items-center gap-4 ${activeTab === 'finished' ? 'bg-teal/10 border-teal' : 'bg-white border-slate-200 hover:border-slate-300'}`}
        >
          <div className={`p-3 rounded-lg ${activeTab === 'finished' ? 'bg-teal text-white' : 'bg-slate-100 text-slate-500'}`}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p className={`text-sm font-medium ${activeTab === 'finished' ? 'text-teal' : 'text-slate-500'}`}>Finished Projects</p>
            <p className="text-2xl font-bold text-main">{finishedProjects.length}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h2 className="text-xl font-bold text-main">{activeTab === 'ongoing' ? 'Active Projects' : 'Finished Projects'}</h2>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange focus:border-orange"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {displayedProjects.map(project => {
          const projectExpenses = project.expenses.reduce((sum, e) => sum + e.amount, 0);
          const currentStage = project.stages.find(s => !s.isCompleted);

          return (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-orange transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-4 relative group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="p-2 shrink-0 bg-slate-50 text-main border border-slate-100 rounded-lg group-hover:bg-orange/10 group-hover:text-orange group-hover:border-orange/20 transition-colors">
                    <FolderOpen size={16} />
                  </div>
                  <h3 className="font-bold text-main leading-tight whitespace-normal break-words">{project.name}</h3>
                  <span className="hidden md:inline-flex text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                    {project.type}
                  </span>
                </div>
                <p className="text-sm text-slate-500 truncate ml-11">{project.customerName}</p>
              </div>

              <div className="flex md:hidden items-center gap-2 mb-2 ml-11">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0">
                  {project.type}
                </span>
                {project.status === 'ongoing' ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-orange/20 text-main border border-orange/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange" /> Ongoing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium bg-teal/10 text-teal border border-teal/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" /> Finished
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-[200px_100px] gap-4 items-center pl-11 md:pl-0 border-t border-slate-100 md:border-t-0 pt-3 md:pt-0">
                <div className="flex flex-col w-full min-w-0">
                  <span className="text-xs text-slate-400 md:hidden mb-1">Stage</span>
                  <span className="text-sm font-medium text-main truncate w-full" title={project.status === 'finished' ? 'All Completed' : (currentStage ? currentStage.name : 'Not started')}>
                    {project.status === 'finished' ? 'All Completed' : (currentStage ? currentStage.name : 'Not started')}
                  </span>
                </div>
                
                <div className="text-right flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-4 w-full">
                  <span className="text-xs text-slate-400 md:hidden mb-1 text-left">Expenses</span>
                  <span className="text-sm font-semibold text-main md:w-24 text-left md:text-right">{formatCurrency(projectExpenses)}</span>
                </div>
              </div>

              <div className="hidden md:flex justify-end w-28 shrink-0">
                {project.status === 'ongoing' ? (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-orange/20 text-main border border-orange/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange" /> Ongoing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-teal/10 text-teal border border-teal/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" /> Finished
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {displayedProjects.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white border border-slate-200 border-dashed rounded-xl">
            <FolderOpen size={48} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium pb-2">No projects found</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-main/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="font-bold text-xl text-main">Create New Project</h3>
              <button type="button" onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-red transition-colors">
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-main mb-1.5">Customer Name</label>
                <input required name="customerName" type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange" placeholder="Ben Mor" />
              </div>
              <div>
                <label className="block text-sm font-medium text-main mb-1.5">Customer Address</label>
                <input required name="customerAddress" type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange" placeholder="20335 Ventura Blvd, Woodland Hills" />
              </div>
              <div>
                <label className="block text-sm font-medium text-main mb-1.5">Contractor / Assignee Name</label>
                <input required name="contractorName" type="text" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange" placeholder="contractor name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-main mb-1.5">Project Type</label>
                <select required name="type" className="w-full border border-slate-300 rounded-md px-3 py-2.5 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange bg-white">
                  <option value="bathroom">Bathroom</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="patio">Patio & Deck</option>
                  <option value="electrical">Electrical</option>
                  <option value="flooring">Flooring</option>
                  <option value="roof">Roofing</option>
                  <option value="paint">Painting</option>
                  <option value="exterior">Exterior & Concrete</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              
              <div className="pt-6 flex gap-3 justify-end border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-main hover:bg-slate-50 rounded-md transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-sm font-semibold text-main bg-orange hover:bg-orange/90 rounded-md shadow-sm transition-colors">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
