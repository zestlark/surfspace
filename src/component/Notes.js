import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { appalert } from '../app/reducers/overpagesReducer';
import { addNotes } from '../app/reducers/appNotesReducer';
import { colorcode } from '../app/scripts/colors';
import { showNotesBig } from '../app/reducers/appNotesReducer';

const Notes = ({ closeNotesPage }) => {
    const dispatch = useDispatch()
    const appNotes = useSelector(state => state.appNotes.notes)
    const appAuthReducerUser = useSelector(state => state.appAuth.user)

    const handleNotesBigShow = (state, color, data) => {
        dispatch(showNotesBig({ state: state, color: color, data: data }))
    }

    const handleNewNote = () => {
        dispatch(addNotes())
    }

    let colorcount = 0

    if (appAuthReducerUser?.uid)
        return (
            <>
                <p className='md:hidden p-0 pt-2 pb-3 bg-white dark:bg-slate-800 sticky top-0 flex justify-start items-center gap-3'><i onClick={() => { closeNotesPage() }} className="ri-arrow-left-s-line text-2xl bg-slate-100 dark:bg-slate-900 w-9 h-9 flex justify-center items-center rounded-full"></i> Notes</p>

                <div className='flex gap-3 justify-between items-stretch flex-wrap mt-3 overflow-scroll max-h-[100%] no-scrollbar'>
                    {appNotes.length !== 8 ?
                        <div className='text-gray-400 min-w-[48%] max-w-[48%] border-2 text-2xl rounded-2xl flex justify-center items-center' onClick={handleNewNote}>+</div>
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
