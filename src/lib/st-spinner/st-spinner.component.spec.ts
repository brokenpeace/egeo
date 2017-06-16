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
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StSpinnerComponent } from './st-spinner.component';

let fixture: ComponentFixture<StSpinnerComponent>;
let comp: StSpinnerComponent;
let imageUrl: string = 'image.jpg';

describe('StSpinnerComponent', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [StSpinnerComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StSpinnerComponent);
      comp = fixture.componentInstance;
      comp.imageUrl = imageUrl;
   });

   it('should have an image with src', () => {
      fixture.detectChanges();
      let image: DebugElement = fixture.debugElement.query(By.css('img'));
      let src: string = image.nativeElement.getAttribute('src');
      expect(src).toBeDefined();
      expect(src).toEqual(imageUrl);
   });
});
