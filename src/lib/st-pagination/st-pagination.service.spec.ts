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
import { StPaginationService } from './st-pagination.service';


function generateItems(n: Number): any[] {
   let items: any[] = [];

   for (let i = 1; i <= n; i++) {
      items.push({
         label: 'Example' + i,
         value: i
      });
   }

   return items;
}

describe('StPaginationService', () => {

   let service: StPaginationService;

   beforeEach(() => {
      service = new StPaginationService();
   });

   it('should split list of items', () => {
      let items = generateItems(200);
      items = service.newPage(items, 1, 20);
      expect(items.length).toBe(20);
   });


   it('should change the page and first item value should be 20', () => {
      let items = generateItems(200);
      items = service.newPage(items, 2, 20);
      expect(items[0].value).toBe(21);
   });


   it('should show the last items of the list', () => {
      let items = generateItems(200);
      items = service.newPage(items, 50, 20);
      expect(items[items.length - 1].value).toBe(200);
   });

   it('should show all list of items when perPage is equal or mayor that items length', () => {
      let items = generateItems(200);
      items = service.newPage(items, 50, 300);
      expect(items.length).toBe(200);
   });



});
