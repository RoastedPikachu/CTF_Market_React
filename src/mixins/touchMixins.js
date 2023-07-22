import {useState} from 'react';
export default function() {

    const [firstTouchCoordinates, setFTC] = useState(0);
    const [lastTouchCoordinates, setLTC] = useState(0);

    const changePhotoByTouch = (event, getNext, getPrevious) => {
        setLTC(event.changedTouches[0].pageX);

        if(firstTouchCoordinates > lastTouchCoordinates) {
            getPrevious();
        } else if(firstTouchCoordinates < lastTouchCoordinates) {
            getNext();
        }
    }

    return {
        firstTouchCoordinates,
        lastTouchCoordinates,
        changePhotoByTouch
    }
}