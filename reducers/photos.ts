const types = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const actionCreator = {
  loading: () => ({type: types.LOADING}),
  failure: () => ({type: types.FAILURE}),
  success: (photos: any[], page: number) => ({
    type: types.SUCCESS,
    payload: {photos, page},
  }),
};

export const initialState = {
  loading: false,
  error: false,
  photos: [],
  nextPage: 1,
};

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.LOADING:
      return {...state, loading: true, error: false};
    case types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        photos: [...state.photos, ...action.payload.photos],
        nextPage: state.nextPage + 1,
      };
    case types.FAILURE:
      return {...state, loading: false, error: true};
  }
};
