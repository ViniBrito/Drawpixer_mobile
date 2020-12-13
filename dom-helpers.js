import { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import Square from './square';

/**
 * @param {number} id
 * @returns {HTMLButtonElement}
 */
export function getSquare(id){
    return <Square called={this.id}/>;
}

/**
 * @returns {NodeListOf<HTMLButtonElement>}
 */
export function getAllSquares(){
    return document.querySelectorAll('button[id^="square-"]');
}

/**
 * @returns {[number, number]}
 */
export function getMaxSizes(){
    const window = useWindowDimensions();
    const x = window.width - 40; // width - padding
    const y = window.height - 20; // height - padding

    return [x,y];
}

/**
 * @returns {[number, number]}
 */
export function useMaxSizes(){
    const [maxSizes, setMaxSizes] = useState(getMaxSizes());
    return maxSizes;
}
