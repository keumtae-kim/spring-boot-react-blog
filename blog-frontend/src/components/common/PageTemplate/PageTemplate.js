import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Footer from 'components/common/Footer'
import { Container } from 'reactstrap';


const cx = classNames.bind(styles);

const PageTemplate = ({ header, children }) => {
  return (
    <div className={cx('page-template')}>
      <header>
        {header}
      </header>
      <main>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  )
};

export default PageTemplate;