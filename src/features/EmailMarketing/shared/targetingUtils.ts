import {
  TargetingFilter,
  TargetingFilterSubject,
  TargetingFilterSubjectQualifier,
  TargetingFilterValueType,
  TargetingFilterVerb,
  TargetingFilterVerbQualifier,
} from './emailMarketingTypes';
import products from '../api/defaultProducts';
import {getCountriesArray} from './countries';

export const getSubjectQualifierOptions = (subject: TargetingFilterSubject) => {
  switch (subject) {
    case TargetingFilterSubject.Date:
      return [
        {key: 'Purchased', name: TargetingFilterSubjectQualifier.Purchased},
        {key: 'Joined', name: TargetingFilterSubjectQualifier.Joined},
      ];
    default:
      return null;
  }
};

export const getVerbOptions = (
  subject: TargetingFilterSubject,
): TargetingFilterVerb[] => {
  switch (subject) {
    case TargetingFilterSubject.Date:
      return [
        TargetingFilterVerb.IsAfter,
        TargetingFilterVerb.IsBefore,
        TargetingFilterVerb.IsInTheLast,
      ];
    case TargetingFilterSubject.Product:
      return [
        TargetingFilterVerb.HasBought,
        TargetingFilterVerb.HasNotYetBought,
      ];
    case TargetingFilterSubject.Payment:
      return [
        TargetingFilterVerb.Is,
        TargetingFilterVerb.IsNot,
        TargetingFilterVerb.IsMoreThan,
        TargetingFilterVerb.IsLessThan,
      ];
    case TargetingFilterSubject.Location:
      return [TargetingFilterVerb.Is, TargetingFilterVerb.IsNot];
    default:
      return [];
  }
};

export const getVerbQualifierOptions = (
  subject: TargetingFilterSubject,
): string[] => {
  switch (subject) {
    case TargetingFilterSubject.Product:
      return [
        TargetingFilterVerbQualifier.Any,
        TargetingFilterVerbQualifier.All,
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

  if (!verbOptions.includes(newVerb)) {
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
