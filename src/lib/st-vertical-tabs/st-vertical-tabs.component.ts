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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
   selector: 'st-vertical-tabs',
   templateUrl: './st-vertical-tabs.component.html',
   styleUrls: ['./st-vertical-tabs.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StVerticalTabsComponent implements OnInit {
   @Input() activeOption: string;
   @Input() options: string[];
   @Input() qaTag: string;
   @Output() changeOption: EventEmitter<string> = new EventEmitter<string>();

   activeOptionIndex: number = 0;
   arrowMovement: number = 39;
   arrowMargin: number = 0;

   constructor() { }

   ngOnInit(): void {
      if (!this.qaTag) {
         throw new Error('qaTag is a required field');
      }
      if (this.options && this.options.length > 0) {
         if (this.activeOption) {
            this.changeActive(this.activeOption);
         } else {
            this.activeFirstOption();
         }
      } else {
         throw new Error('options is a required field');
      }
   }

   ngOnChanges(changes: any): void {
      if (changes && changes.activeOption) {
         this.changeActive(changes.activeOption.currentValue);
      }
   }

   isActive(optionName: string): boolean {
      return this.activeOption === optionName;
   }

   activateOption(optionName: string): void {
      this.changeActive(optionName);
      this.changeOption.emit(optionName);
   }

   private changeActive(optionName: string): void {
      this.activeOption = optionName;
      this.activeOptionIndex = this.options.indexOf(optionName);
      if (this.activeOptionIndex < 0) {
         this.activeFirstOption();
      }
   }

   private activeFirstOption(): void {
      this.changeActive(this.options[0]);
   }
}
