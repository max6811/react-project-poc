import { ApolloClient, from, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLFormattedError } from "graphql";

import {
  ERROR_500,
  ERROR_ROUTE,
} from "../utils/constants/productRoutesConstant";
import { HttpError } from "../utils/interfaces/Error";
import { HTTP_STATUS } from "../utils/constants/HttpConstants";

const handleGraphQLErrors = (
  graphQLErrors: ReadonlyArray<GraphQLFormattedError>
) => {
  graphQLErrors.forEach(async (graphQLErrorItem: GraphQLFormattedError) => {
    const { error, statusCode } = graphQLErrorItem as unknown as HttpError;

    if (
      error === HTTP_STATUS.UNAUTHORIZED.error &&
      statusCode == HTTP_STATUS.UNAUTHORIZED.statusCode
    ) {
      location.reload();
    }

    if (
      error === HTTP_STATUS.INTERNAL_SERVER_ERROR.error &&
      statusCode == HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode
    ) {
      location.replace(`${ERROR_ROUTE}${ERROR_500}`);
    }
  });
};

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    handleGraphQLErrors(graphQLErrors);
  }
});

// const serverLink = createHttpLink({
//   uri: getApiUrl(),
//   credentials: "include",
// });

// const authLink = new ApolloLink((operation, forward) => {
//   const token = store.getState().authSlice.token;

//   operation.setContext({
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//       origin: getPublicUrl(),
//     },
//   });

//   return forward(operation);
// });

// const linkChain = from([errorLink, authLink.concat(serverLink)]);
const linkChain = from([errorLink]);

const apolloClient = new ApolloClient({
  link: linkChain,
  cache: new InMemoryCache(),
});

export default apolloClient;
