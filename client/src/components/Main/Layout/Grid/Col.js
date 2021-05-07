import React from 'react';
import styles from './Col.module.css';

const COLUMNS_PER_ROW = 12;

const computeWidth = (n, isOffset) =>
  `calc((100% - var(--gutter-horizontal) * ${
    COLUMNS_PER_ROW - 1
  }) / ${COLUMNS_PER_ROW} * ${n} + var(--gutter-horizontal) * ${
    n - (isOffset ? 0 : 1)
  })`;

const Col = ({ size, offset, children }) => (
  <div
    className={styles.Col}
    style={{
      marginLeft: computeWidth(offset, true),
      width: computeWidth(size, false),
    }}
  >
    {children}
  </div>
);

export default Col;
