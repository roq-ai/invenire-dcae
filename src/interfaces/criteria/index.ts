import { AnalystInterface } from 'interfaces/analyst';
import { GetQueryInterface } from 'interfaces';

export interface CriteriaInterface {
  id?: string;
  criteria: string;
  analyst_id?: string;
  created_at?: any;
  updated_at?: any;

  analyst?: AnalystInterface;
  _count?: {};
}

export interface CriteriaGetQueryInterface extends GetQueryInterface {
  id?: string;
  criteria?: string;
  analyst_id?: string;
}
