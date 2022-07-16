const getItemsView = (state) => state.itemsView;

export const getStatusFilter = (state) => getItemsView(state).statusFilter;
export const getIsLoading = (state) => getItemsView(state).isLoading;
export const getIsError = (state) => getItemsView(state).isError;
