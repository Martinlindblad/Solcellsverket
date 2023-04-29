import * as Types from '../../__generated/graphql.types';

import { PageLinkFieldsFragment } from '../../../components/features/page-link/__generated/page-link.generated';
import { fetchConfig } from '@src/lib/fetchConfig';
import { PageLinkFieldsFragmentDoc } from '../../../components/features/page-link/__generated/page-link.generated';
export type MenuGroupFieldsFragment = { __typename?: 'MenuGroupFeaturedPagesCollection', items: Array<(
    { __typename?: 'Page' }
    & PageLinkFieldsFragment
  ) | { __typename?: 'Post' } | null> };

export const MenuGroupFieldsFragmentDoc = `
    fragment MenuGroupFields on MenuGroupFeaturedPagesCollection {
  items {
    ...PageLinkFields
  }
}
    `;