import { createSlice } from "@reduxjs/toolkit";

export const apptabs = createSlice({
    name: 'apptabs',
    initialState: {
        tabs: [
            {
                "url": "https://www.google.com",
                "title": "Google",
                "icon": "https://www.google.com/favicon.ico"
            },
            {
                "url": "https://www.apple.com",
                "title": "Apple",
                "icon": "https://www.apple.com/favicon.ico"
            },
            {
                "url": "https://www.microsoft.com",
                "title": "Microsoft",
                "icon": "https://www.microsoft.com/favicon.ico"
            },
            {
                "url": "https://www.amazon.com",
                "title": "Amazon",
                "icon": "https://www.amazon.com/favicon.ico"
            },
            {
                "url": "https://www.facebook.com",
                "title": "Facebook",
                "icon": "https://www.facebook.com/favicon.ico"
            },
            {
                "url": "https://www.youtube.com",
                "title": "YouTube",
                "icon": "https://www.youtube.com/favicon.ico"
            },
            {
                "url": "https://www.wikipedia.org",
                "title": "Wikipedia",
                "icon": "https://www.wikipedia.org/static/favicon/wikipedia.ico"
            },
            {
                "url": "https://www.reddit.com",
                "title": "Reddit",
                "icon": "https://www.reddit.com/favicon.ico"
            },
            {
                "url": "https://x.com",
                "title": "Twitter",
                "icon": "https://x.com/favicon.ico"
            },
            {
                "url": "https://www.instagram.com",
                "title": "Instagram",
                "icon": "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://instagram.com&size=256"
            }
        ],
    },
    reducers: {
        addTab: (state, action) => {
            state.tabs.unshift({
                "url": action.payload.url,
                "title": action.payload.title,
                "icon": action.payload.icon
            });
        },
        updateTab: (state, action) => {
            state.tabs[action.payload.id] = { url: action.payload.url, title: action.payload.title, icon: action.payload.icon }
        },

        removeTab: (state, action) => {
            state.tabs.splice(action.payload, 1);
        }
    }
})

export const { addTab, removeTab, updateTab } = apptabs.actions

export default apptabs.reducer;