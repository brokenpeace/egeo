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

import { StDropDownMenuItem } from '../../st-dropdown-menu/st-dropdown-menu.interface';
import { StEgeo, StRequired } from '../../decorators/require-decorators';
import { StTwoListSelectionElement, StTwoListSelectExtraLabelAction } from '../st-two-list-selection.model';

@Component({
   selector: 'list-scroll',
   templateUrl: './list-scroll.component.html',
   styleUrls: ['./list-scroll.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListScrollComponent {

   @Input() @StRequired() list: StTwoListSelectionElement[];
   @Input() editable: boolean = false;
   @Input() @StRequired() qaTag: string;
   @Input() mode: 'compact' | 'normal' = 'normal';

   @Output() selectItem: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectExtraLabel: EventEmitter<StTwoListSelectExtraLabelAction> = new EventEmitter<StTwoListSelectExtraLabelAction>();
   @Output() search: EventEmitter<string> = new EventEmitter<string>();

   scrollItems: StTwoListSelectionElement[] = [];
   firstEl: number = 0;

   get listQaTag(): string {
      return this.qaTag + '-scroll-list';
   }
}
