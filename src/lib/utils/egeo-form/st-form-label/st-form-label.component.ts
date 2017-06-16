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
   Input
} from '@angular/core';

import { StFormLabelStatus } from './st-form-label-status.enum';
import { StEgeo, StRequired } from '../../../decorators/require-decorators';

@Component({
   selector: 'st-form-label',
   templateUrl: './st-form-label.component.html',
   styleUrls: ['./st-form-label.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class StFormLabelComponent {
   @Input() label: string = '';
   @Input() @StRequired() qaTag: string;
   @Input() contextualHelp: string;
   @Input() status: StFormLabelStatus;
   @Input() name: string;
   @Input() showTooltipOnClick: boolean = true;
   @Input() labelPosition: 'top' | 'right' | 'left' = 'top';

   getStatusClass(): string {
      switch (this.status) {
         case StFormLabelStatus.DISABLED:
            return 'disabled';
         case StFormLabelStatus.ERROR:
            return 'error';
         case StFormLabelStatus.FOCUS:
            return 'active';
         default:
            return '';
      }
   }

   onTooltipClick(event: MouseEvent): void {
      event.stopPropagation();
      event.preventDefault();
   }

   getPositionClass(): string {
      return `st-form-label__label--${this.labelPosition} sth-form-label__label--${this.labelPosition}`;
   }
}
