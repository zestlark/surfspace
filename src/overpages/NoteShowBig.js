import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotesBig } from '../app/reducers/appNotesReducer';
import { deletenotes } from '../app/reducers/appNotesReducer';
import moment from 'moment';

const NoteShowBig = () => {
    const dispatch = useDispatch()
    const notesBigShowState = useSelector(state => state.appNotes.notesbigshowstate)
    const noteSBigShowData = useSelector(state => state.appNotes.notesbigshowData)
    const notesBigShowColor = useSelector(state => state.appNotes.notesbigshowColor)

    const handleNotesBigClose = () => {
        dispatch(showNotesBig(false, '', {}))
    }

    const handleNoteDelete = (id) => {
        dispatch(deletenotes(id))
        dispatch(showNotesBig(false, '', {}))
    }

    if (notesBigShowState)
        return (
            <div className='fixed flex  justify-center items-center w-screen h-screen top-0 left-0 z-10 backdrop-blur-sm' onClick={handleNotesBigClose}>
                <div className="mockup-code w-[90%] md:w-auto md:max-w-[500px] text-slate-800 slide-top" style={{ background: notesBigShowColor }} onClick={(e) => { e.stopPropagation() }}>
                    <p className='break-words px-5'>
                        {noteSBigShowData?.text}
                    </p>

                    <div className='px-5 flex justify-between items-center mt-3'>
                        <small>{moment(noteSBigShowData?.time).fromNow()}</small>
                        <button className="btn bg-[#ffffff66] dark:bg-[#66666666]" onClick={() => { handleNoteDelete(noteSBigShowData?.id) }}>
                            <i className="ri-delete-bin-line text-xl text-error"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default NoteShowBig;
