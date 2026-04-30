import React, { useState } from 'react';
import { Project, ProjectStage, Expense, NoteItem, PREDEFINED_STAGES } from '../types';
import { generateId, formatCurrency, formatDate } from '../lib/utils';
import { 
  ArrowLeft, Trash2, CheckCircle, Clock, Plus, 
  MapPin, User, HardHat, DollarSign, LayoutList, ClipboardList, Copy
} from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
  onUpdate: (p: Project) => void;
  onDelete: () => void;
  onBack: () => void;
}

type Tab = 'notes' | 'stages' | 'expenses';

export default function ProjectDetails({ project, onUpdate, onDelete, onBack }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('notes');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Note Checklists State
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  // Stage Create State
  const [isAddingStage, setIsAddingStage] = useState(false);
  const [selectedStageOption, setSelectedStageOption] = useState('');
  const [customStageName, setCustomStageName] = useState('');

  // Expense Create State
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const predefinedStagesForType = PREDEFINED_STAGES[project.type] || [];
  const unusedPredefinedStages = predefinedStagesForType.filter(
    s => !project.stages.some(existing => existing.name === s)
  );

  const handleStatusToggle = () => {
    onUpdate({
      ...project,
      status: project.status === 'ongoing' ? 'finished' : 'ongoing',
      updatedAt: new Date().toISOString()
    });
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    
    const newNote: NoteItem = {
      id: generateId(),
      text: newNoteText.trim(),
      isCompleted: false
    };
    onUpdate({
      ...project,
      notes: [...(project.notes || []), newNote],
      updatedAt: new Date().toISOString()
    });
    setNewNoteText('');
    setIsAddingNote(false);
  };

  const handleToggleNote = (noteId: string) => {
    onUpdate({
      ...project,
      notes: project.notes.map(n => n.id === noteId ? { ...n, isCompleted: !n.isCompleted } : n),
      updatedAt: new Date().toISOString()
    });
  };

  const handleDeleteNote = (noteId: string) => {
    onUpdate({
      ...project,
      notes: project.notes.filter(n => n.id !== noteId),
      updatedAt: new Date().toISOString()
    });
  };

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalStageName = selectedStageOption === 'CUSTOM' ? customStageName : selectedStageOption;
    if (!finalStageName.trim()) return;
    
    const newStage: ProjectStage = {
      id: generateId(),
      name: finalStageName.trim(),
      isCompleted: false
    };
    onUpdate({
      ...project,
      stages: [...project.stages, newStage],
      updatedAt: new Date().toISOString()
    });
    setSelectedStageOption('');
    setCustomStageName('');
    setIsAddingStage(false);
  };

  const handleToggleStage = (stageId: string) => {
    onUpdate({
      ...project,
      stages: project.stages.map(s => s.id === stageId ? { ...s, isCompleted: !s.isCompleted } : s),
      updatedAt: new Date().toISOString()
    });
  };

  const handleDeleteStage = (stageId: string) => {
    onUpdate({
      ...project,
      stages: project.stages.filter(s => s.id !== stageId),
      updatedAt: new Date().toISOString()
    });
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const amount = parseFloat(formData.get('amount') as string);
    if (isNaN(amount) || amount <= 0) return;

    const newExpense: Expense = {
      id: generateId(),
      description: formData.get('description') as string,
      amount,
      date: formData.get('date') as string,
      category: formData.get('category') as string,
    };
    onUpdate({
      ...project,
      expenses: [...project.expenses, newExpense],
      updatedAt: new Date().toISOString()
    });
    setIsAddingExpense(false);
  };

  const handleDeleteExpense = (expenseId: string) => {
    onUpdate({
      ...project,
      expenses: project.expenses.filter(e => e.id !== expenseId),
      updatedAt: new Date().toISOString()
    });
  };

  const totalExpenses = project.expenses.reduce((sum, e) => sum + e.amount, 0);
  const completedStagesCount = project.stages.filter(s => s.isCompleted).length;
  const currentStage = project.stages.find(s => !s.isCompleted);

  return (
    <div className="flex flex-col h-full bg-light">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div className="flex-1">
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-main mb-2 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden md:inline">Back to Dashboard</span>
            <span className="md:hidden">Back</span>
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold text-main">{project.name}</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200">
               {project.type}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end md:self-auto -mt-8 md:-mt-0">
          <button
             onClick={() => {
               navigator.clipboard.writeText(`${project.name}\n${project.customerAddress}`);
               setIsCopied(true);
               setTimeout(() => setIsCopied(false), 2000);
             }}
             className="flex items-center gap-1.5 text-slate-500 hover:bg-slate-100 px-2 md:px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors border border-transparent hover:border-slate-300"
             title="Copy project info"
          >
            {isCopied ? <CheckCircle size={20} className="text-teal" /> : <Copy size={20} />}
            <span className="hidden md:inline">{isCopied ? 'Copied' : 'Copy'}</span>
          </button>

          {project.status === 'ongoing' ? (
            <button
              onClick={handleStatusToggle}
              className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors bg-teal text-white hover:bg-teal/90"
              title="Mark project as finished"
            >
              <CheckCircle size={20} /> 
              <span className="hidden md:inline">Finish</span>
            </button>
          ) : (
            <button
              onClick={handleStatusToggle}
              className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors bg-orange/20 text-main hover:bg-orange/30 border border-orange/40"
              title="Re-open project"
            >
              <Clock size={20} /> 
              <span className="hidden md:inline">Reopen</span>
            </button>
          )}

          <button 
            onClick={() => setIsConfirmingDelete(true)}
            className="flex items-center gap-2 text-red hover:bg-red/10 px-2 md:px-3 py-1.5 rounded-md font-medium text-sm transition-colors border border-transparent hover:border-red/20"
            title="Delete Project"
          >
            <Trash2 size={20} />
            <span className="hidden md:inline">Delete</span>
          </button>
        </div>
      </header>

      {/* Delete Confirmation Modal */}
      {isConfirmingDelete && (
        <div className="fixed inset-0 bg-main/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 text-red mb-4">
              <div className="p-2 bg-red/10 rounded-full">
                <Trash2 size={24} />
              </div>
              <h3 className="font-bold text-lg text-main">Delete Project?</h3>
            </div>
            <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">
              Are you sure you want to delete <span className="font-semibold text-main">{project.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsConfirmingDelete(false)} 
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-main hover:bg-slate-50 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={onDelete} 
                className="px-4 py-2 text-sm font-medium text-white bg-red hover:bg-[#c9182e] rounded-md shadow-sm transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* Quick Stats & Info Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-3">
                  <User size={18} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</p>
                    <p className="text-sm md:text-base text-main font-medium leading-tight">{project.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</p>
                    <p className="text-sm md:text-base text-main leading-tight">{project.customerAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HardHat size={18} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Contractor</p>
                    <p className="text-sm md:text-base text-main leading-tight">{project.contractorName}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-center gap-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Stage</p>
                <p className="text-xl font-bold text-main leading-tight">
                  {project.status === 'finished' ? 'All Completed' : (currentStage ? currentStage.name : 'Not Started')}
                </p>
                <div className="mt-2 text-xs font-medium text-slate-500 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-teal rounded-full" />
                  {completedStagesCount} of {project.stages.length} stages completed
                </div>
              </div>
            </div>

            <div className="bg-main rounded-xl shadow-sm border border-slate-800 p-6 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-white">
                <DollarSign size={80} />
              </div>
              <div className="flex items-center gap-3 text-white mb-2 relative z-10">
                <span className="p-1.5 bg-orange text-main rounded-md">
                  <DollarSign size={18} />
                </span>
                <h3 className="font-semibold tracking-wide">Total Expenses</h3>
              </div>
              <p className="text-4xl font-light tracking-tight relative z-10 mt-2">{formatCurrency(totalExpenses)}</p>
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between text-sm text-slate-400 relative z-10">
                <span>{project.expenses.length} records</span>
                <button onClick={() => setActiveTab('expenses')} className="hover:text-white transition-colors">View All &rarr;</button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto space-x-1 border-b border-slate-200 bg-white px-2 pt-2 rounded-t-xl hide-scrollbar">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'notes' ? 'border-orange text-main' : 'border-transparent text-slate-500 hover:text-main'
              }`}
              title="Checklists"
            >
              <ClipboardList size={20} /> <span className="hidden md:inline">Checklists</span>
            </button>
            <button
              onClick={() => setActiveTab('stages')}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'stages' ? 'border-orange text-main' : 'border-transparent text-slate-500 hover:text-main'
              }`}
              title="Stages"
            >
              <LayoutList size={20} /> <span className="hidden md:inline">Stages</span>
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                activeTab === 'expenses' ? 'border-orange text-main' : 'border-transparent text-slate-500 hover:text-main'
              }`}
              title="Expenses"
            >
              <DollarSign size={20} /> <span className="hidden md:inline">Expenses</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-slate-200 min-h-[400px]">
            {activeTab === 'notes' && (
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-main">Notes & To-Do</h3>
                    <p className="text-sm text-slate-500">Track specific tasks or notes for this project.</p>
                  </div>
                  {!isAddingNote && (
                    <button 
                      onClick={() => setIsAddingNote(true)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-main bg-orange hover:bg-orange/90 px-4 py-2 rounded-md transition-colors"
                    >
                      <Plus size={16} /> Add Task
                    </button>
                  )}
                </div>

                {isAddingNote && (
                  <form onSubmit={handleAddNote} className="flex gap-3 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <input 
                      autoFocus
                      required
                      type="text" 
                      placeholder="e.g. Call customer about tile choices..." 
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange"
                    />
                    <button type="submit" className="bg-main text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">Add</button>
                    <button type="button" onClick={() => setIsAddingNote(false)} className="text-slate-500 hover:text-main px-3 text-sm font-medium transition-colors">Cancel</button>
                  </form>
                )}

                <div className="space-y-2">
                  {(!project.notes || project.notes.length === 0) ? (
                    <div className="text-center py-10 text-slate-400 italic text-sm border-2 border-dashed border-slate-100 rounded-xl">
                      No notes or tasks yet.
                    </div>
                  ) : (
                    project.notes.map((note) => (
                      <div key={note.id} className="flex items-start gap-3 p-3 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 group transition-colors">
                         <button 
                           onClick={() => handleToggleNote(note.id)}
                           className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                             note.isCompleted ? 'bg-teal border-teal text-white' : 'border-slate-300 text-transparent hover:border-teal'
                           }`}
                         >
                           <CheckCircle size={12} className={note.isCompleted ? 'block' : 'hidden'} />
                         </button>
                         <span className={`text-sm flex-1 pt-0.5 ${note.isCompleted ? 'text-slate-400 line-through' : 'text-main'}`}>
                           {note.text}
                         </span>
                        <button 
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-slate-400 hover:text-red p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'stages' && (
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-main">Project Stages</h3>
                    <p className="text-sm text-slate-500">Track the completion of different phases.</p>
                  </div>
                  {!isAddingStage && (
                    <button 
                      onClick={() => setIsAddingStage(true)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-main bg-orange hover:bg-orange/90 px-4 py-2 rounded-md transition-colors"
                    >
                      <Plus size={16} /> Add Stage
                    </button>
                  )}
                </div>

                {isAddingStage && (
                  <form onSubmit={handleAddStage} className="grid grid-cols-1 md:flex gap-3 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <select
                      autoFocus
                      required
                      value={selectedStageOption}
                      onChange={(e) => setSelectedStageOption(e.target.value)}
                      className="w-full md:w-64 border border-slate-300 rounded-md px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange bg-white"
                    >
                      <option value="" disabled>Select a stage...</option>
                      {unusedPredefinedStages.map(s => (
                         <option key={s} value={s}>{s}</option>
                      ))}
                      <option value="CUSTOM">-- Custom Stage --</option>
                    </select>
                    
                    {selectedStageOption === 'CUSTOM' && (
                      <input 
                        required
                        type="text" 
                        placeholder="Type custom stage name..." 
                        value={customStageName}
                        onChange={(e) => setCustomStageName(e.target.value)}
                        className="flex-1 w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange"
                      />
                    )}
                    <div className="flex gap-3 justify-end md:shrink-0">
                      <button type="submit" className="bg-main text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">Add</button>
                      <button type="button" onClick={() => setIsAddingStage(false)} className="text-slate-500 hover:text-main px-3 text-sm font-medium transition-colors">Cancel</button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {project.stages.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 italic text-sm border-2 border-dashed border-slate-100 rounded-xl">
                      No stages defined yet.
                    </div>
                  ) : (
                    project.stages.map((stage, idx) => (
                      <div key={stage.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all group ${stage.isCompleted ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300 hover:border-orange'}`}>
                        <div className="flex items-center gap-4 flex-1">
                           <button 
                             onClick={() => handleToggleStage(stage.id)}
                             className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                               stage.isCompleted ? 'bg-teal border-teal text-white' : 'border-slate-300 text-transparent hover:border-teal'
                             }`}
                           >
                             <CheckCircle size={14} className={stage.isCompleted ? 'block' : 'hidden'} />
                           </button>
                           <span className={`font-medium ${stage.isCompleted ? 'text-slate-400 line-through decoration-slate-300' : 'text-main'}`}>
                             {idx + 1}. {stage.name}
                           </span>
                        </div>
                        <button 
                          onClick={() => handleDeleteStage(stage.id)}
                          className="text-slate-400 hover:text-red p-2 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity md:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'expenses' && (
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-main">Expense Tracking</h3>
                    <p className="text-sm text-slate-500">Record material, labor, and other costs.</p>
                  </div>
                  {!isAddingExpense && (
                    <button 
                      onClick={() => setIsAddingExpense(true)}
                      className="flex items-center gap-1.5 text-sm font-semibold text-main bg-orange hover:bg-orange/90 px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                    >
                      <Plus size={16} /> <span className="hidden sm:inline">Add Expense</span><span className="sm:hidden">Add</span>
                    </button>
                  )}
                </div>

                {isAddingExpense && (
                  <form onSubmit={handleAddExpense} className="mb-8 bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
                       <input required name="description" autoFocus placeholder="e.g. Lumber, Permits..." className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Amount ($)</label>
                       <div className="relative">
                         <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                         <input required name="amount" type="number" step="0.01" min="0" placeholder="0.00" className="w-full pl-9 border border-slate-300 rounded-md px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange" />
                       </div>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
                       <input required name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange pointer-events-auto" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
                      <select name="category" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-orange bg-white">
                        <option value="materials">Materials</option>
                        <option value="labor">Labor</option>
                        <option value="subcontractor">Subcontractor</option>
                        <option value="equipment">Equipment Rental</option>
                        <option value="permits">Permits & Fees</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-slate-200 pt-5">
                      <button type="button" onClick={() => setIsAddingExpense(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-main transition-colors bg-white border border-slate-200 rounded-md shadow-sm">Cancel</button>
                      <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-main hover:bg-slate-800 rounded-md shadow-sm transition-colors">Save Expense</button>
                    </div>
                  </form>
                )}

                {project.expenses.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 italic text-sm border-2 border-dashed border-slate-100 rounded-xl">
                    No expenses recorded yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto w-full border border-slate-200 rounded-lg">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Description</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3 text-right">Amount</th>
                          <th className="px-4 py-3 text-right w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-main bg-white">
                        {project.expenses.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(expense => (
                          <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-slate-500">{formatDate(expense.date)}</td>
                            <td className="px-4 py-3 font-medium">{expense.description}</td>
                            <td className="px-4 py-3 capitalize">
                               <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                 {expense.category}
                               </span>
                            </td>
                            <td className="px-4 py-3 text-right font-medium">{formatCurrency(expense.amount)}</td>
                            <td className="px-4 py-3 text-right">
                              <button 
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="text-slate-400 hover:text-red transition-colors"
                                title="Delete expense"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
