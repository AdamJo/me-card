export interface Card {
  cardType: string;
  cardName: string;
  displayName: string;
  company?: string;
  email?: string;
  // resume: boolean;
  firstName?: string;
  lastName?: string;
  extension?: number;
  address?: string;
  description?: string;
  mobileNumber?: number;
  workNumber?: number;
  personalNumber?: number;
  faxNumber?: number;
  position?: string;
  tools?: string[];
  website?: string;
}
