import { getLabelsFromApi } from '../api/get-labels';
import { createHandbookStore } from '~/app/utils/create-handbook-store';

export const useLabelsStore = createHandbookStore({
  getHandbookValues: getLabelsFromApi,
  handbookName: 'labels',
});
