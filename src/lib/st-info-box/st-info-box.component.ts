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
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
   selector: 'st-info-box',
   templateUrl: './st-info-box.component.html',
   styleUrls: ['./st-info-box.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInfoBoxComponent implements OnInit {
   @Input() icon: string;
   @Input() title: string;

   @Input() width: number;
   @Input() height: number;

   constructor() { }

   ngOnInit(): void {
      if (this.title === undefined) {
         throw new Error('st-info-box: title is a required field');
      }
   }

   getStyles(): Object {
      let result: Object = {};
      if (this.width !== undefined) {
         Object.assign(result, {
            'width': `${this.width}px`,
            'min-width': `${this.width}px`,
            'max-width': `${this.width}px`
         });
      }
      if (this.height !== undefined) {
         Object.assign(result, {
            'height': `${this.height}px`,
            'min-height': `${this.height}px`,
            'max-height': `${this.height}px`
         });
      }
      return result;
   }

}
