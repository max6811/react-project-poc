import { ClientParseError } from '@apollo/client';
import { ApolloError, NetworkError } from '@apollo/client/errors';

import { ToastInterface } from './Toast';

export interface HttpError {
  message: string;
  error: string;
  statusCode: number;
  fullError?: unknown;
}

export type HttpErrorCatch = {
  name: string;
  graphQLErrors: HttpError[];
  protocolErrors: unknown;
  clientErrors: ClientParseError;
  networkError: NetworkError;
  message: string;
  extraInfo: unknown;
};

export interface ErrorHandlePayload {
  config?: ToastInterface;
  error?: HttpErrorCatch | ApolloError;
}
