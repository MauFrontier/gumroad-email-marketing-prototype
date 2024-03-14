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
  TriggerType,
} from '../shared/emailMarketingTypes';
import {EmailMarketingState} from './emailMarketingStoreTypes';
import mockData_targeting from './defaultTargeting.json';

export const emailMarketingInitialState: EmailMarketingState = {
  targeting: mockData_targeting as Targeting,
  selectedTrigger: TriggerType.Purchase,
  showGenerateWithAIPanel: false,
  isAILoading: false,
  showAIAccuracyWarning: false,
  showAIErrorsWarning: false,
  aiErrors: [],
  latestAIPrompt: '',
  latestAIResponse: '',
  showDevTools: false,
};

export const initialDateFilter: DateFilter = {
  id: 'id_initialDateFilter',
  subject: TargetingFilterSubject.Date,
  subjectQualifier: TargetingFilterSubjectQualifier.Joined,
  verb: TargetingFilterVerb.IsAfter,
  value: '2022-01-01',
};

export const initialPaymentFilter: PaymentFilter = {
  id: 'id_initialPaymentFilter',
  subject: TargetingFilterSubject.Payment,
  verb: TargetingFilterVerb.IsLessThan,
  value: 10,
};

export const initialProductFilter: ProductFilter = {
  id: 'id_initialProductFilter',
  subject: TargetingFilterSubject.Product,
  verb: TargetingFilterVerb.HasBought,
  verbQualifier: TargetingFilterVerbQualifier.All,
  value: ['product1'],
};

export const initialLocationFilter: LocationFilter = {
  id: 'id_initialLocationFilter',
  subject: TargetingFilterSubject.Location,
  verb: TargetingFilterVerb.IsNot,
  value: 'US',
};

export const initialFilterGroup1 = {
  id: 'id_group1',
  filters: [initialDateFilter, {...initialProductFilter, operand: Operand.And}],
};

export const initialFilterGroup2 = {
  id: 'id_group2',
  filters: [
    initialPaymentFilter,
    {...initialLocationFilter, operand: Operand.Or},
  ],
};

export const initialTargeting: Targeting = {
  filterGroups: [
    initialFilterGroup1,
    {...initialFilterGroup2, operand: Operand.Or},
  ],
};

export const modifiedEmailMarketingState: EmailMarketingState = {
  ...emailMarketingInitialState,
  targeting: initialTargeting,
};

export const newDateFilter: DateFilter = {
  id: 'id_dateFilter',
  subject: TargetingFilterSubject.Date,
  subjectQualifier: TargetingFilterSubjectQualifier.Purchased,
  verb: TargetingFilterVerb.IsBefore,
  value: '2021-01-01',
};

export const newPaymentFilter: PaymentFilter = {
  id: 'id_paymentFilter',
  subject: TargetingFilterSubject.Payment,
  verb: TargetingFilterVerb.IsMoreThan,
  value: 50,
};

export const newProductFilter: ProductFilter = {
  id: 'id_productFilter',
  subject: TargetingFilterSubject.Product,
  verb: TargetingFilterVerb.HasBought,
  verbQualifier: TargetingFilterVerbQualifier.Any,
  value: ['product1', 'product2'],
};

export const newLocationFilter: LocationFilter = {
  id: 'id_locationFilter',
  subject: TargetingFilterSubject.Location,
  verb: TargetingFilterVerb.Is,
  value: 'CR',
};

export const newFilterGroup1 = {
  id: 'id_group1',
  filters: [newDateFilter, {...newPaymentFilter, operand: Operand.And}],
};

export const newFilterGroup2 = {
  id: 'id_group2',
  filters: [newLocationFilter, {...newProductFilter, operand: Operand.Or}],
};

export const newTargeting: Targeting = {
  filterGroups: [newFilterGroup1, {...newFilterGroup2, operand: Operand.Or}],
};
