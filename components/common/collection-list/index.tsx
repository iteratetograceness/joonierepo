'use client';

import { motion } from 'framer-motion';
import useSWRInfinite from 'swr/infinite';
import { Config } from '~/contentful/config';
import { Project } from '~/contentful/types';
import { Button } from '../button';
import styles from './index.module.css';

type CollectionType = Project;

interface Props {
  collection: { total: number; items: CollectionType[] };
  type: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function CollectionList({ collection, type }: Props) {
  const getKey = (
    index: number,
    previousPageData: CollectionType[] | undefined,
  ) => {
    if (
      previousPageData &&
      previousPageData.length < Config.pagination.pageSize
    ) {
      return null;
    }

    return `/api/load-more?type=${type}&page=${index + 1}`;
  };

  const { data, error, mutate, size, setSize, isLoading } = useSWRInfinite<{
    total: number;
    items: CollectionType[];
  }>(getKey, fetcher, {
    revalidateFirstPage: false,
    fallbackData: [collection],
  });

  const allItems = data?.slice(0, size).flatMap((d) => d.items) || [];
  const hasReachedEnd = allItems.length === collection.total;

  const prefetchNextPage = async () => {
    const key = getKey(size, undefined);
    if (key) {
      await fetcher(key);
      await mutate();
    }
  };

  const loadMore = async () => {
    await setSize(size + 1);
  };

  return (
    <section className={styles['collection-list']}>
      {allItems?.map((item) => (
        <motion.div
          className={styles.item}
          key={item.slug}
          onViewportEnter={prefetchNextPage}
          viewport={{ margin: '100%' }}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.div>
      ))}
      {!hasReachedEnd ? (
        <Button
          className={styles['load-more']}
          disabled={isLoading}
          onClick={() => void loadMore()}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      ) : null}
      {error ? (
        <p className={styles.error}>
          There was an issuing grabbing more posts! Try again?
        </p>
      ) : null}
    </section>
  );
}
