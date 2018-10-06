import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import PostListContainer from 'containers/PostListContainer'


const PostPage = () => {
  return (
    <PageTemplate>
      <PostListContainer/>
    </PageTemplate>
  );
};

export default PostPage;