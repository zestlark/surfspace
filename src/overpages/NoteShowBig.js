import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotesBig } from '../app/reducers/appNotesReducer';
import { deletenotes, addNotes } from '../app/reducers/appNotesReducer';
import { appconfirm } from '../app/reducers/overpagesReducer';
import moment from 'moment';

import useAutosizeTextArea from "../app/scripts/autoResizeTextArea";

const NoteShowBig = () => {
    const dispatch = useDispatch()

    const newnotedata = useRef('')
    const [newnotevalue, setnewnotevalue] = useState('');

    const notesBigShowState = useSelector(state => state.appNotes.notesbigshowstate)
    const noteSBigShowData = useSelector(state => state.appNotes.notesbigshowData)
    const notesBigShowColor = useSelector(state => state.appNotes.notesbigshowColor)
    const isnewNote = useSelector(state => state.appNotes.newNote)

    const handleNotesBigClose = () => {
        dispatch(showNotesBig(false, '', {}))
    }

    const handleNoteDelete = (id) => {
        dispatch(appconfirm({
            message: "Do you want to delete this note",
            confirmFunction: function () {
                dispatch(deletenotes(id))
                dispatch(showNotesBig(false, '', {}))
            }
        }))
    }

    const handlenewNote = () => {
        if (newnotevalue.length > 0) {
            const data = newnotevalue
            dispatch(addNotes(data))
            document.getElementById('bigNoteBox').click()
            setnewnotevalue('')
        }
    }


    useAutosizeTextArea(newnotedata.current, newnotevalue);

    const handleNewValueChange = (evt) => {
        const val = evt.target?.value;
        setnewnotevalue(val);
    };

    if (notesBigShowState)
        return (
            <div id='bigNoteBox' className='fixed flex  justify-center items-center w-screen h-screen top-0 left-0 z-30 backdrop-blur-sm' onClick={handleNotesBigClose}>
                <div className="mockup-code max-h-[70%] overflow-scroll no-scrollbar w-[90%] md:w-auto md:max-w-[500px] text-slate-800 slide-top" style={{ background: notesBigShowColor }} onClick={(e) => { e.stopPropagation() }}>
                    {isnewNote ?
                        <textarea
                            id="review-text"
                            onChange={handleNewValueChange}
                            placeholder="Start Writing"
                            ref={newnotedata}
                            rows={1}
                            value={newnotevalue}
                            className='bg-transparent border-none outline-none w-[100%] px-5 resize-none'
                        />
                        :
                        <p className='break-words px-5'>
                            {noteSBigShowData?.text}
                        </p>}



                    <div className='px-5 flex justify-between items-center mt-3'>
                        {isnewNote ? '' : <small>{moment(noteSBigShowData?.time).fromNow()}</small>}


                        {isnewNote ?
                            <div className='btn w-full mt-5 bg-white' onClick={() => { handlenewNote() }}>
                                Save
                            </div>
                            :
                            <button className="btn bg-[#ffffff66] dark:bg-[#66666666]" onClick={() => { handleNoteDelete(noteSBigShowData?.id) }}>
                                <i className="ri-delete-bin-line text-xl text-error"></i>
                            </button>
                        }
                    </div>
                </div>
            </div >
        );
}

export default NoteShowBig;
