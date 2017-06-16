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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, Renderer} from '@angular/core';

import { EventWindowManager } from '../utils/event-window-manager';

@Component({
   selector: 'st-tooltip',
   templateUrl: './st-tooltip.component.html',
   styleUrls: ['./st-tooltip.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTooltip extends EventWindowManager implements OnDestroy {

   @Input() text: string = '';
   @Input() showOnClick: boolean;
   @Input() qaTag: string;

   constructor(private elementRef: ElementRef, private renderer: Renderer, private cd: ChangeDetectorRef) {
      super(renderer, cd, elementRef);
   }

   openTooltip(): void {
      this.openElement();
   }

   openTooltipOnHover(): void {
      if (!this.showOnClick) {
         this.forceCloseOther();
         this.isActive = true;
      }
   }

   closeTooltipOnHover(): void {
      if (!this.showOnClick) {
         this.isActive = false;
      }
   }

   ngOnDestroy(): void {
      this.closeElement();
   }

}
