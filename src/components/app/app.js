import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import StarshipDetails from "../sw-components/starship-details";
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage} from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './app.css';



export default class App extends Component {

	/*Назначаем переменной класс с данными*/
	

	/*Состояние, где устанаввливаются флаги на состояние работы "случайной планеты"*/
	state = {
		swapiService: new SwapiService(),
		isLoggedIn: false
	};

	onLogin = () => {
		this.setState({
			isLoggedIn: true
		});
	};

	onServiceChange = () => {
		this.setState(({swapiService}) => {
			const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
			return {
				swapiService: new Service()
			};
		});
	};
	
	
	render() {

		const {isLoggedIn} = this.state;

    return (
      <ErrorBoundry>
      	{/*Устанавливаем провайдер, в который оборачиваем компоненты всего прилоржения,
      	 и передаем ему данные - swapiService*/}
        <SwapiServiceProvider value={this.state.swapiService} >
        	<Router>
	        	<div className="stardb-app">
		            <Header onServiceChange={this.onServiceChange}/>
		            <RandomPlanet />
		           	
		            <Switch>
			            <Route path="/" 
				            	   render = {() =><h2>Welcome to Data Base of Star Wars</h2>}
				            	   exact />
			            <Route path="/people/:id?" component={PeoplePage} />
			            <Route path="/planets" component={PlanetsPage} />
			            <Route path="/starships" component={StarshipsPage} exact />
			            <Route path="/starships/:id"
			            	    render = {({match}) => {
			            	   	const {id} = match.params;
			            	   	return <StarshipDetails itemId={id} />
			            	   }} />
			            <Route 
			            	path="/login"
			            	render = {() => (
			            		<LoginPage 
			            			isLoggedIn={isLoggedIn}
			            			onLogin={this.onLogin} />
			            	)} />
			            	<Route 
				            	path="/secret"
				            	render = {() => (
				            		<SecretPage isLogedIn={isLoggedIn} />
			            	)} />

				            <Route render={() => <h2>Page not found</h2>} />
			           </Switch>


	          	</div>
          	</Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

