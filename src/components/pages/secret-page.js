import React from 'react';
import {Redirect} from 'react-router-dom';

const SecretPage = ({isLogedIn}) => {

	if (isLogedIn) {
		return (
			<div className="jumbotron text-center">
				<h3>This page is full of secrets!!!</h3>
			</div>
		);
	}

	return <Redirect to="/login" />;
}

export default SecretPage;