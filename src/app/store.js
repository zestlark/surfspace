import { configureStore } from "@reduxjs/toolkit";
import overpagesReducer from "./reducers/overpagesReducer";
import appHistoryReducer from "./reducers/appHistoryReducer";
import appNotesReducer from "./reducers/appNotesReducer";
import appSearchEngineReducer from "./reducers/appSearchEngineReducer";
import appTabsReducer from "./reducers/appTabsReducer";
import appSettingReducer from "./reducers/appSettingReducer";

export const store = configureStore({
    reducer: {
        overpages: overpagesReducer,
        appHistory: appHistoryReducer,
        appNotes: appNotesReducer,
        appSearchEngine: appSearchEngineReducer,
        appTabs: appTabsReducer,
        appsetting: appSettingReducer
    }
})