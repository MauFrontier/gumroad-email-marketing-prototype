import {KeyValuePair} from '../../shared/sharedTypes';
import {
  AIResponse,
  ErrorWarning,
  Operand,
  Targeting,
  TargetingFilter,
  TargetingFilterGroup,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
  AudienceType,
  Channels,
} from '../WorkflowBuilder/emailMarketingTypes';

export interface EmailMarketingState {
  targeting: Targeting;
  selectedAudience: AudienceType;
  products: KeyValuePair[];
  showGenerateWithAIPanel: boolean;
  prompt: string;
  isAILoading: boolean;
  showAIAccuracyWarning: boolean;
  votedAIAccuracyUp: boolean;
  votedAIAccuracyDown: boolean;
  aiErrors: ErrorWarning[];
  latestAIPrompt: string;
  latestAIResponse: AIResponse | string;
  channel: Channels;
  allowComments: boolean;
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
  SelectAudience = 'SelectAudience',
  SetProducts = 'SetProducts',
  ToggleShowGenerateWithAIPanel = 'ToggleGenerateWithAIPanel',
  SetPrompt = 'SetPrompt',
  SetIsAILoading = 'SetIsAILoading',
  SetShowAIAccuracyWarning = 'SetShowAIAccuracyWarning',
  SetVotedAIAccuracyUp = 'SetVotedAIAccuracyUp',
  SetVotedAIAccuracyDown = 'SetVotedAIAccuracyDown',
  SetAIErrors = 'SetAIErrors',
  SetErrorVisibility = 'SetErrorVisibility',
  SetLatestAIPrompt = 'SetLatestAIPrompt',
  SetLatestAIResponse = 'SetLatestAIResponse',
  SetChannel = 'SetChannel',
  SetAllowComments = 'SetAllowComments',
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
  | {type: EmailMarketingActionType.SelectAudience; payload: AudienceType}
  | {type: EmailMarketingActionType.SetProducts; payload: KeyValuePair[]}
  | {type: EmailMarketingActionType.ToggleShowGenerateWithAIPanel}
  | {type: EmailMarketingActionType.SetPrompt; payload: string}
  | {type: EmailMarketingActionType.SetIsAILoading; payload: boolean}
  | {type: EmailMarketingActionType.SetShowAIAccuracyWarning; payload: boolean}
  | {type: EmailMarketingActionType.SetVotedAIAccuracyUp; payload: boolean}
  | {type: EmailMarketingActionType.SetVotedAIAccuracyDown; payload: boolean}
  | {type: EmailMarketingActionType.SetAIErrors; payload: ErrorWarning[]}
  | {
      type: EmailMarketingActionType.SetErrorVisibility;
      payload: {
        id: string;
        isVisible: boolean;
      };
    }
  | {type: EmailMarketingActionType.SetLatestAIPrompt; payload: string}
  | {
      type: EmailMarketingActionType.SetLatestAIResponse;
      payload: AIResponse | string;
    }
  | {type: EmailMarketingActionType.SetChannel; payload: Channels}
  | {type: EmailMarketingActionType.SetAllowComments; payload: boolean};
