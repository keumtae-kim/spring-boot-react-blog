import React from 'react';
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import PostListContainer from 'containers/PostListContainer'


const PostPage = () => {
  return (
    <div>
      <Header />
      <PostListContainer />
      <Footer />
    </div>
  );
};

export default PostPage;