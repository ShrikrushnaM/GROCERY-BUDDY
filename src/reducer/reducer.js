function getLocalStorage() {
    const list = localStorage.getItem("list");
    if (list) {
        return JSON.parse(localStorage.getItem("list"));
    } else {
      localStorage.setItem("masterList", JSON.stringify([]));
      return [];
    }
}
  
function reducer(currentState = getLocalStorage(), action) {
    switch (action.type) {
      case "ADD_ITEM_TO_LIST":
        return [...currentState, action.payload];
      case "REMOVE_ITEM":
        return [...action.payload];
      case "EDIT_ITEM":
        return [...action.payload];
      case "CLEAR_LIST":
        return [];
      case "SORT_ASC":
        return [...action.payload];
      case "SORT_DESC":
        return [...action.payload];
      case "SEARCH_ITEM":
        return [...action.payload];
      default:
        return currentState;
    }
  }
  
export default reducer;