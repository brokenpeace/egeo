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
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StRadioMenuOption } from './st-radio-menu-option.interface';
import { StRadioMenuComponent } from './st-radio-menu.component';

describe('StRadioMenuComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [StRadioMenuComponent],
         imports: [RouterTestingModule],
         providers: [],
         schemas: [NO_ERRORS_SCHEMA]
      });
   });

   let stRadioMenuComponent: StRadioMenuComponent;
   let activeOption: StRadioMenuOption;
   beforeEach(() => {
      stRadioMenuComponent = new StRadioMenuComponent();
      activeOption = {
         label: 'active option name',
         value: 'active option value'
      };
      stRadioMenuComponent.activeOption = activeOption;
   });

   it('should be able to return if an option is active', () => {
      let anotherOption: StRadioMenuOption = {
         label: 'no active option name',
         value: 'no active option value'
      };
      expect(stRadioMenuComponent.isActive(anotherOption)).toBeFalsy();
      expect(stRadioMenuComponent.isActive(activeOption)).toBeTruthy();
   });

   describe('should be able to activate an option', () => {
      it('when active option is changed, it is updated', () => {
         stRadioMenuComponent.activateOption(activeOption);

         expect(stRadioMenuComponent.activeOption).toBe(activeOption);
      });

      it('when active option is changed, an event is emitted with the active option', () => {
         spyOn(stRadioMenuComponent.changedOption, 'emit');

         stRadioMenuComponent.activateOption(activeOption);

         expect(stRadioMenuComponent.changedOption.emit).toHaveBeenCalledWith(
            activeOption
         );
      });
   });
});
