export interface Request {
  _id: string;
  caregiverEmail: string;
  caregiverName: string;
  caregiverPhoneNumber: string;
  caregiverAge: number;
  elderEmail: string;
  elderName: string;
  elderPhoneNumber: string;
  elderAge: number;
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
