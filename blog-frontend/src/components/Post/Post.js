import React from 'react';

import styles from './Post.scss';
import classNames from 'classnames/bind';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
const cx = classNames.bind(styles);

const Post = () => (
  <Container>
    <Row>
      <Col className={cx("mx-auto", { lg: "8", md: "10" })} >
        <div className="post-preview">
          <a>
            <h2 className="post-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliud igitur esse censet gaudere
    </h2>
          </a>
          <p className="post-meta">Posted by
    <a>Kim Keumtae</a>
            on September 27, 2018</p>
        </div>
        <hr />

        <div className="post-preview">
          <a>
            <h2 className="post-title">
              Sed id ne cogitari quidem potest quale sit, ut non repugnet ipsum sibi.
    </h2>
          </a>
          <p className="post-meta">Posted by
    <a>Kim Keumtae</a>
            on September 27, 2018</p>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Post;