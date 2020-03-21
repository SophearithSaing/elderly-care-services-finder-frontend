export interface History {
  _id: string;
  elderEmail: string;
  elderName: string;
  caregiverEmail: string;
  caregiverName: string;
  startDate: Date;
  stopDate: Date;
  requireInterview: boolean;
  rating: number;
  review: string;
  dailyPrice: number;
  monthyPrice: number;
  services: Array<any>;
}
