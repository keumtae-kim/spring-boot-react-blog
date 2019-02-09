import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import EditorContainer from 'containers/EditorContainer'
import HeaderContainer from 'containers/HeaderContainer'

const EditorPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate header={<HeaderContainer/>}>
      <EditorContainer id={id}/>
    </PageTemplate>
  );
};

export default EditorPage;