import { dehydrate, QueryClient } from '@tanstack/react-query';
import { NextPage, NextPageContext } from 'next';

import { useCtfFooterQuery } from '@src/components/features/ctf-components/ctf-footer/__generated/ctf-footer.generated';
import { useCtfNavigationQuery } from '@src/components/features/ctf-components/ctf-navigation/__generated/ctf-navigation.generated';
import { useCtfPageQuery } from '@src/components/features/ctf-components/ctf-page/__generated/ctf-page.generated';
import CtfPageGgl from '@src/components/features/ctf-components/ctf-page/ctf-page-gql';
import { getServerSideTranslations } from '@src/lib/get-serverside-translations';
import { prefetchPromiseArr } from '@src/lib/prefetch-promise-array';

const LangPage: NextPage = () => {
  return <CtfPageGgl slug="/" />;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => {
  try {
    const queryClient = new QueryClient();

    // Default queries
    await queryClient.prefetchQuery(
      useCtfPageQuery.getKey({ slug: 'home', locale, preview: false }),
      useCtfPageQuery.fetcher({ slug: 'home', locale, preview: false }),
    );
    await queryClient.prefetchQuery(
      useCtfNavigationQuery.getKey({ locale, preview: false }),
      useCtfNavigationQuery.fetcher({ locale, preview: false }),
    );
    await queryClient.prefetchQuery(
      useCtfFooterQuery.getKey({ locale, preview: false }),
      useCtfFooterQuery.fetcher({ locale, preview: false }),
    );

    // Dynamic queries
    const pageData = await useCtfPageQuery.fetcher({ slug: 'home', locale, preview: false })();
    const page = pageData.pageCollection?.items[0];

    const topSection = page?.topSectionCollection?.items;
    const content = page?.pageContent;
    const extraSection = page?.extraSectionCollection?.items;

    await Promise.all([
      ...prefetchPromiseArr({ inputArr: topSection, locale, queryClient }),
      ...prefetchPromiseArr({ inputArr: extraSection, locale, queryClient }),
      ...prefetchPromiseArr({ inputArr: [content], locale, queryClient }),
    ]);

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default LangPage;
