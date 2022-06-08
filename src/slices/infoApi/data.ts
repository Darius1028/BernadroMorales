import { createSlice, AnyAction, current } from "@reduxjs/toolkit";
import { getData } from "./data.thunks";
import { RootState } from './../../store';

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

export interface Item {
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  query: string;
  hits: IHits[];
  params: string;
}

export interface dataState {
  loading: boolean;
  error: string | null;
  page: number | null;
  query: string | null;

  params: string;
  items: Item[]; 
}

const initialState: dataState = {
  loading: false,
  error: null,
  page: null,
  query: null,
  params: '',
  items: []
};

const getDataState = (state: RootState): dataState => state.data.list;
const getError = (state: RootState): string | null => getDataState(state).error;
const getLoading = (state: RootState): boolean => getDataState(state).loading;

export const selectors = {
  getError,
  getDataState,
  getLoading,
};

export const extraReducers = {
  [getData.pending.type]: (state: dataState = initialState , action: AnyAction): void => {
    state.loading = true;
    state.error = null;
    state.query = null;
    state.page = null;
    if(!state.items) {
      state.items = [];
    }
  },
  [getData.fulfilled.type]: (state: dataState, {payload}: AnyAction): void => {
    if( payload.data ) 
    {
      state.loading = false;
      state.query = payload.data.query;
      state.page = payload.data.page;
      state.params = payload.data.params;
      if( state.items.filter( item => item.params === payload.data.params).length === 0 )
      {
        state.items = [...state.items, payload.data ];
      }  
    }
  },
  [getData.rejected.type]: (state: dataState, action: AnyAction): void => {
    state.loading = false;
    state.error = action.payload;
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    clearData: (state: dataState) => {
      state.items = [];
    },
  },
  extraReducers,
});

export default dataSlice.reducer;
export const action = {
  ...dataSlice.actions,
  getData,
};
