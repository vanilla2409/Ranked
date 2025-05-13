

import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  const handleEditorChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="400px"
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={value}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
