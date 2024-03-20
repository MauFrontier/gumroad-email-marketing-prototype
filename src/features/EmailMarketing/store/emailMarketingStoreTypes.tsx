import {
  ErrorWarning,
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
  showGenerateWithAIPanel: boolean;
  prompt: string;
  isAILoading: boolean;
  aiErrors: ErrorWarning[];
}

export enum EmailMarketingActionType {
  SetTargeting = 'SetTargeting',
  AddFilterGroup = 'AddFilterGroup',
  DeleteFilterGroup = 'DeleteFilterGroup',
  SetFilterGroupOperand = 'SetFilterGroupOperand',
  AddFilter = 'AddFilter',
  DeleteFilter = 'DeleteFilter',
  SetFilterOperand = 'SetFilterOperand',
  SetFilterSubject = 'SetFilterSubject',
  SetFilterSubjectQualifier = 'SetFilterSubjectQualifier',
  SetFilterVerb = 'SetFilterVerb',
  SetFilterVerbQualifier = 'SetFilterVerbQualifier',
  SetFilterValue = 'SetFilterValue',
  SelectTrigger = 'SelectTrigger',
  ToggleShowGenerateWithAIPanel = 'ToggleGenerateWithAIPanel',
  SetPrompt = 'SetPrompt',
  SetIsAILoading = 'SetIsAILoading',
  SetAIErrors = 'SetAIErrors',
  SetErrorVisibility = 'SetErrorVisibility',
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
  | {type: EmailMarketingActionType.DeleteFilter; payload: string}
  | {
      type: EmailMarketingActionType.SetFilterOperand;
      payload: {
        filterId: string;
        operand: Operand;
      };
    }
  | {
      type: EmailMarketingActionType.SetFilterSubject;
      payload: {
        filterId: string;
        subject: TargetingFilterSubject;
      };
    }
  | {
      type: EmailMarketingActionType.SetFilterSubjectQualifier;
      payload: {
        filterId: string;
        subjectQualifier: TargetingFilterSubjectQualifier;
      };
    }
  | {
      type: EmailMarketingActionType.SetFilterVerb;
      payload: {
        filterId: string;
        verb: TargetingFilterVerb;
      };
    }
  | {
      type: EmailMarketingActionType.SetFilterVerbQualifier;
      payload: {
        filterId: string;
        verbQualifier: TargetingFilterVerbQualifier;
      };
    }
  | {
      type: EmailMarketingActionType.SetFilterValue;
      payload: {
        filterId: string;
        value: string | number | string[];
      };
    }
  | {type: EmailMarketingActionType.SelectTrigger; payload: TriggerType}
  | {type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel}
  | {type: EmailMarketingActionType.SetPrompt; payload: string}
  | {type: EmailMarketingActionType.SetIsAILoading; payload: boolean}
  | {type: EmailMarketingActionType.SetShowAIAccuracyWarning; payload: boolean}
  | {type: EmailMarketingActionType.SetAIErrors; payload: ErrorWarning[]}
  | {
      type: EmailMarketingActionType.SetErrorVisibility;
      payload: {
        id: string;
        isVisible: boolean;
      };
    }
