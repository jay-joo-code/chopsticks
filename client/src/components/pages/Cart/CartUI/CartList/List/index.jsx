import React from 'react';
import ItemListElt from 'src/components/common/cards/ItemListElt';

const List = ({ cart, selectedItemId, setSelectedItemId }) => (
  <div>
    {cart.map((cartObj) => (
      <ItemListElt
        key={cartObj._id}
        cartObj={cartObj}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
      />
    ))}
  </div>
);

export default List;
