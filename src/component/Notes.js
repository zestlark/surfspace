import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { appalert } from '../app/reducers/overpagesReducer';
import { addNotes } from '../app/reducers/appNotesReducer';
import { colorcode } from '../app/scripts/colors';
import { showNotesBig } from '../app/reducers/appNotesReducer';

const Notes = () => {
    const dispatch = useDispatch()
    const appNotes = useSelector(state => state.appNotes.notes)

    const handleNotesBigShow = (state, color, data) => {
        dispatch(showNotesBig({ state: state, color: color, data: data }))
    }

    let colorcount = 0

    return (
        <>
            <div className='flex gap-3 justify-between items-stretch flex-wrap mt-3 overflow-scroll max-h-[100%] no-scrollbar'>
                {appNotes.length !== 8 ?
                    <div className='text-gray-400 min-w-[48%] max-w-[48%] border-2 text-2xl rounded-2xl flex justify-center items-center' onClick={() => { dispatch(addNotes(prompt("enter data"))) }}>+</div>
                    : ''
                }

                {appNotes.map(note => {
                    if (colorcount === colorcode.length - 1) {
                        colorcount = 0
                    } else {
                        colorcount++
                    }

                    const newcolor = colorcode[colorcount]
                    return ((
                        <div onClick={(e) => { handleNotesBigShow(true, newcolor, note) }} key={note.id} className="text-slate-800 mockup-code min-w-[48%] max-w-[48%] text-sm shadow-sm" style={{ background: newcolor }}>
                            <p className='px-4 line-clamp-3'>{note.text}</p>
                        </div>
                    ))
                })}
            </div >
        </>
    );
}

export default Notes;
