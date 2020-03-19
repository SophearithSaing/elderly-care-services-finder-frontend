export interface Request {
  _id: string;
  elderEmail: string;
  elderName: string;
  caregiverEmail: string;
  caregiverName: string;
  startDate: Date;
  stopDate: Date;
  requireInterview: boolean;
  status: boolean;
  rejectionReason: string;
  dateSent: Date;
  selectedServices: any;
  selectedDP: number;
  selectedMP: number;
}
