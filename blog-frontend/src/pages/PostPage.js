import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import PostContainer from 'containers/PostContainer'
import HeaderContainer from 'containers/HeaderContainer'

const PostPage = ({match}) => {
  const { id } = match.params;
  console.log('post page')
  return (
    <PageTemplate header={<HeaderContainer/>}>
      <PostContainer id={id}/>
    </PageTemplate>
  );
};

export default PostPage;