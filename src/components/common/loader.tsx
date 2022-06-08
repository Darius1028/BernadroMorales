import { LoadingOutlined } from '@ant-design/icons';
import React, { Component, ReactNode } from 'react';
import styles from './loader.module.scss';
class Loader extends Component {
  render(): ReactNode {
    return <div className={styles.appLoaderContainer}>
      <LoadingOutlined className={styles.appLoader} />
    </div>;
  }
}

export default Loader;
