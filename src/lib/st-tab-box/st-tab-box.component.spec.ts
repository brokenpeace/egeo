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
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { StTabBoxComponent } from './st-tab-box.component';
import { StTab } from './st-tab-box.interface';


let comp: StTabBoxComponent;
let fixture: ComponentFixture<StTabBoxComponent>;
let de: DebugElement;

let tabs: StTab[] = [
   { label: 'tab1', active: true },
   { label: 'tab2', active: false },
   { label: 'tab3', active: false }
];
let description: string = 'toogle test';
let qaTag: string = 'toogle-test';

describe('StTabBoxComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [RouterTestingModule],
         declarations: [StTabBoxComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTabBoxComponent);
      comp = fixture.componentInstance;

      comp.tabs = tabs;
      comp.qaTag = qaTag;
   });

   it('should init correctly', () => {
      fixture.detectChanges();
      let options: DebugElement[] = fixture.debugElement.queryAll(By.css('.st-tab-box__tab'));

      expect(options).toBeDefined();
      expect(options.length).toEqual(3);

   });

   it('Should emit an event when active tab is clicked', () => {
      fixture.detectChanges();

      let option1: DebugElement = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[0].label}`));
      let option3: DebugElement = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[2].label}`));

      expect(option1).toBeDefined();
      expect(option3).toBeDefined();
      expect(option1.classes['st-tab-box__tab--active']).toBeTruthy();
      expect(option3.classes['st-tab-box__tab--active']).toBeFalsy();

      option3.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      option1 = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[0].label}`));
      option3 = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[2].label}`));

      expect(option1.classes['st-tab-box__tab--active']).toBeFalsy();
      expect(option3.classes['st-tab-box__tab--active']).toBeTruthy();
   });

   it('Should emit an event when active tab is clicked', () => {
      let responseFunction = jasmine.createSpy('response');
      comp.select.subscribe(responseFunction);

      fixture.detectChanges();

      let option2: DebugElement = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[1].label}`));

      expect(option2).toBeDefined();
      expect(option2.classes['st-tab-box__tab--active']).toBeFalsy();

      option2.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      option2 = fixture.debugElement.query(By.css(`#${qaTag}-${tabs[1].label}`));

      expect(option2.classes['st-tab-box__tab--active']).toBeTruthy();
      expect(responseFunction).toHaveBeenCalled();
      expect(responseFunction).toHaveBeenCalledTimes(1);
      expect(responseFunction).toHaveBeenCalledWith({ label: 'tab2', active: true });
   });
});
