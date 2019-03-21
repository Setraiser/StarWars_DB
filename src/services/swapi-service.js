/*Код - который работает с сетью, лучше всег овынести в отдельный класс*/

export default class SwapiService { //класс для удобной работы с запросами с сервера-api(swapi)

	_apiBase = 'https://swapi.co/api'; // статичная переменная класса, не предназначенная для изменений
	_imageBase = 'https://starwars-visualguide.com/assets/img'; /*Статичная переменная для обозначения корня картинок*/

	 getResource = async (url) => { /*асинхронная функция подключения к основе сервера*/
		const res = await fetch(`${this._apiBase}${url}`);/*ждем получения результата с сервера по заданному адресу*/
		if (!res.ok) {// если дождавшись ответа мы получаем результат не "ок", т.е. не в диапозоне 200-299
			throw new Error(`Could not fetch ${url}, received ${res.status}`) /*то выводим ошибку с адресом,
		куда посылали запрос, и статус (код ответа, например 404)*/
		}
		return await res.json();/*если реузльтат был получен как "ок", то ждем поучения результата как json*/	
	};

	getAllPeople = async () => { /*асинхронная функция для получения раздела с сервара, в данном случае идет 
		получение списка всех людей*/
		const res = await this.getResource(`/people/`); // ждем получения результата запроса
		return res.results.map(this._transformPerson); // возвращаем его
	};

	getPerson = async (id) => {
		const person = await this.getResource(`/people/${id}/`);
		return this._transformPerson(person);
	};

 	getAllPlanets = async () => {
		const res = await this.getResource(`/planets/`);
		return res.results.map(this._transformPlanet);
	};

	getPlanet = async (id) => {
	    const planet = await this.getResource(`/planets/${id}/`);
	    return this._transformPlanet(planet);
  	};

	getAllStarships = async () => {
		const res = await this.getResource(`/starships/`);
		return res.results.map(this._transformStarship);
	};

	getStarship = async (id) => {
		const starship = await this.getResource(`/starships/${id}`);
		return this._transformStarship(starship);
	};

	getPersonImage = ({id}) => {
    	return `${this._imageBase}/characters/${id}.jpg`
  	};

  	getStarshipImage = ({id}) => {
		return `${this._imageBase}/starships/${id}.jpg`
	};

	getPlanetImage = ({id}) => {
    	return `${this._imageBase}/planets/${id}.jpg`
  	};

	_extractId = (item) => {
		/*Т.к. в api нет конкретного id, а только url, где id прописан в конце ссылки
		пишется регулярное выражение, чтобы трансформировать данные так как нужно,
		т.е. из ссылки получить только id.
		Для нахождения числа на конце ссылки, нужно найти число перед последним слешем*/
		const idRegExp = /\/([0-9]*)\/$/;
		/*Так как в регулярном выражении выделена конкретная группа(первая, которая в скобках),
		а не 0, которая буде являться просто слешем, то в функции match, которая применяет к url полуенного
		элемента, приписывается [1], т.е. искать только 1 группу регулярного выражения*/
		return item.url.match(idRegExp)[1];
	};

	_transformPlanet = (planet) => {
		return {
			id: this._extractId(planet),
			name: planet.name,
			population: planet.population,
			rotationPeriod: planet.rotation_period,
			diameter: planet.diameter

		}
	};

	_transformStarship = (starship) => {
	    return {
	      id: this._extractId(starship),
	      name: starship.name,
	      model: starship.model,
	      manufacturer: starship.manufacturer,
	      costInCredits: starship.cost_in_credits,
	      length: starship.length,
	      crew: starship.crew,
	      passengers: starship.passengers,
	      cargoCapacity: starship.cargoCapacity
	    }
  	};

	_transformPerson = (person) => {
	    return {
	      id: this._extractId(person),
	      name: person.name,
	      gender: person.gender,
	      birthYear: person.birth_year,
      	  eyeColor: person.eye_color
	    }
	};


}
