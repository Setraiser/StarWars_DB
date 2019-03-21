import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service.js';

import './random-planet.css';

export default class RandomPlanet extends Component {

	static defaultProps = {
		updateInterval: 10000
	};

	static propTypes = {
		updateInterval: PropTypes.number
	};

	swapiService = new SwapiService();
	state = {
		planet: {},
		loading: true
	};

	/*componentDidMount - функция react, которая подтверждает, что компонент уже точно подгрузился на странице.
	В данном случае в этой функции указывается, что должно происходить с компонентом, когда он полностью про-
	инициализирован*/
	componentDidMount() {
		const {updateInterval} = this.props;
		/*Вызывает первоначально функцию обновления планеты первый раз*/
		this.updatePlanet();
		/*Ставим интервал обновления плантеы через каждые n секунд*/
		this.interval = setInterval(this.updatePlanet, updateInterval);
	}

	componentWillUnmount() {
	   clearInterval(this.interval);
	}


	onPlanetLoaded = (planet) => {
		this.setState({
			planet,
			loading: false,
			error: false
		});
	};

	onError = (error) => {
		this.setState({
			error: true,
			loading: false
		});
	}

	// локальная функция обновления планеты
	updatePlanet = () => { 
		/*получаем id планеты от 2 до 27 случайным образом, т.к. 
		число может быть не целым, то округляем его к нижнему значению*/
		const id = Math.floor(Math.random()*17) + 2; 
		/*вызываем метод getPlanet из класса swapiServie, который получает id случайным образом, 
		а затем берет данные от полуенного элемента(планеты) и обновляет состояние свойств*/
	    this.swapiService
	      .getPlanet(id)
	      .then(this.onPlanetLoaded)
	      .catch(this.onError);
	}

	render() {

	  const { planet, loading, error } = this.state;
	  const hasData = !(loading || error);

	  const errorMessage = error ? <ErrorIndicator /> : null;
	  const spinner = loading ? <Spinner /> : null;
	  const content = hasData ? <PlanetView planet={planet}/> : null;

	  return (
	    <div className="random-planet jumbotron rounded">
	      {errorMessage}
	      {spinner}
	      {content}
	    </div>
	  );

	}

	

}


const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} 
           alt="planet" />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
