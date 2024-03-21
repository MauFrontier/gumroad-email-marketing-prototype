import {
  DateFilter,
  LocationFilter,
  Operand,
  PaymentFilter,
  ProductFilter,
  Targeting,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
} from '../WorkflowBuilder/emailMarketingTypes';
import {emailMarketingInitialState} from './emailMarketingInitialState';
import {EmailMarketingState} from './emailMarketingActionTypes';

export const dateFilterForTests: DateFilter = {
  id: 'id_initialDateFilter',
  subject: TargetingFilterSubject.Date,
  subjectQualifier: TargetingFilterSubjectQualifier.Joined,
  verb: TargetingFilterVerb.IsAfter,
  value: '2022-01-01T00:00:00.000Z',
};

export const paymentFilterForTests: PaymentFilter = {
  id: 'id_initialPaymentFilter',
  subject: TargetingFilterSubject.Payment,
  verb: TargetingFilterVerb.IsLessThan,
  value: 10,
};

export const productFilterForTests: ProductFilter = {
  id: 'id_initialProductFilter',
  subject: TargetingFilterSubject.Product,
  verb: TargetingFilterVerb.HasBought,
  verbQualifier: TargetingFilterVerbQualifier.All,
  value: ['Christmas bundle'],
};

export const locationFilterForTests: LocationFilter = {
  id: 'id_initialLocationFilter',
  subject: TargetingFilterSubject.Location,
  verb: TargetingFilterVerb.IsNot,
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

export const targetingForTests: Targeting = {
  filterGroups: [
    filterGroupForTests1,
    {...filterGroupForTests2, operand: Operand.Or},
  ],
};

export const emailMarketingStateForTests: EmailMarketingState = {
  ...emailMarketingInitialState,
  targeting: targetingForTests,
};

export const newDateFilterForTests: DateFilter = {
  id: 'id_dateFilter',
  subject: TargetingFilterSubject.Date,
  subjectQualifier: TargetingFilterSubjectQualifier.Purchased,
  verb: TargetingFilterVerb.IsBefore,
  value: '2021-01-01T00:00:00.000Z',
};

export const newPaymentFilterForTests: PaymentFilter = {
  id: 'id_paymentFilter',
  subject: TargetingFilterSubject.Payment,
  verb: TargetingFilterVerb.IsMoreThan,
  value: 50,
};

export const newProductFilterForTests: ProductFilter = {
  id: 'id_productFilter',
  subject: TargetingFilterSubject.Product,
  verb: TargetingFilterVerb.HasBought,
  verbQualifier: TargetingFilterVerbQualifier.Any,
  value: ['New tutorial', 'Pro video course'],
};

export const newLocationFilterForTests: LocationFilter = {
  id: 'id_locationFilter',
  subject: TargetingFilterSubject.Location,
  verb: TargetingFilterVerb.Is,
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

export const newTargetingForTests: Targeting = {
  filterGroups: [
    newFilterGroupForTests1,
    {...newFilterGroupForTests2, operand: Operand.Or},
  ],
};
