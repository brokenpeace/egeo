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
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class StPaginationService {

   private initItem: number;
   private lastItem: number;

   constructor() {

   }

   newPage(items: any[], currentPage: number, perPage: number): any[] {
      if (currentPage === 1) {
         this.initItem = 0;
      } else {
         this.initItem = perPage * (currentPage - 1);
      }

      if (perPage >= items.length) {
         return Object.assign([], items);
      }

      if (this.initItem >= items.length) {
         this.initItem = items.length - (perPage + 1);
         return Object.assign([], _.takeRight(items, perPage));
      }

      this.lastItem = (this.initItem + perPage);

      return Object.assign([], items.slice(this.initItem, this.lastItem));
   }

}
