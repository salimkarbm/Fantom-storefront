import express from 'express';

import topFivePopularProducts from '../handlers/dashboard';

const dashboardRoutes = (app: express.Application): void => {
  app.get('/products/info/top-5-products', topFivePopularProducts);
};

export default dashboardRoutes;
