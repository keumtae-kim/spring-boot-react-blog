import React from 'react';

import styles from './PostList.scss';
import classNames from 'classnames/bind';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import Post from 'components/Post';
const cx = classNames.bind(styles);

const PostList = ({ posts }) => {  
  if (posts === undefined) {
    return null;
  }

  const postList = posts.map((post, index) => {
    return (
      <div key={post.get("id")}>
        <Post post={post}/>        
        <hr />        
      </div>
    )
  });

  return (
    <Container>
      <Row>
        <Col className={cx("mx-auto", { lg: "8", md: "10" })} >
          {postList}
        </Col>
      </Row>
    </Container>
  )
};

export default PostList;


