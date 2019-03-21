import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';
/*Компонент принимает компонент Wrapped, mapMethodsToProps, и возвращает компонент функцию, которая принимает props*/
const withSwapiService = (mapMethodsToProps) => (Wrapped) =>{

  return (props) => {
    /*При помощи консьюмера передем в компонент Wrapped данные из swapiService*/
    return (
      /*Оборачиваем компонент в консьюмер, который принимает swapiSerwice из провайдера*/
      <SwapiServiceConsumer>
        {
          (swapiService) => {
            /*функция для более лаконичного доступа к получения данных*/
            const serviceProps = mapMethodsToProps(swapiService);

            return (
              <Wrapped {...props} {...serviceProps} />
            );
          }
        }
      </SwapiServiceConsumer>
    );
  }
};

export default withSwapiService;