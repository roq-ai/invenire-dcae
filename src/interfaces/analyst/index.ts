import { CriteriaInterface } from 'interfaces/criteria';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AnalystInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  criteria?: CriteriaInterface[];
  product?: ProductInterface[];
  user?: UserInterface;
  _count?: {
    criteria?: number;
    product?: number;
  };
}

export interface AnalystGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
