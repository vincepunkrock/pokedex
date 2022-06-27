import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListState } from '../models/listState.model';
 
export const getListState = createFeatureSelector<ListState>('listState');

export const getItemCount = createSelector(getListState, (listState: ListState) => listState.itemCount);
export const getUrl = createSelector(getListState, (listState: ListState) => listState.url);
export const getNextUrl = createSelector(getListState, (listState: ListState) => listState.nextUrl);
export const getPreviousUrl = createSelector(getListState, (listState: ListState) => listState.previousUrl);