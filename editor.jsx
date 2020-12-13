import React from 'react';

import ColorPicker from './colorpicker';
import Matrix from './matrix';

import EditorContext from './editorcontext';

import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Editor(){

    const [penColor, setPenColor] = useState('#000000'); // Inicial - Preto
    const [pickerPos, setPickerPos] = useState(null); // Inicial - Não aparecer
    const [preset, setPreset] = useState([
        '#d0021b', '#f5a623', '#f8e71c', '#8b572a', '#7ed321',
        '#417505', '#bd10e0', '#9013fe', '#4a90e2', '#50e3c2',
        '#b8e986', '#000000', '#4a4a4a', '#9b9b9b', '#f0f0f0',
        '#ffffff'
    ]);

    const showPicker = useCallback((event) => {
        event.preventDefault();
        setPickerPos({
            x: event.clientX,
            y: event.clientY
        });
    }, []);

    const hidePicker = useCallback(() => {
        if (pickerPos){
            if (!preset.includes(penColor))
                setPreset([penColor, ...preset.slice(0, -1)]);
            else {
                setPreset([penColor, ...preset.filter(c => c !== penColor)]);
            }
            setPickerPos(null);
        }
    }, [penColor, preset, pickerPos]);

    const [size, setSize] = useState([10, 10]);

    const [clicks, setClicks] = useState([]);
    const [undos, setUndos] = useState([]);

    const [img, setImg] = useState(null);
    const [paint, setPaint] = useState(false);

    useEffect(() => {
        if (img){
            setSize([img.x, img.y]);
            setClicks([]);
            setUndos([]);
        }
    }, [img]);

    useEffect(() => {
        if (paint){
            const squares = getAllSquares();

            for (let i = 0; i < squares.length; ++i) {
                const square = squares[i];
                square.style.backgroundColor = img.colors[i];
            }

            setImg(null);

            setPaint(false);
        }
    }, [img, paint]);

    return (
        <EditorContext.Provider value={{
            size, penColor, clicks, undos,
            setSize, setPenColor, setClicks, setUndos, setImg
        }}>
            <ColorPicker
                //onClose={hidePicker}
                //callback={setPenColor}
                //pos={pickerPos}
                //preset={preset}
            />

                <View style={classes.editorGrid} align="center">
                    <View nativeID="editorGridMatrix">
                        <Matrix
                            size={size}
                        />
                    </View>
                </View>
        </EditorContext.Provider>
    );
}

const classes = StyleSheet.create({
    outerEditorGrid: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    editorGrid: {
        justifyContent: 'center',
        backgroundColor: '#282c34',
        padding: 20,
        paddingBottom: 0,
    }
});