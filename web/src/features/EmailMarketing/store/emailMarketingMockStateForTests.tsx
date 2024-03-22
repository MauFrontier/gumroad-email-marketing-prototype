import {
  DateFilter,
  LocationFilter,
  Operand,
  PaymentFilter,
  ProductFilter,
  Segmentation,
  SegmentationFilterSubject,
  SegmentationFilterSubjectQualifier,
  SegmentationFilterVerb,
  SegmentationFilterVerbQualifier,
} from '../EmailCampaignBuilder/emailMarketingTypes';
import {emailMarketingInitialState} from './emailMarketingInitialState';
import {EmailMarketingState} from './emailMarketingActionTypes';

export const dateFilterForTests: DateFilter = {
  id: 'id_initialDateFilter',
  subject: SegmentationFilterSubject.Date,
  subjectQualifier: SegmentationFilterSubjectQualifier.Joined,
  verb: SegmentationFilterVerb.IsAfter,
  value: '2022-01-01T00:00:00.000Z',
};

export const paymentFilterForTests: PaymentFilter = {
  id: 'id_initialPaymentFilter',
  subject: SegmentationFilterSubject.Payment,
  verb: SegmentationFilterVerb.IsLessThan,
  value: 10,
};

export const productFilterForTests: ProductFilter = {
  id: 'id_initialProductFilter',
  subject: SegmentationFilterSubject.Product,
  verb: SegmentationFilterVerb.HasBought,
  verbQualifier: SegmentationFilterVerbQualifier.All,
  value: ['Christmas bundle'],
};

export const locationFilterForTests: LocationFilter = {
  id: 'id_initialLocationFilter',
  subject: SegmentationFilterSubject.Location,
  verb: SegmentationFilterVerb.IsNot,
  value: 'US',
};

export const filterGroupForTests1 = {
  id: 'id_group1',
  filters: [
    dateFilterForTests,
    {...productFilterForTests, operand: Operand.And},
  ],
};

export const filterGroupForTests2 = {
  id: 'id_group2',
  filters: [
    paymentFilterForTests,
    {...locationFilterForTests, operand: Operand.Or},
  ],
};

export const segmentationForTests: Segmentation = {
  filterGroups: [
    filterGroupForTests1,
    {...filterGroupForTests2, operand: Operand.Or},
  ],
};

export const emailMarketingStateForTests: EmailMarketingState = {
  ...emailMarketingInitialState,
  segmentation: segmentationForTests,
};

export const newDateFilterForTests: DateFilter = {
  id: 'id_dateFilter',
  subject: SegmentationFilterSubject.Date,
  subjectQualifier: SegmentationFilterSubjectQualifier.Purchased,
  verb: SegmentationFilterVerb.IsBefore,
  value: '2021-01-01T00:00:00.000Z',
};

export const newPaymentFilterForTests: PaymentFilter = {
  id: 'id_paymentFilter',
  subject: SegmentationFilterSubject.Payment,
  verb: SegmentationFilterVerb.IsMoreThan,
  value: 50,
};

export const newProductFilterForTests: ProductFilter = {
  id: 'id_productFilter',
  subject: SegmentationFilterSubject.Product,
  verb: SegmentationFilterVerb.HasBought,
  verbQualifier: SegmentationFilterVerbQualifier.Any,
  value: ['New tutorial', 'Pro video course'],
};

export const newLocationFilterForTests: LocationFilter = {
  id: 'id_locationFilter',
  subject: SegmentationFilterSubject.Location,
  verb: SegmentationFilterVerb.Is,
  value: 'CR',
};

export const newFilterGroupForTests1 = {
  id: 'id_group1',
  filters: [
    newDateFilterForTests,
    {...newPaymentFilterForTests, operand: Operand.And},
  ],
};

export const newFilterGroupForTests2 = {
  id: 'id_group2',
  filters: [
    newLocationFilterForTests,
    {...newProductFilterForTests, operand: Operand.Or},
  ],
};

export const newSegmentationForTests: Segmentation = {
  filterGroups: [
    newFilterGroupForTests1,
    {...newFilterGroupForTests2, operand: Operand.Or},
  ],
};
