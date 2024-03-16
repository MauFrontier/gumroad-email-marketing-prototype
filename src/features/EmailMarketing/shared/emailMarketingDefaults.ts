import {v4 as uuid} from 'uuid';
import {
  DateFilter,
  LocationFilter,
  Operand,
  PaymentFilter,
  ProductFilter,
  TargetingFilter,
  TargetingFilterGroup,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterValueType,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
} from './emailMarketingTypes';

export const defaultFilterGroup: TargetingFilterGroup = {
  id: uuid(),
  operand: Operand.And,
  filters: [],
};

export const defaultDateFilter: DateFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: TargetingFilterSubject.Date,
  subjectQualifier: TargetingFilterSubjectQualifier.Purchased,
  verb: TargetingFilterVerb.IsBefore,
  value: new Date().toISOString(),
};

export const defaultProductFilter: ProductFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: TargetingFilterSubject.Product,
  verb: TargetingFilterVerb.HasBought,
  verbQualifier: TargetingFilterVerbQualifier.Any,
  value: [],
};

export const defaultPaymentFilter: PaymentFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: TargetingFilterSubject.Payment,
  verb: TargetingFilterVerb.IsMoreThan,
  value: 0,
};

export const defaultLocationFilter: LocationFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: TargetingFilterSubject.Location,
  verb: TargetingFilterVerb.Is,
  value: 'US',
};

export const defaultFilter: TargetingFilter = {
  ...defaultDateFilter,
};

export const getDefaultFilterForSubject = (
  subject: TargetingFilterSubject,
): TargetingFilter => {
  switch (subject) {
    case TargetingFilterSubject.Date:
      return {...defaultDateFilter};
    case TargetingFilterSubject.Product:
      return {...defaultProductFilter};
    case TargetingFilterSubject.Payment:
      return {...defaultPaymentFilter};
    case TargetingFilterSubject.Location:
      return {...defaultLocationFilter};
    default:
      return {...defaultFilter};
  }
};

type VerbDefaults = {
  [K in TargetingFilterVerb]?: TargetingFilterValueType;
};

export const getDefaultValueForVerb = (
  verb: TargetingFilterVerb,
): TargetingFilterValueType => {
  const defaults: VerbDefaults = {
    [TargetingFilterVerb.IsInTheLast]: 30,
    [TargetingFilterVerb.IsBefore]: new Date().toISOString(),
    [TargetingFilterVerb.IsAfter]: new Date().toISOString(),
  };

  return defaults[verb] ?? '';
};
