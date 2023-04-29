import { Container } from '@mui/material';

import Head from 'next/head';

import { CtfAccordion } from './ctf-accordion';

import { EntryNotFound } from '@src/components/features/errors/entry-not-found';
import { useCtfAccordionQuery } from './__generated/ctf-accordion.generated';

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

  if (!data.accordion) {
    return (
      <Container>
        <EntryNotFound />
      </Container>
    );
  }

  const accordion = data.accordion;

  return (
    <>
      <CtfAccordion {...accordion} />
    </>
  );
};
