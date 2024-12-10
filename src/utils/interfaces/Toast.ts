import { ToastSeverity } from '../enums/toast.enum';

export interface ToastInterface {
  detail: string;
  severity?: ToastSeverity;
  life?: number;
}

export interface ToastSummary {
  severity: ToastSeverity;
  summary: string;
}
