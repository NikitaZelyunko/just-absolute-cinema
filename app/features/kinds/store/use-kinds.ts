import { getKindsFromApi } from '../api/get-kinds';
import { createHandbookStore } from '~/app/utils/create-handbook-store';

export const useKindsStore = createHandbookStore({
  getHandbookValues: getKindsFromApi,
  handbookName: 'kinds',
});
