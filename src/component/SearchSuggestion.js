import React, { useEffect } from 'react';

const SearchSuggestion = ({ searchValue, handleSearchSuggestion }) => {
    // const arrayy = [1, 2, 3, 4, 5]

    const handleAutoCompleteSuggestions = (data) => {
        const div = document.createElement('div');
        div.innerHTML = data
        const text = div.textContent
        handleSearchSuggestion(text)
    }

    useEffect(() => {
        const fetchAutocompleteSuggestions = (searchTerm) => {
            if (searchTerm) {
                const scripts = document.querySelectorAll('#searchfunctionscript');
                scripts.forEach(script => script.parentNode.removeChild(script));

                const script = document.createElement('script');
                script.id = 'searchfunctionscript';
                script.src = `https://www.google.com/complete/search?client=hp&q=${searchTerm}&callback=mysearchFunction`;
                document.body.appendChild(script);
            }
        };

        fetchAutocompleteSuggestions(searchValue)
    }, [searchValue])
    return (
        <div>
            {window.mysearchAutoComplete.map((e, index) => (
                <li key={index} onClick={() => { handleAutoCompleteSuggestions(e[0]) }} className='list-none flex justify-start px-3 items-center py-2 focus:bg-slate-200 dark:focus:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 gap-1'>
                    <i className="ri-search-line w-10 text-xl mx-[5px]"></i>
                    <span className='flex justify-between w-full items-center max-w-[89%] lg:max-w-full'>
                        <p className='truncate max-w-[90%] opacity-80' dangerouslySetInnerHTML={{ __html: e[0] }}></p>
                        <i className="ri-arrow-left-up-line text-xl opacity-80 float-right"></i>
                    </span>
                </li>
            ))}
        </div>
    );
}

export default SearchSuggestion;
