import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appalert } from '../app/reducers/overpagesReducer';
import { addNotes } from '../app/reducers/appNotesReducer';
import { colorcode } from '../app/scripts/colors';

const Notes = () => {
    const dispatch = useDispatch()
    const appNotes = useSelector(state => state.appNotes.notes)

    let colorcount = 0

    return (
        <div className='flex gap-3 justify-between flex-wrap mt-3 overflow-scroll h-full no-scrollbar'>
            {appNotes.length !== 8 ?
                <div className='text-gray-500 min-w-[48%] max-w-[48%] border-2 text-2xl rounded-2xl flex justify-center items-center' onClick={() => { dispatch(addNotes(prompt("enter data"))) }}>+</div>
                : ''
            }

            {appNotes.map(note => {
                if (colorcount === colorcode.length - 1) {
                    colorcount = 0
                } else {
                    colorcount++
                }
                return ((
                    <div onClick={() => { dispatch(appalert(note.text)) }} key={note.id} className="text-slate-800 mockup-code min-w-[48%] max-w-[48%] text-sm shadow-sm" style={{ background: colorcode[colorcount] }}>
                        <p className='px-4 line-clamp-3'>{note.text}</p>
                    </div>
                ))
            })}
        </div>
    );
}

export default Notes;
