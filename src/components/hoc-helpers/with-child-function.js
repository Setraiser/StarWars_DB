import React from 'react';

/*компонент высшего порядка, который принимает компонент, 
	который буде оборачивать, и функцию, которая будет передвать в качестве props.children*/
const withChildFunction = (fn) => (Wrapped) =>{ 
	/*который возвращает компонент-функцию, который принимает props*/
  return (props) => {
    return (
    	/*и возвращет компонент Wrapped, и передаем ему свойства (props), а в качестве children передаем ему функцию*/
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

export default withChildFunction;