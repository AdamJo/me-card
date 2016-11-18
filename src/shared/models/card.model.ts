export interface Card {
  cardTypeName: string;
  resume: boolean;
  firstName?: string;
  lastName?: string;
  displayName: string;
  company?: string;
  extension?: number;
  email?: string;
  address?: string;
  description?: string;
  mobileNumber?: number;
  workNumber?: number;
  personalNumber?: number;
  faxNumber?: number;
  position?: string;
  tools?: string[];
}
