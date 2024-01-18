import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor() { }
}

export interface RootObjectFee {
  records: RecordFee[];
}
export interface RecordFee {
  id: string;
  createdTime: string;
  fields: FieldsFee;
}
export interface FieldsFee {
  amount: number;
  student_id: string;
  id: number;
  mode_of_transection?: string;
  date_of_transection: string;
  comment:string;
}
