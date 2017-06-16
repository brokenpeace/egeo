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
import {
   ChangeDetectionStrategy,
   Component,
   EventEmitter,
   Input,
   Output
} from '@angular/core';
import { StRadioMenuOption } from './st-radio-menu-option.interface';
@Component({
   selector: 'st-radio-menu',
   templateUrl: './st-radio-menu.component.html',
   styleUrls: ['./st-radio-menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
      '[class]': 'theme'
   }
})
export class StRadioMenuComponent {
   @Input() activeOption: StRadioMenuOption;
   @Input() options: StRadioMenuOption[];
   @Input() qaTag: string;
   @Input() theme: string;
   @Output() changedOption: EventEmitter<any> = new EventEmitter<any>();

   constructor() {}

   isActive(option: StRadioMenuOption): boolean {
      return (
         this.activeOption !== undefined &&
         this.activeOption.value === option.value
      );
   }

   activateOption(option: StRadioMenuOption): void {
      this.activeOption = option;
      this.changedOption.emit(option);
   }

   checkedOption(option: StRadioMenuOption): boolean {
      if (!this.activeOption) {
         return false;
      }

      if (this.activeOption.value === option.value) {
         return true;
      }
      return false;
   }
}
