import React from 'react';

import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = mapMethodsToProps => Wrapped => {
  return props => {
    return (
      <SwapiServiceConsumer>
        {swapiService => {
          const servicesProps = mapMethodsToProps(swapiService);
          return <Wrapped {...props} {...servicesProps} />;
        }}
      </SwapiServiceConsumer>
    );
  };
};

export default withSwapiService;
