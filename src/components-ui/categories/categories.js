import React from 'react';
import PropTypes from 'prop-types';

import './categories.css';

const chosenCategoryClass = (chosenCategory, category) => {
  return chosenCategory 
    && chosenCategory.name === category.name ? 'chosen-category' : '';
}

const Categories = ({ categories, choseCategory, chosenCategory }) => (
  <div className="categories-container">
    {
      categories.map(category =>
        <div
          className={`category-item ${chosenCategoryClass(chosenCategory, category)}`}
          key={category.name}
          onClick={() => choseCategory(category.name)}
        >
          {category.name}
        </div>
      )
    }
  </div>
);

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  choseCategory: PropTypes.func,
};

export default Categories;
