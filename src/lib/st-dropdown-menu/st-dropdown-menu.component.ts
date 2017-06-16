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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StDropDownMenuGroup, StDropDownMenuItem } from './st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown-menu',
   templateUrl: './st-dropdown-menu.component.html',
   styleUrls: ['./st-dropdown-menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownMenuComponent implements OnInit {

   @Input() active: boolean;
   @Input() items: StDropDownMenuItem[] | StDropDownMenuGroup[];
   @Output() change: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   private itemsGroup: StDropDownMenuGroup[] = [];

   constructor() {
   }

   ngOnInit(): void {

      if (undefined === this.items) {
         throw new Error('Attribute items is required');
      }

      this.checkGroup();
   }

   ngOnChanges(values: any): void {
      if (values.items) {
         this.checkGroup();
      }
   }

   checkGroup(): void {
      if (this.isDropDownGroup(this.items)) {
         this.itemsGroup = this.items;
      }
   }

   isDropDownGroup(value: StDropDownMenuItem[] | StDropDownMenuGroup[]): value is StDropDownMenuGroup[] {
      return value && value.length > 0 && (<StDropDownMenuGroup>value[0]).title !== undefined;
   }

   onChange(value: StDropDownMenuItem): void {
      this.change.emit(value);
   }



}

