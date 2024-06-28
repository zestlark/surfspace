import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotesBig } from '../app/reducers/appNotesReducer';
import { deletenotes, addNotes } from '../app/reducers/appNotesReducer';
import { appconfirm } from '../app/reducers/overpagesReducer';
import moment from 'moment';

const NoteShowBig = () => {
    const dispatch = useDispatch()

    //const [newNotePlaceHolder, setnewNotePlaceHolder] = useState('Start typing here...')

    const newnotedata = useRef('')

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
        const data = newnotedata.current.innerHTML
        dispatch(addNotes(data))
        document.getElementById('bigNoteBox').click()
    }

    // const handlePlaceHolder = () => {
    //     if (newnotedata.current?.innerHTML) {
    //         setnewNotePlaceHolder('')
    //     } else {
    //         setnewNotePlaceHolder('Start typing here...')
    //     }
    // }

    if (notesBigShowState)
        return (
            <div id='bigNoteBox' className='fixed flex  justify-center items-center w-screen h-screen top-0 left-0 z-30 backdrop-blur-sm' onClick={handleNotesBigClose}>
                <div className="mockup-code max-h-[70%] overflow-scroll no-scrollbar w-[90%] md:w-auto md:max-w-[500px] text-slate-800 slide-top" style={{ background: notesBigShowColor }} onClick={(e) => { e.stopPropagation() }}>
                    {isnewNote ? <p className={`px-5 outline-none`} ref={newnotedata} contentEditable>...</p> : <p className='break-words px-5'>
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
