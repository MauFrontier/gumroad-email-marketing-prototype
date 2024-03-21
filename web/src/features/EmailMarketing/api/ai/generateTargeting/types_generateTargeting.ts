export default `export enum TargetingFilterVerbQualifier {
  Any = 'Any',
  All = 'All',
}

export enum TargetingFilterVerb {
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

export enum TargetingFilterSubjectQualifier {
  Purchased = 'Purchased',
  Joined = 'Joined',
}

export enum TargetingFilterSubject {
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

export type TargetingFilterValueType = string | number | string[];

export type DateFilter = {
  id: string;
  operand?: Operand;
  subject: TargetingFilterSubject.Date;
  subjectQualifier: TargetingFilterSubjectQualifier;
  verb:
    | TargetingFilterVerb.Is
    | TargetingFilterVerb.IsNot
    | TargetingFilterVerb.IsAfter
    | TargetingFilterVerb.IsBefore
    | TargetingFilterVerb.IsInTheLast;
  value: string | number;
};

export type ProductFilter = {
  id: string;
  operand?: Operand;
  subject: TargetingFilterSubject.Product;
  verb: TargetingFilterVerb.HasBought | TargetingFilterVerb.HasNotYetBought;
  verbQualifier: TargetingFilterVerbQualifier;
  value: string[];
};

export type PaymentFilter = {
  id: string;
  operand?: Operand;
  subject: TargetingFilterSubject.Payment;
  verb:
    | TargetingFilterVerb.Is
    | TargetingFilterVerb.IsNot
    | TargetingFilterVerb.IsMoreThan
    | TargetingFilterVerb.IsLessThan;
  value: number;
};

export type LocationFilter = {
  id: string;
  operand?: Operand;
  subject: TargetingFilterSubject.Location;
  verb: TargetingFilterVerb.Is | TargetingFilterVerb.IsNot;
  value: string;
};

export type TargetingFilter =
  | DateFilter
  | ProductFilter
  | PaymentFilter
  | LocationFilter;

export type TargetingFilterGroup = {
  id: string;
  operand?: Operand;
  filters: TargetingFilter[];
};

export type Targeting = {
  filterGroups: TargetingFilterGroup[];
};

export enum TriggerType {
  Purchase = 'Purchase',
  NewSubscriber = 'New Subscriber',
  MemberCancels = 'Member cancels',
  NewAffiliate = 'New affiliate',
}
`;
