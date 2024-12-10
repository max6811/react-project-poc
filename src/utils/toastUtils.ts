import { Toast } from 'primereact/toast';

import { ErrorHandlePayload, HttpErrorCatch } from './interfaces/Error';
import { toastSummaries } from './constants/ToastSummary';
import { ToastSeverity } from './enums/toast.enum';
import { ToastSummary } from './interfaces/Toast';

let toast: Toast | null = null;

export const setToastRef = (ref: Toast) => {
  toast = ref;
};

export const showToast = (payload: ErrorHandlePayload) => {
  const { config, error } = payload;
  const httpError = getHttpError(error as HttpErrorCatch);
  const toastSeverity = getSeverity(httpError?.statusCode as number);
  if (toast) {
    toast.show({
      detail: httpError ? httpError?.message : config?.detail,
      summary: getSummary(toastSeverity)?.summary,
      severity: toastSeverity,
      life: config?.life || 3000,
      ...config,
    });
  }
};

export const showToastMessage = (
  detail: string,
  severity: ToastSeverity,
  life?: number,
) => {
  if (toast) {
    toast.show({
      detail,
      summary: getSummary(severity)?.summary,
      severity: severity,
      life: life || 3000,
    });
  }
};

const getSummary = (toastSeverity: ToastSeverity) =>
  toastSummaries.find(
    ({ severity }: ToastSummary) => severity === toastSeverity,
  );

const getSeverity = (statusCode: number): ToastSeverity => {
  switch (true) {
    case statusCode >= 300 && statusCode <= 399:
      return ToastSeverity.Warn;
    case statusCode === 400:
      return ToastSeverity.Warn;
    case statusCode >= 401 && statusCode <= 499:
      return ToastSeverity.Error;
    default:
      return ToastSeverity.Success;
  }
};

export const getHttpError = (error: HttpErrorCatch) => {
  if (typeof error === 'object') {
    return error.graphQLErrors[0];
  }
  return null;
};
