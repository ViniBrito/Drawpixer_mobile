import React from 'react';

import { useRef, useContext, useCallback } from 'react';

import { rgb2hex } from './tools';

import EditorContext from './editorcontext';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native';

export default function Square({ size, squareId }) {
  const { setClicks, setUndos, penColor } = useContext(EditorContext);

  const self = useRef();

  const changeColor = useCallback(color => {
    const button = self.current;

    const lastColor = rgb2hex(button.style.backgroundColor);
    if (color !== lastColor) {
      setClicks(clicks =>
        [...clicks, { id: squareId, color: lastColor }]
      );
      setUndos([]);
      button.style.backgroundColor = color;
    }
  }, [setClicks, setUndos, squareId]);

  /// Tem que dar um jeito nesses windows
  const onMouseOver = useCallback(() => {
    if (window.mouseDown) {
      if (window.button === 2)
        changeColor('#ffffff');
      else
        changeColor(penColor);
    }
  }, [penColor, changeColor]);

  let height, width, minHeight, minWidth;

  minHeight = minWidth = height = width = size ? size : 34;

  return (
    <View style={styles.cell}>
      <TouchableOpacity
        style={styles.button}
        style={{
          backgroundColor: "#ffffff",
          height, width, minHeight, minWidth
        }}
        draggable={false}
        onPress={onMouseOver}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    margin: 1,
  },
  basic: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    margin: -0.5,
    padding: 0,
  },
  editorGrid: {
    justifyContent: 'center',
    backgroundColor: '#282c34',
    padding: 20,
  },
  boardRow: {
    justifyContent: 'center',
    display: 'flex',
  },
  editorSize: {
    position: 'absolute',
    textAlign: 'left',
  },
  outerEditorGrid: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});