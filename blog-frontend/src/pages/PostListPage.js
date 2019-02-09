import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import PostListContainer from 'containers/PostListContainer'
import HeaderContainer from 'containers/HeaderContainer'

const PostPage = () => {
  return (
    <PageTemplate header={<HeaderContainer/>}>
      <PostListContainer/>
    </PageTemplate>
  );
};

export default PostPage;