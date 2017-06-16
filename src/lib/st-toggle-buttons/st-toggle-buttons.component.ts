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
import { StToggleButton } from './st-toggle-buttons.interface';

@Component({
   selector: 'st-toggle-buttons',
   templateUrl: './st-toggle-buttons.component.html',
   styleUrls: ['./st-toggle-buttons.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StToggleButtonsComponent {
   @Input() tabs: StToggleButton[] = [];
   @Input() description: string;
   @Input() qaTag: string;
   @Output() select: EventEmitter<StToggleButton> = new EventEmitter<StToggleButton>();

   onClick(selectedTab: StToggleButton): void {
      for (let tab of this.tabs) {
         tab.active = false;
      }
      selectedTab.active = true;
      this.select.emit(selectedTab);
   }
}
