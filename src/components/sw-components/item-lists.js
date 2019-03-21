import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService, withChildFunction, compose } from '../hoc-helpers';

const renderName = ({ name }) => <span>{name}</span>;

const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};

const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};


/*Наглядный пример композиции в виде js кода
Функция, которая принимает x, который передается другой функции g,
а результат выполнения функции g(x) передается функции f,
т.е. одна функция поверх другой функции
const comp = (x) => f(g(x))*/
/*В каждом компоненте берем за основу компонент ItemList,
затем ItemList проходит через функцию withChildFunction, что
в свою очередь создает новый компонент, у которого уже установлена
рендер функция, которая будет рендреить child элементы каждого списка,
затем этот безымянный компонент передаем функции withData,
и эта функция оборачивает этот компонент в ещё более сложный компонент,
который занимается получением данных и обработки ошибок */



const PersonList = compose(
                    withSwapiService(mapPersonMethodsToProps),
                    withData,
                    withChildFunction(renderName)
                   )(ItemList);

const PlanetList = compose(
                    withSwapiService(mapPlanetMethodsToProps),
                    withData,
                    withChildFunction(renderName)
                   )(ItemList);

const StarshipList = compose(
                      withSwapiService(mapStarshipMethodsToProps),
                      withData,
                      withChildFunction(renderModelAndName)
                     )(ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
};
