import React from 'react';
import PropTypes from 'prop-types';

import './item-list.css';

const ItemList = (props) => {

  const { data, onItemSelected, children: renderLabel } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);

    ItemList.defaultProps = {
      onItemSelected: () => {}
    };

    ItemList.propTypes = {
      onItemSelected: PropTypes.func,
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      children: PropTypes.func.isRequired
    }

    return (
      <li className="list-group-item"
          key={id}
          onClick={() => onItemSelected(id)}>
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

export default ItemList;