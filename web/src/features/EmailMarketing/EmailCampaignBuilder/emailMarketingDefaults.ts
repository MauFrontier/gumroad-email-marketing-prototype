import {v4 as uuid} from 'uuid';
import {
  DateFilter,
  LocationFilter,
  Operand,
  PaymentFilter,
  ProductFilter,
  SegmentationFilter,
  SegmentationFilterGroup,
  SegmentationFilterSubject,
  SegmentationFilterSubjectQualifier,
  SegmentationFilterValueType,
  SegmentationFilterVerb,
  SegmentationFilterVerbQualifier,
} from './emailMarketingTypes';

export const defaultFilterGroup: SegmentationFilterGroup = {
  id: uuid(),
  operand: Operand.And,
  filters: [],
};

export const defaultDateFilter: DateFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: SegmentationFilterSubject.Date,
  subjectQualifier: SegmentationFilterSubjectQualifier.Purchased,
  verb: SegmentationFilterVerb.IsBefore,
  value: new Date().toISOString(),
};

export const defaultProductFilter: ProductFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: SegmentationFilterSubject.Product,
  verb: SegmentationFilterVerb.HasBought,
  verbQualifier: SegmentationFilterVerbQualifier.Any,
  value: [],
};

export const defaultPaymentFilter: PaymentFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: SegmentationFilterSubject.Payment,
  verb: SegmentationFilterVerb.IsMoreThan,
  value: 0,
};

export const defaultLocationFilter: LocationFilter = {
  id: uuid(),
  operand: Operand.And,
  subject: SegmentationFilterSubject.Location,
  verb: SegmentationFilterVerb.Is,
  value: 'US',
};

export const defaultFilter: SegmentationFilter = {
  ...defaultDateFilter,
};

export const getDefaultFilterForSubject = (
  subject: SegmentationFilterSubject,
): SegmentationFilter => {
  switch (subject) {
    case SegmentationFilterSubject.Date:
      return {...defaultDateFilter};
    case SegmentationFilterSubject.Product:
      return {...defaultProductFilter};
    case SegmentationFilterSubject.Payment:
      return {...defaultPaymentFilter};
    case SegmentationFilterSubject.Location:
      return {...defaultLocationFilter};
    default:
      return {...defaultFilter};
  }
};

type VerbDefaults = {
  [K in SegmentationFilterVerb]?: SegmentationFilterValueType;
};

export const getDefaultValueForVerb = (
  verb: SegmentationFilterVerb,
): SegmentationFilterValueType => {
  const defaults: VerbDefaults = {
    [SegmentationFilterVerb.IsInTheLast]: 30,
    [SegmentationFilterVerb.IsBefore]: new Date().toISOString(),
    [SegmentationFilterVerb.IsAfter]: new Date().toISOString(),
  };

  return defaults[verb] ?? '';
};
