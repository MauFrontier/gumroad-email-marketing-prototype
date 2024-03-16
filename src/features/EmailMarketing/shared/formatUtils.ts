export const formatDateForDisplay = (isoString?: string) => {
  return isoString ? new Date(isoString).toISOString().split('T')[0] : '';
};
