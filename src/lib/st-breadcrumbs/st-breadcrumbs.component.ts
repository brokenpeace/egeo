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

@Component({
   selector: 'st-breadcrumbs',
   templateUrl: './st-breadcrumbs.html',
   styleUrls: ['./st-breadcrumbs.scss']
})
export class StBreadCrumbs implements OnInit {
   @Input() options: string[];
   @Input() qaTag: string;
   @Output() changeOption: EventEmitter<number> = new EventEmitter<number>();

   ngOnInit(): void {
      if (!this.qaTag) {
         throw new Error('qaTag is a necesary field');
      }
   }

   public generateCrumbs(): string[] {
      if (this.options.length <= 6) {
         return [...this.options];
      } else {
         return this.options
            .slice(0, 1)
            .concat(['...'])
            .concat(this.options.slice(-4));
      }
   }

   public onSelect(index: number): void {
      if (index + 1 < this.options.length) {
         if (this.options.length <= 6 || index === 0) {
            this.changeOption.emit(index);
         } else {
            let calculatedIndex: number;
            calculatedIndex = this.options.length - (6 - index);
            this.changeOption.emit(calculatedIndex);
         }
      }
   }
}
