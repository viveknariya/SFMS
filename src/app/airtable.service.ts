import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirtableService {

  constructor() { }
}

export const AirtableConstant = {
  "Token" : "patBeiSUgBWkHpsc0.241f2da7499a34f8479f88367d6f10e468fa4530bedc3426c62e96953fd0e01b",
  "BaseId" : "appBxNZiIBQYZkaty",
  "BaseId_SFMS" : "appRKS3HtwJJg6jMv"
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
export interface Options {
  inverseLinkFieldId: string;
  isReversed: boolean;
  linkedTableId: string;
  prefersSingleRecordLink: boolean;
}
