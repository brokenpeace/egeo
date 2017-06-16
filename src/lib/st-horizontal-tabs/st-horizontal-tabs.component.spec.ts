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
import { async, TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';

import { StHorizontalTab } from './st-horizontal-tabs.model';
import { StHorizontalTabsComponent } from './st-horizontal-tabs.component';


describe('StHorizontalTabsComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StHorizontalTabsComponent]
      })
         .compileComponents();  // compile template and css
   }));

   let stHorizontalTabsComponent: StHorizontalTabsComponent;
   let fakeOptions: StHorizontalTab[] = [
      { text: 'tab 1', isDisabled: false },
      { text: 'tab 2', isDisabled: false },
      { text: 'tab 3', isDisabled: true }
   ];

   beforeEach(() => {
      stHorizontalTabsComponent = new StHorizontalTabsComponent();

   });

   describe('when it is initialized', () => {
      it('if active option is not defined, first option is activated', () => {
         stHorizontalTabsComponent.activeOption = undefined;
         stHorizontalTabsComponent.qaTag = 'test';
         stHorizontalTabsComponent.options = fakeOptions;
         stHorizontalTabsComponent.ngOnInit();

         expect(stHorizontalTabsComponent.isActive(fakeOptions[0])).toBeTruthy();
         expect(stHorizontalTabsComponent.activeOption).toBe(fakeOptions[0].text);
      });
   });

   it('should be able to return if an option is active', () => {

      stHorizontalTabsComponent.activeOption = fakeOptions[0].text;

      expect(stHorizontalTabsComponent.isActive(fakeOptions[1])).toBeFalsy();
      expect(stHorizontalTabsComponent.isActive(fakeOptions[0])).toBeTruthy();
   });

   describe('should be able to activate an option', () => {

      it('when active option is changed, active option name are updated', () => {
         stHorizontalTabsComponent.activateOption(fakeOptions[1]);

         expect(stHorizontalTabsComponent.activeOption).toBe(fakeOptions[1].text);
      });

      it('when option have isDisabled property like true, active option name does not change', () => {
         stHorizontalTabsComponent.activateOption(fakeOptions[2]);

         expect(stHorizontalTabsComponent.activeOption).not.toBe(fakeOptions[2].text);
      });

      it('when active option is changed, an event is emitted with the active option name', () => {
         spyOn(stHorizontalTabsComponent.changedOption, 'emit');

         stHorizontalTabsComponent.activateOption(fakeOptions[0]);

         expect(stHorizontalTabsComponent.changedOption.emit).toHaveBeenCalledWith(fakeOptions[0].text);
      });

   });
});
