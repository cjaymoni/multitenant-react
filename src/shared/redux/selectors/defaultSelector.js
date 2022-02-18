import { createSelector } from 'reselect';

// Arrow function, direct lookup
const selectEntities = state => state.entities;

// Function declaration, mapping over an array to derive values
function selectItemIds(state) {
  return state.items.map(item => item.id);
}

// Function declaration, encapsulating a deep lookup
function selectSomeSpecificField(state) {
  return state.some.deeply.nested.field;
}

// Arrow function, deriving values from an array
const selectItemsWhoseNamesStartWith = (items, namePrefix) =>
  items.filter(item => item.name.startsWith(namePrefix));

const selectItemsByCategory = createSelector(
  [
    // Usual first input - extract value from `state`
    state => state.items,
    // Take the second arg, `category`, and forward to the output selector
    (state, category) => category,
  ],
  // Output selector gets (`items, category)` as args
  (items, category) => items.filter(item => item.category === category)
);

const makeSelectItemsByCategory = () => {
  const selectItemsByCategory = createSelector(
    [state => state.items, (state, category) => category],
    (items, category) => items.filter(item => item.category === category)
  );
  return selectItemsByCategory;
};
