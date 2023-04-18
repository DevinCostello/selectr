import { useReducer } from "react";
import type { ListType } from './components/List'


  type Action =
    | { type: 'ADD_ITEM'; payload: string }
    | { type: 'DELETE_ITEM', payload: number }
    | { type: 'CHANGE_TITLE', payload: string };

  function reducer(state: ListType, action: Action): ListType {
    switch (action.type) {
     case 'ADD_ITEM': {
      return {
        ...state,
        content: [...state.content, action.payload],
      }}
     case 'DELETE_ITEM': {
      return {
        ...state,
        content: state.content.filter((item: string, index: number) => index !== action.payload),
      };
     }
     case 'CHANGE_TITLE': {
      return {...state, name: action.payload}
     }
      default:
        throw new Error('Unexpected action');
    }
  }


  export function useListReducer(initialState: ListType) {
    const [state, dispatch] = useReducer(reducer, initialState)

    function addItem(item: string) {
      dispatch({type: "ADD_ITEM", payload: item})
    }
    function deleteItem(item: number) {
      dispatch({type: "DELETE_ITEM", payload: item})
    }
    function changeTitle(title: string) {
      dispatch({type: "CHANGE_TITLE", payload: title})
    }

    return { state, addItem, deleteItem, changeTitle }
    
  }