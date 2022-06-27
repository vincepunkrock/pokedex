import { createReducer, on } from '@ngrx/store';
import * as ListActions from "../actions/list.actions";
import { ListState } from '../models/listState.model';

const initialState: ListState = {
    itemCount: 0,
    url: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150",
    nextUrl: "",
    previousUrl: ""
};

export const listReducer = createReducer(
    initialState, 
    on(ListActions.updateListState, (state, {listState}) => listState)
);