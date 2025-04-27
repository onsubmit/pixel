import { JSX, ReactNode } from 'react';

import styles from './card.module.css';

export function Card({ children }: { children: ReactNode }): JSX.Element {
  return <div className={styles.card}>{children}</div>;
}
