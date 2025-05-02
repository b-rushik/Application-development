export type UserRole = 'paperSetter' | 'paperGetter' | 'admin' | 'superUser';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  personalEmail?: string;
  orgEmail?: string;
  isVerified: boolean;
  uniqueId?: string;
  organizationName?: string;
  branch?: string;
  subjects?: string[];
  proficiencyLevel?: 'high' | 'medium' | 'low';
  yearsOfExperience?: number;
  rating?: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface PaperRequest {
  id: string;
  paperGetterId: string;
  course: string;
  branch: string;
  subject: string;
  syllabusUrl: string;
  difficultyLevel: 'hard' | 'medium' | 'low';
  numSets: number;
  modelPaperUrl: string;
  examDate: string;
  examTime: string;
  selectedFacultyId?: string;
  status: 'pending' | 'assigned' | 'submitted' | 'reviewed' | 'approved' | 'rejected' | 'delivered';
  createdAt: string;
}

export interface QuestionPaper {
  id: string;
  requestId: string;
  paperSetterId: string;
  paperUrl: string;
  reviewRating?: number;
  reviewFeedback?: string;
  uploadedAt: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
}

export interface SubjectExpert {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  organization: string;
  rating: number;
}