import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import PostContainer from 'containers/PostContainer'


const PostPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <PostContainer id={id}/>
    </PageTemplate>
  );
};

export default PostPage;