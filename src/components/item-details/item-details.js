import React, {Component} from 'react';
import Spinner from "../spinner/spinner";
import ErrorButton from "../error-button/error-button";

import './item-details.css';

const Record = ({item, field, label}) => {
	return (
		<li className="list-group-item">
			<span className="term">{label}</span>
		    <span>{item[field]}</span>
		</li>
	);
}

export {
  Record
};

export default class ItemDetails extends Component {

	state = {
		item: null,
		image: null,
		loading: true,
		emptyData: true
	};

	/*При полной инициализации компонента вызывается функция обновления персонажа*/
	componentDidMount() {
		this.updateItem();
	}

	/*Функция Реакта, которая обновляет компонент в случае, когда нововыбранное свойство
	не совпадает с текущим. Для функции обновления компонента всегда нужно в самом начале
	задать условие, при котором она будет выполняться.*/
	componentDidUpdate(prevProps) {

	    if (this.props.itemId !== prevProps.itemId ||
		     this.props.getData !== prevProps.getData ||
		     this.props.getImageUrl !== prevProps.getImageUrl) {
	    	 this.setState({
	    		loading: true
	    	});
	      this.updateItem();

	    }
	}

	/*Функция обновления окна персонажа.*/
	updateItem() {
	    const { itemId, getData, getImageUrl } = this.props;
	    /*Если нет никакого id персонажа, то ничего не возвращаем*/
	    if (!itemId) {
	      return;
	    }

	    /*Если же id был получен, то тогда вызывается функция получения данных персонажа
	    чере класс для работы с даннымы api sw*/
	    getData(itemId)
	      	/*когда получаем данные по заданному запросу id, то
	      	записываем их в person и 
	      	устанавливаем значение состояния загрузки*/
	      	.then((item) => {
	        	this.setState({ 
	        		item,
	        		loading: false,
	        		emptyData: false,
	        		image: getImageUrl(item)
	        	});
	        	
	      	});
  	}

	render() {

	    
	    /*Достаем поля из state*/
	    const {loading, item, emptyData, image} = this.state;
	    /*Если в данный момент состояние загрузки false*/
	    const hasData = !loading;
	    /*Если статус сотсояния загрузки true, то показываем спиннер загрузки*/
	    const spinner = loading ? <Spinner /> : null;
	    const childrenParent = this.props.children;
	    const content = hasData ? <PersonView item={item} image={image} childrenParent={childrenParent}/> : null;
	    

	    /*Если данных ниакаких не загружено, то выдаем сообщнение*/
	    if (emptyData) {
      		return <span>Select a person from a list</span>;
    	}
	    
		return (
	      <div className="item-details card">
	        {spinner}
	        {content}
	      </div>
    	);
	}
}
/*Данный компонент нужен для отрисовки данных*/
const PersonView = ({item, image, childrenParent}) => {
	/*Достаем поля из полученного person*/
	const {name} = item;
	return (
		<React.Fragment>
			<img className="item-image"
	          src={image}
	          alt="item"/>

	        <div className="card-body">
	          <h4>{name}</h4>
	          <ul className="list-group list-group-flush">
	            {
	            	React.Children.map(childrenParent, (child) => {
	            		return React.cloneElement(child, {item});
	            	})
	        	}
	          </ul>
	          <ErrorButton />
	        </div>

		</React.Fragment>
	);
}