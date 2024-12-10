import { ApolloError } from '@apollo/client';

import { showToast, showToastMessage } from './toastUtils';
import { ToastSeverity } from './enums/toast.enum';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorControl = (error: any) => {
  if (error instanceof TypeError) {
    showToastMessage(error.message, ToastSeverity.Warn);
  }
  if (error instanceof ApolloError) {
    showToast({ error: error });
  }
};
