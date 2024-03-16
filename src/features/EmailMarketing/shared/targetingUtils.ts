import {
  TargetingFilter,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterValueType,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
} from './emailMarketingTypes';
import products from '../api/productsFromServer';
import {getCountriesArray} from './countries';
import {KeyValuePair} from '../../shared/sharedTypes';

export const getSubjectQualifierOptions = (subject: TargetingFilterSubject) => {
  switch (subject) {
    case TargetingFilterSubject.Date:
      return [
        {key: 'Purchased', value: TargetingFilterSubjectQualifier.Purchased},
        {key: 'Joined', value: TargetingFilterSubjectQualifier.Joined},
      ];
    default:
      return null;
  }
};

export const getVerbOptions = (
  subject: TargetingFilterSubject,
): KeyValuePair[] => {
  switch (subject) {
    case TargetingFilterSubject.Date:
      return [
        {key: TargetingFilterVerb.IsAfter, value: TargetingFilterVerb.IsAfter},
        {
          key: TargetingFilterVerb.IsBefore,
          value: TargetingFilterVerb.IsBefore,
        },
        {
          key: TargetingFilterVerb.IsInTheLast,
          value: TargetingFilterVerb.IsInTheLast,
        },
      ];
    case TargetingFilterSubject.Product:
      return [
        {
          key: TargetingFilterVerb.HasBought,
          value: TargetingFilterVerb.HasBought,
        },
        {
          key: TargetingFilterVerb.HasNotYetBought,
          value: TargetingFilterVerb.HasNotYetBought,
        },
      ];
    case TargetingFilterSubject.Payment:
      return [
        {key: TargetingFilterVerb.Is, value: TargetingFilterVerb.Is},
        {key: TargetingFilterVerb.IsNot, value: TargetingFilterVerb.IsNot},
        {
          key: TargetingFilterVerb.IsMoreThan,
          value: TargetingFilterVerb.IsMoreThan,
        },
        {
          key: TargetingFilterVerb.IsLessThan,
          value: TargetingFilterVerb.IsLessThan,
        },
      ];
    case TargetingFilterSubject.Location:
      return [
        {key: TargetingFilterVerb.Is, value: TargetingFilterVerb.Is},
        {key: TargetingFilterVerb.IsNot, value: TargetingFilterVerb.IsNot},
      ];
    default:
      return [];
  }
};

export const getVerbQualifierOptions = (
  subject: TargetingFilterSubject,
): KeyValuePair[] => {
  switch (subject) {
    case TargetingFilterSubject.Product:
      return [
        {
          key: TargetingFilterVerbQualifier.All,
          value: TargetingFilterVerbQualifier.All,
        },
        {
          key: TargetingFilterVerbQualifier.Any,
          value: TargetingFilterVerbQualifier.Any,
        },
      ];
    default:
      return [];
  }
};

export const getValueOptions = (subject: TargetingFilterSubject) => {
  switch (subject) {
    case TargetingFilterSubject.Product:
      return products;
    case TargetingFilterSubject.Location:
      return getCountriesArray();
    default:
      return null;
  }
};

export const updateFilterVerb = (
  filter: TargetingFilter,
  newVerb: TargetingFilterVerb,
): TargetingFilter => {
  const verbOptions = getVerbOptions(filter.subject);

  if (!verbOptions.find(verb => verb.value === newVerb)) {
    console.warn(
      `Verb "${newVerb}" is not valid for subject "${filter.subject}".`,
    );
    return filter;
  }

  switch (filter.subject) {
    case TargetingFilterSubject.Date:
      return {
        ...filter,
        verb: newVerb as
          | TargetingFilterVerb.IsAfter
          | TargetingFilterVerb.IsBefore
          | TargetingFilterVerb.IsInTheLast,
      };
    case TargetingFilterSubject.Product:
      return {
        ...filter,
        verb: newVerb as
          | TargetingFilterVerb.HasBought
          | TargetingFilterVerb.HasNotYetBought,
      };
    case TargetingFilterSubject.Payment:
      return {
        ...filter,
        verb: newVerb as
          | TargetingFilterVerb.Is
          | TargetingFilterVerb.IsNot
          | TargetingFilterVerb.IsMoreThan
          | TargetingFilterVerb.IsLessThan,
      };
    case TargetingFilterSubject.Location:
      return {
        ...filter,
        verb: newVerb as TargetingFilterVerb.Is | TargetingFilterVerb.IsNot,
      };
    default:
      return filter;
  }
};

export const updateFilterValue = (
  filter: TargetingFilter,
  newValue: TargetingFilterValueType,
): TargetingFilter => {
  switch (filter.subject) {
    case TargetingFilterSubject.Date:
      if (typeof newValue === 'string') {
        return {...filter, value: newValue};
      }
      break;
    case TargetingFilterSubject.Product:
      if (Array.isArray(newValue)) {
        return {...filter, value: newValue};
      }
      break;
    case TargetingFilterSubject.Payment:
      if (typeof newValue === 'number') {
        return {...filter, value: newValue};
      }
      break;
    case TargetingFilterSubject.Location:
      if (typeof newValue === 'string') {
        return {...filter, value: newValue};
      }
      break;
  }

  console.warn(`Invalid value type for subject ${filter.subject}:`, newValue);
  return filter; // Return the original filter if the value type is incorrect
};
