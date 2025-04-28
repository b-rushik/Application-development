import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(4, 'Password must be between 4-20 characters')
  .max(20, 'Password must be between 4-20 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one special character'
  );

export const emailSchema = z.string().email('Please enter a valid email address');

export const mobileSchema = z
  .string()
  .min(10, 'Mobile number must be at least 10 digits')
  .regex(/^\d+$/, 'Mobile number must contain only digits');

const baseSignupSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  password: passwordSchema,
  countryCode: z.string().min(1, 'Country code is required'),
  mobileNumber: mobileSchema,
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export const paperSetterSignupSchema = baseSignupSchema.extend({
  email: emailSchema.refine(
    (email) => email.endsWith('.edu') || email.includes('college') || email.includes('university'),
    { message: 'Please use a college or university email' }
  ),
});

export const paperGetterSignupSchema = baseSignupSchema.extend({
  email: emailSchema.refine(
    (email) => email.includes('exam') || email.includes('college') || email.includes('university'),
    { message: 'Please use an exam cell email' }
  ),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const paperSetterDetailsSchema = z.object({
  organization: z.enum(['IIT/NIT', 'Central/State University', 'Autonomous/Affiliated College']),
  collegeName: z.string().min(2, 'College name is required'),
  branch: z.string().min(2, 'Branch is required'),
  subjectsOfExpertise: z.array(z.string()).min(1, 'At least one subject is required'),
  proficiencyLevels: z.array(
    z.object({
      subject: z.string(),
      level: z.enum(['Beginner', 'Intermediate', 'Expert']),
    })
  ),
  experience: z.array(
    z.object({
      subject: z.string(),
      years: z.number().min(3).max(6),
    })
  ),
  overallExperience: z.number().min(1, 'Overall experience is required'),
});

export const paperRequestSchema = z.object({
  course: z.string().min(2, 'Course is required'),
  branch: z.string().min(2, 'Branch is required'),
  subject: z.string().min(2, 'Subject is required'),
  difficultyLevel: z.enum(['High', 'Medium', 'Low']),
  numberOfSets: z.enum(['1', '2', '3', '4']),
  examDate: z.string().min(2, 'Exam date is required'),
  examTime: z.string().min(2, 'Exam time is required'),
  syllabusFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Syllabus file is required')
    .refine(
      (file) => file.type === 'application/pdf',
      'Only PDF files are allowed'
    ),
  modelPaperFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Model paper file is required')
    .refine(
      (file) => file.type === 'application/pdf',
      'Only PDF files are allowed'
    ),
  selectedFaculty: z.string().min(1, 'Please select a faculty member'),
});