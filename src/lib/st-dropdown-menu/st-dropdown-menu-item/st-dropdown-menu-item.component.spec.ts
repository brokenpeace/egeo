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
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StDropDownMenuItem } from '../st-dropdown-menu.interface';
import { StDropdownMenuItemComponent } from './st-dropdown-menu-item.component';

let item: StDropDownMenuItem = {
   label: 'example 1',
   value: 1
};

describe('StDropdownMenuItemComponent', () => {

   let component: StDropdownMenuItemComponent;
   let fixture: ComponentFixture<StDropdownMenuItemComponent>;
   let de: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StDropdownMenuItemComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StDropdownMenuItemComponent);
      component = fixture.componentInstance;
   });

   it('should throw an error for missing item attribute', () => {
      expect(() => component.ngOnInit()).toThrowError('Attribute item is required');
   });

   it('should show value 1 in item in component', () => {
      component.item = item;
      fixture.detectChanges();
      expect(component.item.value).toBe(1);
   });

   it('should click item and dispatch event change with value of item', () => {
      spyOn(component.change, 'emit');
      component.item = item;
      let itemElement = fixture.nativeElement.querySelector('li');
      itemElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(component.change.emit).toHaveBeenCalledWith(item);
   });


});
