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
import { StHorizontalTab } from './st-horizontal-tabs.model';

@Component({
   selector: 'st-horizontal-tabs',
   templateUrl: './st-horizontal-tabs.component.html',
   styleUrls: ['./st-horizontal-tabs.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StHorizontalTabsComponent implements OnInit {
   @Input() activeOption: string;
   @Input() options: StHorizontalTab[];
   @Input() qaTag: string;
   @Output() changedOption: EventEmitter<any> = new EventEmitter<any>();

   ngOnInit(): void {
      if (this.options === undefined || this.qaTag === undefined) {
         throw new Error('Attribute options and qaTag is required, please review it');
      }

      if (this.options && this.options.length > 0 && !this.activeOption) {
         this.activateOption(this.options[0]);
      }
   }

   isActive(option: StHorizontalTab): boolean {
      return this.activeOption === option.text && !option.isDisabled;
   }

   activateOption(option: StHorizontalTab): void {
      if (option.isDisabled) {
         return;
      }
      this.activeOption = option.text;
      this.changedOption.emit(option.text);
   }
}
