export interface SelectedSlot {
  day: string;
  date: string;
  time: string;
  type: 'Casting' | 'Testing' | 'Overnight';
}

export interface FormData {
  name: string;
  prn: string;
  contact: string;
  email: string;
  supervisor: string;
  supervisorEmail: string;
  researcherType: string;
  workDescription: string;
  equipment: string;
  hasSpecialConditions: 'Yes' | 'No';
  specialConditionTypes: string[];
  otherSpecialCondition: string;
  specialInstructions: string;
  // New fields for Consultancy
  consultantClientName?: string;
  consultantProjectTitle?: string;
  consultantAmountPaid?: string;
  consultantTransactionNo?: string;
  consultantTransactionDate?: string;
}

export enum ApprovalStatus {
  PENDING_SUPERVISOR,
  PENDING_INCHARGE,
  PENDING_HOD,
  APPROVED,
  REJECTED,
}

export interface Approver {
  name: string;
  email: string;
  website?: string;
}