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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StEgeo, StRequired } from '../decorators/require-decorators';
import { Order, ORDER_TYPE } from './shared/order';
import { StTableHeader } from './shared/table-header.interface';

@StEgeo()
@Component({
   selector: 'st-table',
   templateUrl: './st-table.component.html',
   styleUrls: ['./st-table.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StTableComponent {
   @Input() @StRequired() fields: StTableHeader[];
   @Input() @StRequired() qaTag: string;
   @Input() header: boolean = true;
   @Input() sortable: boolean = true;
   @Input() currentOrder: Order;
   @Output() changeOrder: EventEmitter<Order> = new EventEmitter();

   public orderTypes: any = ORDER_TYPE;

   public onChangeOrder(field: StTableHeader): void {

      if (field && this.isSortable(field)) {
         if (this.currentOrder && this.currentOrder.orderBy === field.id) {
            this.changeOrderDirection();
         } else {
            this.currentOrder = new Order(field.id, ORDER_TYPE.ASC);
         }
         this.changeOrder.emit(this.currentOrder);
      }

   }

   public isSortable(field: StTableHeader): boolean {
      return field && field.sortable !== undefined ? field.sortable : this.sortable;
   }

   public getHeaderItemClass(field: StTableHeader): string {
      let isOrderAsc = this.isSortedByFieldAndDirection(field, this.orderTypes.ASC);
      return isOrderAsc ? 'icon-arrow2_up' : 'icon-arrow2_down';
   }

   public isSortedByField(field: StTableHeader): boolean {
      return this.currentOrder && this.currentOrder.orderBy === field.id;
   }

   private isSortedByFieldAndDirection(field: StTableHeader, orderType: ORDER_TYPE): boolean {
      return this.isSortedByField(field) && this.currentOrder.type === orderType;
   }

   private changeOrderDirection(): void {
      let newDirection = this.currentOrder.type === ORDER_TYPE.ASC ? ORDER_TYPE.DESC : ORDER_TYPE.ASC;
      this.currentOrder = new Order(this.currentOrder.orderBy, newDirection);
   }
}
