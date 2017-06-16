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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component
import { StTooltip } from './st-tooltip.component';


let component: StTooltip;
let fixture: ComponentFixture<StTooltip>;
let fakeText: string = 'This text will be displayed in our tooltip';
let nativeElement: any;

describe('StTooltip', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule],
         declarations: [StTooltip]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTooltip);
      component = fixture.componentInstance;
      component.isActive = false;
      nativeElement = fixture.nativeElement;
   });

   it('It has to display a text in its dialog', () => {
      component.text = fakeText;

      fixture.detectChanges();

      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content span').innerHTML).toEqual(fakeText);
   });

   it('It can be configured to be displayed and hidden when user clicks on its associated content', () => {
      component.showOnClick = true;
      component.isActive = false;
      component.text = fakeText;

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').click();
      fixture.detectChanges();

      expect(component.isActive).toBeTruthy();
      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-click')).toBeDefined();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').click();
      fixture.detectChanges();

      expect(component.isActive).toBeFalsy();
      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-click')).toBe(null);
   });

   it('It can be configured to be displayed and hidden when user puts the mouse on its associated content', () => {
      component.showOnClick = false;
      component.isActive = false;
      component.text = fakeText;

      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-hover')).toBeDefined();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseenter'));

      fixture.detectChanges();
      expect(component.isActive).toBeTruthy();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();

      expect(component.isActive).toBeFalsy();
   });

   it('It can be configured to be displayed and hidden when user clicks and hover', () => {
      component.showOnClick = true;
      component.isActive = false;
      component.text = fakeText;

      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-hover')).toBeNull();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseenter'));

      fixture.detectChanges();
      expect(component.isActive).toBeFalsy();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();

      expect(component.isActive).toBeFalsy();
   });
});
