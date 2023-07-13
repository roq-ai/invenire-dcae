import { AnalystInterface } from 'interfaces/analyst';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  product_name: string;
  analyst_id?: string;
  created_at?: any;
  updated_at?: any;

  analyst?: AnalystInterface;
  _count?: {};
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_name?: string;
  analyst_id?: string;
}
