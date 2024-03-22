import {
  SegmentationFilter,
  SegmentationFilterSubject,
  SegmentationFilterSubjectQualifier,
  SegmentationFilterValueType,
  SegmentationFilterVerb,
  SegmentationFilterVerbQualifier,
} from './emailMarketingTypes';
import {KeyValuePair} from '../../shared/sharedTypes';

export const getSubjectQualifierOptions = (
  subject: SegmentationFilterSubject,
) => {
  switch (subject) {
    case SegmentationFilterSubject.Date:
      return [
        {key: 'Purchased', value: SegmentationFilterSubjectQualifier.Purchased},
        {key: 'Joined', value: SegmentationFilterSubjectQualifier.Joined},
      ];
    default:
      return null;
  }
};

export const getVerbOptions = (
  subject: SegmentationFilterSubject,
): KeyValuePair[] => {
  switch (subject) {
    case SegmentationFilterSubject.Date:
      return [
        {key: SegmentationFilterVerb.Is, value: SegmentationFilterVerb.Is},
        {
          key: SegmentationFilterVerb.IsNot,
          value: SegmentationFilterVerb.IsNot,
        },
        {
          key: SegmentationFilterVerb.IsAfter,
          value: SegmentationFilterVerb.IsAfter,
        },
        {
          key: SegmentationFilterVerb.IsBefore,
          value: SegmentationFilterVerb.IsBefore,
        },
        {
          key: SegmentationFilterVerb.IsInTheLast,
          value: SegmentationFilterVerb.IsInTheLast,
        },
      ];
    case SegmentationFilterSubject.Product:
      return [
        {
          key: SegmentationFilterVerb.HasBought,
          value: SegmentationFilterVerb.HasBought,
        },
        {
          key: SegmentationFilterVerb.HasNotYetBought,
          value: SegmentationFilterVerb.HasNotYetBought,
        },
      ];
    case SegmentationFilterSubject.Payment:
      return [
        {key: SegmentationFilterVerb.Is, value: SegmentationFilterVerb.Is},
        {
          key: SegmentationFilterVerb.IsNot,
          value: SegmentationFilterVerb.IsNot,
        },
        {
          key: SegmentationFilterVerb.IsMoreThan,
          value: SegmentationFilterVerb.IsMoreThan,
        },
        {
          key: SegmentationFilterVerb.IsLessThan,
          value: SegmentationFilterVerb.IsLessThan,
        },
      ];
    case SegmentationFilterSubject.Location:
      return [
        {key: SegmentationFilterVerb.Is, value: SegmentationFilterVerb.Is},
        {
          key: SegmentationFilterVerb.IsNot,
          value: SegmentationFilterVerb.IsNot,
        },
      ];
    default:
      return [];
  }
};

export const getVerbQualifierOptions = (
  subject: SegmentationFilterSubject,
): KeyValuePair[] => {
  switch (subject) {
    case SegmentationFilterSubject.Product:
      return [
        {
          key: SegmentationFilterVerbQualifier.All,
          value: SegmentationFilterVerbQualifier.All,
        },
        {
          key: SegmentationFilterVerbQualifier.Any,
          value: SegmentationFilterVerbQualifier.Any,
        },
      ];
    default:
      return [];
  }
};

export const updateFilterVerb = (
  filter: SegmentationFilter,
  newVerb: SegmentationFilterVerb,
): SegmentationFilter => {
  const verbOptions = getVerbOptions(filter.subject);

  if (!verbOptions.find(verb => verb.value === newVerb)) {
    console.warn(
      `Verb "${newVerb}" is not valid for subject "${filter.subject}".`,
    );
    return filter;
  }

  switch (filter.subject) {
    case SegmentationFilterSubject.Date:
      return {
        ...filter,
        verb: newVerb as
          | SegmentationFilterVerb.IsAfter
          | SegmentationFilterVerb.IsBefore
          | SegmentationFilterVerb.IsInTheLast,
      };
    case SegmentationFilterSubject.Product:
      return {
        ...filter,
        verb: newVerb as
          | SegmentationFilterVerb.HasBought
          | SegmentationFilterVerb.HasNotYetBought,
      };
    case SegmentationFilterSubject.Payment:
      return {
        ...filter,
        verb: newVerb as
          | SegmentationFilterVerb.Is
          | SegmentationFilterVerb.IsNot
          | SegmentationFilterVerb.IsMoreThan
          | SegmentationFilterVerb.IsLessThan,
      };
    case SegmentationFilterSubject.Location:
      return {
        ...filter,
        verb: newVerb as
          | SegmentationFilterVerb.Is
          | SegmentationFilterVerb.IsNot,
      };
    default:
      return filter;
  }
};

export const updateFilterValue = (
  filter: SegmentationFilter,
  newValue: SegmentationFilterValueType,
): SegmentationFilter => {
  switch (filter.subject) {
    case SegmentationFilterSubject.Date:
      if (filter.verb === SegmentationFilterVerb.IsInTheLast) {
        if (typeof newValue === 'number') {
          return {...filter, value: newValue};
        }
      } else if (typeof newValue === 'string') {
        if (typeof newValue === 'string') {
          return {...filter, value: newValue};
        }
      }
      break;
    case SegmentationFilterSubject.Product:
      if (Array.isArray(newValue)) {
        return {...filter, value: newValue};
      }
      break;
    case SegmentationFilterSubject.Payment:
      if (typeof newValue === 'number') {
        return {...filter, value: newValue};
      }
      break;
    case SegmentationFilterSubject.Location:
      if (typeof newValue === 'string') {
        return {...filter, value: newValue};
      }
      break;
  }

  console.warn(`Invalid value type for subject ${filter.subject}:`, newValue);
  return filter; // Return the original filter if the value type is incorrect
};

export const shouldResetValue = (
  oldVerb: SegmentationFilterVerb,
  newVerb: SegmentationFilterVerb,
) =>
  (oldVerb === SegmentationFilterVerb.IsInTheLast &&
    (newVerb === SegmentationFilterVerb.Is ||
      newVerb === SegmentationFilterVerb.IsNot ||
      newVerb === SegmentationFilterVerb.IsBefore ||
      newVerb === SegmentationFilterVerb.IsAfter)) ||
  ((oldVerb === SegmentationFilterVerb.IsBefore ||
    oldVerb === SegmentationFilterVerb.Is ||
    oldVerb === SegmentationFilterVerb.IsNot ||
    oldVerb === SegmentationFilterVerb.IsAfter) &&
    newVerb === SegmentationFilterVerb.IsInTheLast);
