import { JSX, useRef, useState } from 'react';

import styles from './App.module.css';
import { defaultColorFunc, getColorFunc } from './color-func';
import { Card } from './components/card';
import { CodeEditor } from './components/code-editor';
import { Config } from './components/config';
import { initialSceneProps } from './components/initial-scene-props';
import { Scene, SceneProps } from './components/scene';

export function App(): JSX.Element {
  const editorRef = useRef<{ getValue: () => string }>(null);

  const [sceneProps, setSceneProps] = useState<SceneProps>(initialSceneProps);

  const render = ({ plane, quality, scale }: Omit<SceneProps, 'colorFunc'>): void => {
    setSceneProps({
      plane,
      quality,
      scale,
      colorFunc: getColorFunc(editorRef.current?.getValue()),
    });
  };

  return (
    <div className={styles.app}>
      <div className={styles.input}>
        <Card>
          <CodeEditor ref={editorRef} theme="dark" script={defaultColorFunc} />
        </Card>
        <Card>
          <Config render={render}></Config>
        </Card>
      </div>
      <Card>
        <Scene {...sceneProps}></Scene>
      </Card>
    </div>
  );
}
