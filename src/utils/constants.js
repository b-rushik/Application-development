export const USER_ROLES = {
    PAPER_SETTER: 'PAPER_SETTER',
    PAPER_GETTER: 'PAPER_GETTER',
    ADMIN: 'ADMIN',
    SUPER_USER: 'SUPER_USER'
  };
  
  export const DIFFICULTY_LEVELS = {
    HARD: 'HARD',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW'
  };
  
  export const DIFFICULTY_MAPPING = {
    [DIFFICULTY_LEVELS.HARD]: 'Professors from IIT/NIT',
    [DIFFICULTY_LEVELS.MEDIUM]: 'Professors from Central or State Universities',
    [DIFFICULTY_LEVELS.LOW]: 'People from Autonomous or Affiliated Colleges'
  };
  
  export const PAPER_STATUS = {
    PENDING: 'PENDING',
    UNDER_REVIEW: 'UNDER_REVIEW',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
  };
  
  export const APPROVAL_THRESHOLD = 70;