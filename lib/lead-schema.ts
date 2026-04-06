import { z } from 'zod';

export const LeadSchema = z.object({
  formType:               z.string().min(1).max(50),
  name:                   z.string().max(100).optional(),
  firstName:              z.string().max(50).optional(),
  lastName:               z.string().max(50).optional(),
  email:                  z.union([z.string().email(), z.literal('')]).optional(),
  phone:                  z.string().max(20).optional(),
  companyName:            z.string().max(100).optional(),
  teamSize:               z.string().max(50).optional(),
  zipCode:                z.string().max(10).optional(),
  mainIssue:              z.string().max(200).optional(),
  computerType:           z.string().max(50).optional(),
  deviceType:             z.string().max(50).optional(),
  workLocation:           z.string().max(100).optional(),
  startTime:              z.string().max(50).optional(),
  message:                z.string().max(2000).optional(),
  securityConcerns:       z.string().max(2000).optional(),
  hasSecurityTeam:        z.string().max(10).optional(),
  sensitiveDataAccess:    z.string().max(10).optional(),
  securityIncidents:      z.string().max(10).optional(),
  complianceRequirements: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;
