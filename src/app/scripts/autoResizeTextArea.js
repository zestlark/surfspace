import { useEffect } from "react";

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (textAreaRef, value) => {
    useEffect(() => {
        if (textAreaRef) {
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;
            if (scrollHeight > 350) {
                textAreaRef.style.height = 350 + 'px'
            } else {
                textAreaRef.style.height = scrollHeight + 'px'
            }
        }
    }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
