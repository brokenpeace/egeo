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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StDropDownMenuItem } from '../st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown-menu-item',
   templateUrl: './st-dropdown-menu-item.component.html',
   styleUrls: ['./st-dropdown-menu-item.component.scss']
})
export class StDropdownMenuItemComponent implements OnInit {

   @Input() item: StDropDownMenuItem;
   @Input() qaTag: string;
   @Output() change: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   constructor() {
   }

   ngOnInit(): void {
      if (undefined === this.item) {
         throw new Error('Attribute item is required');
      }
   }

   onChangeItem(): void {
      this.change.emit(this.item);
   }
}
