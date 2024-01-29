'use-client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';

interface CustomEditorProps {
  initialData: string;
  onCustomEditorChange: (data: string) => void;
}

function CustomEditor({ initialData, onCustomEditorChange }: CustomEditorProps) {
  return (
    <>
      <CKEditor
        editor={Editor}
        data={initialData ?? ''}
        onReady={(editor) => {
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onCustomEditorChange(data);
          console.log('change.', data);
        }}
      />
    </>
  );
}

export default CustomEditor;
