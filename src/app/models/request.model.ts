export interface Request {
  _id: string;
  elderEmail: string;
  caregiverEmail: string;
  startDate: Date;
  stopDate: Date;
  requireInterview: boolean;
  status: boolean;
  rejectionReason: string;
}
