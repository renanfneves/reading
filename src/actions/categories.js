import * as CategoryAPI from '../utils/categoryAPI';

export const CHOSEN_CATEGORY = 'CHOSEN_CATEGORY';
export const AVAILABLE_CATEGORIES = 'AVAILABLE_CATEGORIES';
export const REMOVED_CHOSEN_CATEGORY = 'REMOVED_CHOSEN_CATEGORY';

export const choseCategory = category => ({
  type: CHOSEN_CATEGORY,
  category
});

export const removeChosenCategory = () => ({
  type: REMOVED_CHOSEN_CATEGORY,
});

export const availableCategories = categories => ({
  type: AVAILABLE_CATEGORIES,
  categories
});

export const getCategories = () => dispatch => (
  CategoryAPI
    .getCategories()
      .then(response => dispatch(availableCategories(response.categories)))
);
