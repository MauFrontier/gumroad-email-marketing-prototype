import {
  Operand,
  Targeting,
  TargetingFilter,
  TargetingFilterGroup,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
  TriggerType,
} from '../shared/emailMarketingTypes';

export interface EmailMarketingState {
  targeting: Targeting;
  selectedTrigger: TriggerType;
}

export enum EmailMarketingActionType {
  SetTargeting = 'SetTargeting',
  AddFilterGroup = 'AddFilterGroup',
  DeleteFilterGroup = 'DeleteFilterGroup',
  SetFilterGroupOperand = 'SetFilterGroupOperand',
  AddFilter = 'AddFilter',
  SelectTrigger = 'SelectTrigger',
}

export type EmailMarketingAction =
  | {type: EmailMarketingActionType.SetTargeting; payload: Targeting}
  | {
      type: EmailMarketingActionType.AddFilterGroup;
      payload: TargetingFilterGroup;
    }
  | {type: EmailMarketingActionType.DeleteFilterGroup; payload: string}
  | {
      type: EmailMarketingActionType.SetFilterGroupOperand;
      payload: {
        filterGroupId: string;
        operand: Operand;
      };
    }
  | {
      type: EmailMarketingActionType.AddFilter;
      payload: {filterGroupId: string; filter: TargetingFilter};
    }
  | {type: EmailMarketingActionType.SelectTrigger; payload: TriggerType}
