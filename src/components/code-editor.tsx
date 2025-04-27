import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { useCodeMirror } from '@uiw/react-codemirror';
import { JSX, RefAttributes, useEffect, useImperativeHandle, useRef } from 'react';

import styles from './code-editor.module.css';

type CodeEditorProps = {
  script: string;
  theme: 'light' | 'dark';
};

export function CodeEditor({
  script,
  theme,
  ref,
}: CodeEditorProps & RefAttributes<{ getValue: () => string }>): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null);
  const currentValueRef = useRef(script.trim());

  const { setContainer } = useCodeMirror({
    container: editorRef.current,
    theme: theme === 'light' ? vscodeLight : vscodeDark,
    extensions: [javascript(), EditorView.lineWrapping],
    value: script.trim(),
    onChange: (val) => (currentValueRef.current = val),
    basicSetup: {
      lineNumbers: false,
      foldGutter: false,
      highlightSelectionMatches: true,
    },
  });

  useImperativeHandle(ref, () => ({ getValue: (): string => currentValueRef.current }), []);

  useEffect(() => {
    if (editorRef.current) {
      setContainer(editorRef.current);
    }
  }, [setContainer]);

  return <div ref={editorRef} className={styles.editor} />;
}
