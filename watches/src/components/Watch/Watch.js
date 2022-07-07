
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './Watch.css'

function Watch({ handleRemove, ...watch }) {
    const { time, name } = watch;
    const [zone, setZone] = useState(moment().utcOffset(0));
    // важно выставить дефолтное значение, и не стоит определяться на state или props. Они выставляются в асинхронном порядке и вообще это очередь. 
    // дефолтные 0 спасает ситуацию
    let timeout;
    
    
        const starWatch = () => {
            // обязательно аргумент должен быть числом :)
            setZone(moment().utcOffset(time));
        }

    useEffect(starWatch, []);



    useEffect(() => {
        timeout = window.setTimeout(starWatch, 1000);
        return () => {
            window.clearTimeout(timeout);
        }
    }, [zone])


    const second = (zone) => `rotate(${zone.second() / 60}turn)`
    const minutes = (zone) => `rotate(${zone.minute() / 60}turn)`
    const hours = (zone) => `rotate(${zone.hour() / 24}turn)`

    // const secStyle = { transform: second(zone) };
    // const minStyle = { transform: minutes(zone) };
    // const hoursStyle = { transform: hours(zone) };


    return (
        <div>
            <div>{name}</div>
            <div>{zone.format('HH:mm:ss')}</div>
            <div className="watch">
                <div className="hourhand" style={{ transform: hours(zone) }}></div>
                <div className="minutehand" style={{transform: minutes(zone)}}></div>
                <div className="sechand" style={{transform: second(zone)}}></div>
            </div>
        </div>
    )
}

export default Watch