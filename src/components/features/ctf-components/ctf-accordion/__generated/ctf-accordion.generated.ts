import * as Types from '../../../../../lib/__generated/graphql.types';

import { fetchConfig } from '@src/lib/fetchConfig';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(fetchConfig.endpoint as string, {
    method: "POST",
    ...(fetchConfig.params),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type AccordionFieldsFragment = { __typename?: 'Accordion', internalName?: string | null, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null, firstPublishedAt?: any | null }, accordionItemsCollection?: { __typename?: 'AccordionAccordionItemsCollection', items: Array<{ __typename: 'TopicProduct', internalName?: string | null, name?: string | null, sys: { __typename?: 'Sys', id: string } } | { __typename: 'TopicProductFeature', internalName?: string | null, name?: string | null, sys: { __typename?: 'Sys', id: string } } | null> } | null };

export type CtfAccordionQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  locale?: Types.InputMaybe<Types.Scalars['String']>;
  preview?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type CtfAccordionQuery = { __typename?: 'Query', accordion?: (
    { __typename?: 'Accordion' }
    & AccordionFieldsFragment
  ) | null };

export const AccordionFieldsFragmentDoc = `
    fragment AccordionFields on Accordion {
  sys {
    id
    publishedAt
    firstPublishedAt
  }
  internalName
  accordionItemsCollection {
    items {
      ... on TopicProductFeature {
        __typename
        sys {
          id
        }
        internalName
        name(locale: $locale)
      }
      ... on TopicProduct {
        __typename
        sys {
          id
        }
        internalName
        name(locale: $locale)
      }
    }
  }
}
    `;
export const CtfAccordionDocument = `
    query CtfAccordion($id: String!, $locale: String, $preview: Boolean) {
  accordion(id: $id, preview: $preview, locale: $locale) {
    ...AccordionFields
  }
}
    ${AccordionFieldsFragmentDoc}`;
export const useCtfAccordionQuery = <
      TData = CtfAccordionQuery,
      TError = unknown
    >(
      variables: CtfAccordionQueryVariables,
      options?: UseQueryOptions<CtfAccordionQuery, TError, TData>
    ) =>
    useQuery<CtfAccordionQuery, TError, TData>(
      ['CtfAccordion', variables],
      fetcher<CtfAccordionQuery, CtfAccordionQueryVariables>(CtfAccordionDocument, variables),
      options
    );

useCtfAccordionQuery.getKey = (variables: CtfAccordionQueryVariables) => ['CtfAccordion', variables];
;

useCtfAccordionQuery.fetcher = (variables: CtfAccordionQueryVariables) => fetcher<CtfAccordionQuery, CtfAccordionQueryVariables>(CtfAccordionDocument, variables);