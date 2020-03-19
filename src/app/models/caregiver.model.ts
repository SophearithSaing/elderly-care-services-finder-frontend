export interface Caregiver {
  _id: string;
  name: string;
  email: string;
  birthDate: Date;
  gender: string;
  houseNumber: string;
  street: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  phoneNumber: string;
  services: any;
  certificate: string;
  experience: Array<any>;
  dailyPrice: number;
  monthlyPrice: number;
  imagePath: string;
  schedule: Array<any>;
  approval: boolean;
}
