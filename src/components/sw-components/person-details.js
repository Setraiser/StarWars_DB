import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';

const PersonDetails = (props) => {
  return (
    <ItemDetails {...props} >
      <Record field="gender" label="Gender" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

/*функция маппинга свойств, которая принимает swapiService, и возвращает объект с
нужными данными в удоном виде*/
const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage
  }
};
/*PersonDetails Оборачивается в withSwapiService для того, чтобы в компоненте
PersonDetails было свойство swapiService*/
export default withSwapiService(mapMethodsToProps)(PersonDetails);