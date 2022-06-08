import { createSlice, AnyAction } from "@reduxjs/toolkit";
import { getData } from "./data.thunks";
import { store, RootState } from './../../store';

export interface IHits {
  objectID: string;
  author: string;
  story_title: string;
  story_url: string;
  created_at: string;
}

export interface IHitsPerPage {
  page: number;
  hits: IHits[];
}

export interface ITypeLanguage {
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  query: string;
  hits: IHits[];
  params: string;
}

export interface LanguagesState {
  loading: boolean;
  error: string | null;
  page: number | null;
  query: string | null;
  data: ITypeLanguage | null;
}

const initialState: LanguagesState = {
  loading: false,
  error: null,
  data: null,
  page: null,
  query: null
};

const getDataState = (state: RootState): LanguagesState => state.data.list;
const getError = (state: RootState): string | null => getDataState(state).error;
const getLoading = (state: RootState): boolean => getDataState(state).loading;

export const selectors = {
  getError,
  getDataState,
  getLoading,
};

export const extraReducers = {
  [getData.pending.type]: (state: LanguagesState, action: AnyAction): void => {
    state.loading = true;
    state.error = null;
    state.query = null;
    state.page = null;
  },
  [getData.fulfilled.type]: (state: LanguagesState, {payload}: AnyAction): void => {

    state.loading = false;
    state.query = payload.data.query;
    state.page = payload.data.page;
    state.data = payload.data;
  },
  [getData.rejected.type]: (state: LanguagesState, action: AnyAction): void => {
    state.loading = false;
    state.error = action.payload;
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    clearData: (state: LanguagesState) => {
      state.data = null;
    },
  },
  extraReducers,
});

export default dataSlice.reducer;
export const action = {
  ...dataSlice.actions,
  getData,
};
