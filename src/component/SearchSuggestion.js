import React, { useEffect, useState } from 'react';

const SearchSuggestion = ({ searchValue, handleSearchSuggestion, handleDirectSearch }) => {
    const [suggestions, setSuggestions] = useState([]);

    const fetchAutocompleteSuggestions = (searchTerm) => {
        if (searchTerm) {
            // Remove previous script tags
            const scripts = document.querySelectorAll('#searchfunctionscript');
            scripts.forEach(script => script.parentNode.removeChild(script));

            // Create new script element
            const script = document.createElement('script');
            script.id = 'searchfunctionscript';
            script.src = `https://www.google.com/complete/search?client=hp&q=${searchTerm}&callback=mysearchFunction`;
            document.body.appendChild(script);
        }
    };

    window.mysearchFunction = (data) => {
        setSuggestions(data[1]);
    };

    useEffect(() => {
        fetchAutocompleteSuggestions(searchValue);
    }, [searchValue]);

    const cleanTextData = (data) => {
        const div = document.createElement('div');
        div.innerHTML = data
        const text = div.textContent
        return text;
    }

    const handleDirectSearchCall = (data) => {
        console.log('called');
        handleDirectSearch(cleanTextData(data))
    }

    const handleAutoCompleteSuggestions = (data) => {
        const text = cleanTextData(data)
        handleSearchSuggestion(text)
    }

    const handleListEnter = (e) => {
        e.preventDefault()
        if (e.keyCode === 40) {
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.focus()
            } else {
                e.target.parentNode.firstChild.focus()
            }
        }
        else if (e.keyCode === 38) {
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus()
            } else {
                e.target.parentNode.lastChild.focus()
            }
        }
        else if (e.keyCode === 13)
            e.target.click()
    }
    return (
        <div id='search-suggestion'>
            {suggestions.map((e, index) => (
                <button key={index} onKeyDown={handleListEnter} onClick={() => { handleAutoCompleteSuggestions(e[0]) }} className='list-none flex w-full justify-start px-3 items-center py-2 focus:bg-slate-200 selection:bg-red-500 dark:focus:bg-slate-700 gap-1 outline-none'>
                    <i className="ri-search-line w-10 text-xl mx-[5px] flex justify-start"></i>
                    <span className='flex justify-between w-full items-center max-w-[89%] lg:max-w-full'>
                        <p className='truncate max-w-[90%] opacity-80' dangerouslySetInnerHTML={{ __html: e[0] }} onClick={(event) => { event.stopPropagation(); handleDirectSearchCall(e[0]) }}></p>
                        <i className="ri-arrow-left-up-line text-xl opacity-80 float-right"></i>
                    </span>
                </button>
            ))}
        </div>
    );
}

export default SearchSuggestion;
