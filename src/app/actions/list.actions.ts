import { createAction, props } from '@ngrx/store';
import { ListState } from '../models/listState.model';

export const updateListState = createAction(
    '[List] Update list state',
    props<{listState: ListState}>()
);