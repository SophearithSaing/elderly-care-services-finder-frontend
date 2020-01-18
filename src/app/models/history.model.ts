export interface History {
  _id: string;
  elderEmail: string;
  caregiverEmail: string;
  startDate: Date;
  stopDate: Date;
  requireInterview: boolean;
  rating: number;
  review: string;
}
