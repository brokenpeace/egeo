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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { StTab } from './st-tab-box.interface';

@Component({
   selector: 'st-tab-box',
   templateUrl: './st-tab-box.component.html',
   styleUrls: ['./st-tab-box.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StTabBoxComponent {
   @Input() tabs: StTab[] = [];
   @Input() qaTag: string;
   @Output() select: EventEmitter<StTab> = new EventEmitter<StTab>();

   constructor(private _cd: ChangeDetectorRef) { }

   onClick(selectedTab: StTab): void {
      this.tabs = Object.assign([], this.tabs.map((tab) => {
         if (tab.label === selectedTab.label) {
            return Object.assign({}, tab, { active: true });
         } else {
            return Object.assign({}, tab, { active: false });
         }
      }));
      this._cd.markForCheck();
      this.select.emit(Object.assign({}, selectedTab, { active: true }));
   }

   getTabWidth(): string {
      return `${(100 / this.tabs.length).toFixed(2)}%`;
   }

   getTabClass(tab: StTab, i: number): string {
      let classes: string = tab.active ? 'st-tab-box__tab--active sth-tab-box__tab--active' : '';
      classes += i === 0 && !tab.active ? ' sth-tab-box-right-shadow' : '';
      classes += i !== 0 && !tab.active ? ' sth-tab-box-left-shadow' : '';
      return classes.trim();
   }
}
