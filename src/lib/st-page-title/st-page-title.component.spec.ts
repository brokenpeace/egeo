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
import { FormsModule } from '@angular/forms';

// Component
import { StButtonModule } from '../st-button/st-button.module';
import { StPageTitleComponent } from './st-page-title.component';

let component: StPageTitleComponent;
let fixture: ComponentFixture<StPageTitleComponent>;
let compiled: any;

describe('StPageTitleComponent', () => {
   beforeEach(
      async(() => {
         TestBed.configureTestingModule({
            imports: [StButtonModule, FormsModule],
            declarations: [StPageTitleComponent]
         }).compileComponents(); // compile template and css
      })
   );

   beforeEach(() => {
      fixture = TestBed.createComponent(StPageTitleComponent);
      component = fixture.componentInstance;
      compiled = fixture.debugElement.nativeElement;
      component.qaTag = 'test qaTag';
   });

   it(`Only when there is the input 'leftButton', button is shown before title`, () => {
      component.leftButton = undefined;
      fixture.detectChanges();

      let button: HTMLButtonElement = fixture.nativeElement.querySelector(
         '.st-page-title button'
      );
      expect(button).toBeNull();

      component.leftButton = 'icon-reply';
      fixture.detectChanges();

      button = fixture.nativeElement.querySelector('.st-page-title button');
      expect(button).toBeDefined();
   });

   it('Emit when click on button', () => {
      let responseFunction = jasmine.createSpy('response');

      component.leftButton = 'icon-reply';
      component.clickButton.subscribe(responseFunction);

      fixture.detectChanges();

      let button: DebugElement = fixture.debugElement.query(By.css('button'));
      expect(button).toBeDefined();

      (button.nativeElement as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
   });

   describe('When component is editable', () => {
      it('Render input when it is a page title editable', () => {
         expect(compiled.querySelector('input')).toBeNull();

         component.editable = true;
         fixture.detectChanges();

         expect(compiled.querySelector('input')).toBeDefined();
      });

      it('Should be the focus on the input when clicking on the title', () => {
         component.editable = true;
         fixture.detectChanges();
         component.onClickEdit();
         fixture.detectChanges();

         expect(fixture.componentInstance.focus).toBeTruthy();
      });

      it('Focus should be removed when we exit input', () => {
         component.editable = true;
         fixture.detectChanges();

         let input = fixture.debugElement.query(By.css('input')).nativeElement;
         input.dispatchEvent(new Event('focus'));
         fixture.detectChanges();

         input.dispatchEvent(new Event('blur'));
         expect(fixture.componentInstance.focus).toBeFalsy();
      });

      it('Should change the value of title as input value', () => {
         component.editable = true;
         fixture.detectChanges();

         let input = fixture.debugElement.query(By.css('input')).nativeElement;

         input.value = 'test';
         input.dispatchEvent(new Event('input'));
         fixture.detectChanges();

         expect(fixture.componentInstance.title).toEqual('test');
      });
   });
});
