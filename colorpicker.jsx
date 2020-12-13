import React from 'react';
import { ColorPicker as Picker } from 'react-native-color-picker';
import { useState } from 'react';
import Slider from '@react-native-community/slider';

export default function ColorPicker({ pos, callback, preset, onClose }) {
    const [color, setColor] = useState('#000000');

    return (
        <ColorPicker
            onColorSelected={color => setColor(color)}
            style={{ flex: 1 }}
            sliderComponent={<Slider />}
        />)
}
