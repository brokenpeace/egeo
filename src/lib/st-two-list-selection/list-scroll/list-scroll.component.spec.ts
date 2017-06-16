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
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Http } from '@angular/http';
import { By } from '@angular/platform-browser';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import {
   times as _times,
   cloneDeep as _cloneDeep
} from 'lodash';

// Components
import { ListItemComponent } from '../list-item/list-item.component';
import { ListScrollComponent } from './list-scroll.component';

// Order modules
import { StSearchModule } from '../../st-search/st-search.module';
import { StDropdownModule } from '../../st-dropdown/st-dropdown.module';
import { StCheckboxModule } from '../../st-checkbox/st-checkbox.module';

// Mdel
import { StTwoListSelectionConfig, StTwoListSelectionElement } from '../st-two-list-selection.model';

let comp: ListScrollComponent;
let fixture: ComponentFixture<ListScrollComponent>;
let de: DebugElement;

let listTitle: 'All';
let listSearchPlaceholder: 'Search all';
let qaTag: string = 'st-two-list-test';

function generateData(numData: number): StTwoListSelectionElement[] {
   return _times(10, (i) => {
      return {
         id: i,
         name: i > 5 ? `${i}Element` : `Element${i}`
      };
   });
}

let list: StTwoListSelectionElement[] = generateData(10);

describe('StTwoListSelectionComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StSearchModule, VirtualScrollModule, StDropdownModule, StCheckboxModule],
         declarations: [ListScrollComponent, ListItemComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ListScrollComponent);
      comp = fixture.componentInstance;
      comp.qaTag = qaTag;

   });

   describe('ListScrollComponent', () => {
      it('Should init correctly', () => {
         fixture.detectChanges();
         expect(comp.listQaTag).toEqual(qaTag + '-scroll-list');
      });
   });
});
