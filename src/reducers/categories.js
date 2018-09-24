import {
  CHOSEN_CATEGORY,
  AVAILABLE_CATEGORIES,
  REMOVED_CHOSEN_CATEGORY
} from '../actions/categories';

const chosenCategory = (state = null, action) => {
  switch (action.type) {
    case CHOSEN_CATEGORY :

      return {
        ...state,
        name: action.category
      };

    case REMOVED_CHOSEN_CATEGORY:
      return null;

    default :
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case AVAILABLE_CATEGORIES :
      const { categories } = action;

      return categories;

    default :
      return state;
  }
};

const categoriesReducer = {
  chosenCategory,
  categories,
};

export default categoriesReducer;
