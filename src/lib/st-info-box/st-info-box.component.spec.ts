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
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StInfoBoxComponent } from './st-info-box.component';


let title: string = 'title';
let width: number = 100;
let height: number = 100;
let fixture: ComponentFixture<StInfoBoxComponent>;

describe('StInfoBoxComponent', () => {

    let comp: StInfoBoxComponent;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StInfoBoxComponent]
      })
      .compileComponents();  // compile template and css
   }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StInfoBoxComponent);
        comp = fixture.componentInstance;
    });

    describe('if title is not defined', () => {
        it('should throw an error', () => {
           expect(() => comp.ngOnInit()).toThrowError('st-info-box: title is a required field');
        });
    });

    describe('if title is defined', () => {
        beforeEach(() => {
            comp.title = title;
        });

        it('should not throw an error on init', () => {
            expect(() => comp.ngOnInit()).not.toThrowError();
        });

        it('if the width is defined, width, min-width and max-width styles must be defined', () => {
            comp.width = width;
            let result: any = comp.getStyles();
            expect(result.width).toEqual(`${width}px`);
            expect(result['min-width']).toBeDefined();
            expect(result['max-width']).toBeDefined();
        });

        it('if the height is defined, height, min-height and max height styles must be defined', () => {
            comp.height = height;
            let result: any = comp.getStyles();
            expect(result.height).toEqual(`${height}px`);
            expect(result['min-height']).toBeDefined();
            expect(result['max-height']).toBeDefined();
        });

        it('if icon is defined, an icon must be showed', () => {
            comp.icon = 'spark';
            fixture.detectChanges();
            let icon: DebugElement = fixture.debugElement.query(By.css('.st-info-box__header__icon'));
            expect(icon.nativeElement).toBeDefined();
        });
    });
});
