import { Request, Response } from 'express';
import DashboardQueries from '../services/dashboard';

const service = new DashboardQueries();
const topFivePopularProducts = async (req: Request, res: Response) => {
  try {
    const products = await service.popularProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

export default topFivePopularProducts;
