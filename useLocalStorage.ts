export type ProjectStatus = 'ongoing' | 'finished';
export type ProjectType = 'bathroom' | 'kitchen' | 'patio' | 'electrical' | 'flooring' | 'roof' | 'paint' | 'exterior' | 'custom';

export interface ProjectStage {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface NoteItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  name: string;
  customerName: string;
  customerAddress: string;
  contractorName: string;
  type: ProjectType;
  status: ProjectStatus;
  notes: NoteItem[];
  stages: ProjectStage[];
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
}

export const PREDEFINED_STAGES: Record<ProjectType, string[]> = {
  bathroom: [
    'Prepare & Demolish', 
    'Rough Plumbing & Electrical', 
    'City Inspection (Rough)', 
    'Waterproofing & Drywall', 
    'Tile & Flooring', 
    'Fixtures & Finishes', 
    'City Inspection (Final)'
  ],
  kitchen: [
    'Prepare & Demolish', 
    'Rough Plumbing & Electrical', 
    'City Inspection (Rough)', 
    'Drywall & Paint', 
    'Cabinets & Countertops', 
    'Flooring & Appliances', 
    'City Inspection (Final)'
  ],
  patio: [
    'Permits & Prep',
    'Demolition & Footings',
    'Framing & Posts',
    'Roof / Enclosure Setup',
    'Electrical & Finishes',
    'City Inspection (Final)'
  ],
  electrical: [
    'Permit & Prep',
    'Rough-in & Panel setup',
    'City Inspection (Rough)',
    'Patching & Painting',
    'Fixtures & Trims',
    'City Inspection (Final)'
  ],
  flooring: [
    'Prep & Furniture Moving',
    'Demolition & Haul Away',
    'Floor Preparation',
    'Installation',
    'Baseboards & Cleanup'
  ],
  roof: [
    'Permit & Prep',
    'Tear Off & Demolition',
    'Plywood Decking / Repair',
    'City Inspection (Deck)',
    'Underlayment & Flashing',
    'Shingles / Tile Installation',
    'City Inspection (Final)'
  ],
  paint: [
    'Prep & Masking',
    'Surface Repairs & Patching',
    'Primer',
    'Color Coat',
    'Cleanup'
  ],
  exterior: [
    'Prep & Demolition',
    'Grading / Trenching',
    'Base / Framing / Foundation',
    'Material Installation',
    'Cleanup'
  ],
  custom: []
};

