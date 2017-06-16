/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'stFilterList'
})
export class StFilterList implements PipeTransform {
   transform(list: any[], field: string, search: string): any[] {
      this.checkParams(field);
      if (list && list.length > 0) {
         return list.filter((element) => this.contains(element, field, search));
      } else {
         return [];
      }
   }

   private contains(element: any, field: string, search: string): boolean {
      if (this.isDefined(element) && this.isString(field) && this.isString(search) && this.isString(element[field])) {
         return element[field].toUpperCase().search(search.toUpperCase()) > -1;
      }
      return false;
   }

   private isDefined(value: any): boolean {
      return value !== undefined && value !== null;
   }

   private isString(value: any): boolean {
      return this.isDefined(value) && typeof value === 'string';
   }

   private checkParams(field: string): void {
      if (!this.isString(field)) {
         throw new Error('PIPE: stFilterList: "field" is a required and string parameter');
      }
   }
}
