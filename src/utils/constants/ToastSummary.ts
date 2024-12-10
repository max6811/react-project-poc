import { ToastSeverity } from "../enums/toast.enum";
import { ToastSummary } from "../interfaces/Toast";


export const toastSummaries: ToastSummary[] = [
  {
    severity: ToastSeverity.Success,
    summary: 'Correcto',
  },
  {
    severity: ToastSeverity.Error,
    summary: 'Error',
  },
  {
    severity: ToastSeverity.Warn,
    summary: 'Advertencia',
  },
  {
    severity: ToastSeverity.Info,
    summary: 'Informacion',
  },
];
