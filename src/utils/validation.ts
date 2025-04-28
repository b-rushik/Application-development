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
  email: emailSchema,
  password: passwordSchema,
  countryCode: z.string().min(1, 'Country code is required'),
  mobileNumber: mobileSchema,
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
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