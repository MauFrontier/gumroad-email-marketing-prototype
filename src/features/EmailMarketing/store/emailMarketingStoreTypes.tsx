import {
  Operand,
  Targeting,
  TargetingFilter,
  TargetingFilterGroup,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
} from '../shared/emailMarketingTypes';

export interface EmailMarketingState {
  targeting: Targeting;
}

export enum EmailMarketingActionType {
  SetTargeting = 'SetTargeting',
  AddFilterGroup = 'AddFilterGroup',
}

export type EmailMarketingAction =
  | {type: EmailMarketingActionType.SetTargeting; payload: Targeting}
  | {
      type: EmailMarketingActionType.AddFilterGroup;
      payload: TargetingFilterGroup;
    }
