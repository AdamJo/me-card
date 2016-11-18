export interface Card {
  typeName: string;
  resume: boolean;
  displayName?: string;
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
  tools: string[];
}
