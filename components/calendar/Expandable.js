import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import './Expandable.css'

export default function Expandable() {

    const [showCalendar, setshowCalendar] = useState(false)
    function onClick(){
        setshowCalendar(!showCalendar);
    }

    function handleSelect(ranges){
        var output =  ranges['selection']['startDate'].getDate() + "/" + 
                     (ranges['selection']['startDate'].getMonth() + 1) + "/" + 
                     (ranges['selection']['startDate'].getYear() + 1900) + 
                     " - " + 
                     ranges['selection']['endDate'].getDate() + "/" + 
                     (ranges['selection']['endDate'].getMonth() + 1) + "/" + 
                     (ranges['selection']['endDate'].getYear() + 1900);
 
         document.getElementById("dateRange").innerHTML = output;
         document.getElementById("dateRange-main").innerHTML = output;
     }

     const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }

    return (
        <>
        <div className="expandable">
            <button onClick={onClick} className="open-close">
                <strong id="dateRange-main">{(new Date()).getDate()}/{(new Date()).getMonth()+1}/{(new Date()).getYear() + 1900} - {(new Date()).getDate()}/{(new Date()).getMonth()+1}/{(new Date()).getYear() + 1900}    </strong>
                <span className="material-icons">date_range</span>
            </button>
        </div>
        {(showCalendar === true) && 
                    (
                <div className="calendar-wrapper">
                    <header className="dateRange-wrapper">
                        <p className="dateRange-heading">DATE RANGE</p>
                        <div className="dateRange-close">
                            <strong id="dateRange">{(new Date()).getDate()}/{(new Date()).getMonth()+1}/{(new Date()).getYear() + 1900} - {(new Date()).getDate()}/{(new Date()).getMonth()+1}/{(new Date()).getYear() + 1900}</strong>
                            <button onClick={onClick} className="open-close"><span className="material-icons">highlight_off</span></button>
                        </div>
                    </header>
                    <DateRange
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    showDateDisplay={false}
                    />
                </div>
                )}
        </>
    )
}
