import React from 'react';
import PageTemplate from 'components/common/PageTemplate'
import EditorContainer from 'containers/EditorContainer'

const EditorPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <EditorContainer id={id}/>
    </PageTemplate>
  );
};

export default EditorPage;