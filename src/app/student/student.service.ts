import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  student = signal<FieldsStudent>({} as FieldsStudent);

  selectedStandard = signal<Standard>({name:"# All",id:"all"} as Standard);

  constructor() { }
}
export interface RootObjectStudent {
  records: RecordStudent[];
}
export interface RecordStudent {
  id: string;
  createdTime: string;
  fields: FieldsStudent;
}
export interface FieldsStudent {
  last_name: string;
  first_name: string;
  standard: string;
  parents_name: string;
  parents_mobile: string;
  comment: string;
  id: string;
  gender: string;
  date_of_birth: string;
  school_name: string;
  date_of_admission: string;
}

export interface Standard{
  name: string;
  id:string;
}