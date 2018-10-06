import React from 'react';

import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import {
  Container
} from 'reactstrap';

const cx = classNames.bind(styles);

const PageTemplate = ({ children }) => (
  <div className={cx('page-template')}>
    <Header />
    <main>
      <Container>
            {children}
      </Container>
    </main>
    <Footer />
  </div>
);

export default PageTemplate;