export enum SegmentationFilterVerbQualifier {
  Any = 'Any',
  All = 'All',
}

export enum SegmentationFilterVerb {
  Is = 'Is',
  IsNot = 'Is not',
  HasBought = 'Has bought',
  HasNotYetBought = 'Has not yet bought',
  IsMoreThan = 'Is more than',
  IsLessThan = 'Is less than',
  IsInTheLast = 'Is in the last',
  IsAfter = 'Is after',
  IsBefore = 'Is before',
}

export enum SegmentationFilterSubjectQualifier {
  Purchased = 'Purchased',
  Joined = 'Joined',
}

export enum SegmentationFilterSubject {
  Date = 'Date',
  Product = 'Product',
  Payment = 'Payment',
  Location = 'Location',
}

export enum Operand {
  And = 'And',
  Or = 'Or',
  Initial = 'Initial',
}

export type SegmentationFilterValueType = string | number | string[];

export type DateFilter = {
  id: string;
  operand?: Operand;
  subject: SegmentationFilterSubject.Date;
  subjectQualifier: SegmentationFilterSubjectQualifier;
  verb:
    | SegmentationFilterVerb.Is
    | SegmentationFilterVerb.IsNot
    | SegmentationFilterVerb.IsAfter
    | SegmentationFilterVerb.IsBefore
    | SegmentationFilterVerb.IsInTheLast;
  value: string | number;
};

export type ProductFilter = {
  id: string;
  operand?: Operand;
  subject: SegmentationFilterSubject.Product;
  verb:
    | SegmentationFilterVerb.HasBought
    | SegmentationFilterVerb.HasNotYetBought;
  verbQualifier: SegmentationFilterVerbQualifier;
  value: string[];
};

export type PaymentFilter = {
  id: string;
  operand?: Operand;
  subject: SegmentationFilterSubject.Payment;
  verb:
    | SegmentationFilterVerb.Is
    | SegmentationFilterVerb.IsNot
    | SegmentationFilterVerb.IsMoreThan
    | SegmentationFilterVerb.IsLessThan;
  value: number;
};

export type LocationFilter = {
  id: string;
  operand?: Operand;
  subject: SegmentationFilterSubject.Location;
  verb: SegmentationFilterVerb.Is | SegmentationFilterVerb.IsNot;
  value: string;
};

export type SegmentationFilter =
  | DateFilter
  | ProductFilter
  | PaymentFilter
  | LocationFilter;

export type SegmentationFilterGroup = {
  id: string;
  operand?: Operand;
  filters: SegmentationFilter[];
};

export type Segmentation = {
  filterGroups: SegmentationFilterGroup[];
};

export enum AudienceType {
  Everyone = 'Everyone',
  Customers = 'Customers',
  Followers = 'Followers',
  Affiliates = 'Affiliates',
}

export type ErrorWarning = {
  id: string;
  isVisible: boolean;
  error: string;
};

export type AIResponse = {
  result: 'success' | 'success with errors' | 'failure';
  payload: Segmentation;
  errors: string[];
};

export enum Channels {
  Email = 'Email',
  EmailAndProfile = 'Email and Profile',
}
