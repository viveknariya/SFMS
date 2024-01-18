import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirtableService {

  constructor() { }
}

export const AirtableConstant = {
  "Token" : "patBeiSUgBWkHpsc0.241f2da7499a34f8479f88367d6f10e468fa4530bedc3426c62e96953fd0e01b",
  "BaseId_SFMS" : "appRKS3HtwJJg6jMv",
  "TableId_Student": "tbleA4PW0oqduyY48",
  "TableId_Fee_transection":"tblLbV4IZO6XuOize"
}

export const airtableAPI = {
  "List_bases" : "https://api.airtable.com/v0/meta/bases"
}

export interface RootObjectListBases {
  bases: Base[];
  offset: string;
}
export interface Base {
  id: string;
  name: string;
  permissionLevel: string;
}

export interface RootObjectGetbaseschema {
  tables: Table[];
}
export interface Table {
  description?: string;
  fields: Field[];
  id: string;
  name: string;
  primaryFieldId: string;
  views: View[];
}
export interface View {
  id: string;
  name: string;
  type: string;
}
export interface Field {
  description?: string;
  id: string;
  name: string;
  type: string;
  options?: Options;
}
interface Options {
  inverseLinkFieldId: string;
  isReversed: boolean;
  linkedTableId: string;
  prefersSingleRecordLink: boolean;
  isValid?: boolean;
  formula?: string;
  referencedFieldIds?: string[];
  result?: Result;
  choices?: Choice[];
  dateFormat?: DateFormat;
  precision?: number;
}
interface Choice {
  id: string;
  name: string;
  color: string;
}
interface Result {
  type: string;
  options?: Options;
}
interface DateFormat {
  name: string;
  format: string;
}
