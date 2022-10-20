import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
    console.log('1');
    return state.categories;
};

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log('2');
        return categoriesSlice.categories;
    }
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        console.log('3');
        return categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {});
    }
);

// export const selectCategoriesMap = (state) => {
//     console.log('1');
//     return state.categories.categories.reduce((acc, category) => {
//         const { title, items } = category;
//         acc[title.toLowerCase()] = items;
//         return acc;
//     }, {});
// };
