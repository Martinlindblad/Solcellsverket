import { Container } from '@mui/material';
import Head from 'next/head';

import { useCtfAccordionQuery } from '@src/components/features/ctf-components/ctf-accordion/__generated/ctf-accordion.generated';
import { CtfAccordion } from './ctf-accordion';

import { EntryNotFound } from '@src/components/features/errors/entry-not-found';

interface CtfAccordionGqlPropsInterface {
  id: string;
  locale: string;
  preview?: boolean;
}

export const CtfAccordionGql = (props: CtfAccordionGqlPropsInterface) => {
  const { isLoading, data } = useCtfAccordionQuery({
    id: props.id,
    locale: props.locale,
    preview: props.preview,
  });

  if (!data || isLoading) {
    return null;
  }

  if (!data.list) {
    return (
      <Container>
        <EntryNotFound />
      </Container>
    );
  }

  const accordion = data.list;

  return (
    <>
      {accordion?.featuredImage && (
        <Head>
          <meta
            key="og:image"
            property="og:image"
            content={`${accordion.featuredImage.url}?w=1200&h=630&f=faces&fit=fill`}
          />
        </Head>
      )}
      <CtfAccordion {...accordion} />
    </>
  );
};
