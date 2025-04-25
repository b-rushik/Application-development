// User Role Types
export enum UserRole {
    PAPER_SETTER = 'PAPER_SETTER',
    PAPER_GETTER = 'PAPER_GETTER',
    ADMIN = 'ADMIN',
    SUPER_USER = 'SUPER_USER',
  }
  
  // Authentication Types
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    role: UserRole | null;
    isVerified: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface User {
    id: string;
    personalEmail: string;
    orgEmail: string;
    userId: string;
    role: UserRole;
    isVerified: boolean;
    orgId?: string;
    createdAt: string;
  }
  
  // Paper Setter Types
  export interface PaperSetterProfile {
    id: string;
    userId: string;
    organizationName: string;
    branch: string;
    subjects: string[];
    proficiencyLevel: string;
    yearsOfExperience: number;
    averageRating?: number;
    isVerified: boolean;
  }
  
  export interface QuestionPaperAssignment {
    id: string;
    paperSetterId: string;
    paperGetterId: string;
    subject: string;
    difficulty: string;
    syllabus: string;
    modelPaper: string;
    examDate: string;
    deadline: string;
    status: 'PENDING' | 'UPLOADED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
    questionPaperId?: string;
    feedback?: string;
    createdAt: string;
  }
  
  // Paper Getter Types
  export interface PaperGetterProfile {
    id: string;
    userId: string;
    institutionName: string;
    branch: string;
    isVerified: boolean;
  }
  
  export interface PaperRequest {
    id: string;
    paperGetterId: string;
    course: string;
    branch: string;
    subject: string;
    syllabus: string;
    difficultyLevel: 'HARD' | 'MEDIUM' | 'LOW';
    numberOfSets: number;
    modelPaper: string;
    examDate: string;
    examTime: string;
    selectedPaperSetterId?: string;
    status: 'PENDING' | 'ASSIGNED' | 'COMPLETED';
    createdAt: string;
  }
  
  // Admin Types
  export interface AdminProfile {
    id: string;
    userId: string;
    isVerified: boolean;
  }
  
  // Question Paper Types
  export interface QuestionPaper {
    id: string;
    paperSetterId: string;
    assignmentId: string;
    fileUrl: string;
    uploadedAt: string;
    expertReview?: ExpertReview;
    status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
    feedback?: string;
  }
  
  export interface ExpertReview {
    id: string;
    expertId: string;
    questionPaperId: string;
    rating: number;
    feedback: string;
    reviewedAt: string;
  }
  
  // Subject Expert Types
  export interface SubjectExpert {
    id: string;
    name: string;
    email: string;
    subjects: string[];
    institution: string;
    isActive: boolean;
  }