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

// Components
import { ListItemComponent } from './list-item.component';

// Model
import { StTwoListSelectionElement } from '../st-two-list-selection.model';

// Other
import { StCheckboxModule } from '../../st-checkbox/st-checkbox.module';

let comp: ListItemComponent;
let fixture: ComponentFixture<ListItemComponent>;
let de: DebugElement;
let qaTag: string = 'st-two-list-test';
let element: StTwoListSelectionElement = {
   id: 1,
   name: 'test'
};

describe('StTwoListSelectionComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StCheckboxModule],
         declarations: [ListItemComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ListItemComponent);
      comp = fixture.componentInstance;
      comp.qaTag = qaTag;
      comp.item = element;
   });

   describe('ListItemComponent', () => {
      it('Should init correctly', () => {
         fixture.detectChanges();
         expect(comp.itemName).toEqual(element.name);
         expect(comp.itemQaTag).toEqual(qaTag + '-item-' + element.id);
         expect(comp.itemMode).toEqual('item-normal sth-two-list-selection__item-normal');
         expect(comp.selected).toBe(false);

         let input: DebugElement = fixture.debugElement.query(By.css('input'));
         expect(input).toBeNull();

         comp.mode = 'compact';
         fixture.detectChanges();
         expect(comp.itemMode).toEqual('item-compact sth-two-list-selection__item-compact');
      });

      it('Should emit when select item', () => {
         let outputSelect = jasmine.createSpy('responseSelect');

         comp.selectItem.subscribe(outputSelect);
         comp.editable = true;
         fixture.detectChanges();
         let input: DebugElement = fixture.debugElement.query(By.css('input'));

         expect(input).toBeDefined();
         (input.nativeElement as HTMLInputElement).click();
         input.nativeElement.dispatchEvent(new Event('input'));
         fixture.detectChanges();

         expect(outputSelect).toHaveBeenCalled();
         expect(outputSelect).toHaveBeenCalledWith(element);
      });

      it('Should emit when select extraLabel', () => {
         let outputSelect = jasmine.createSpy('responseSelect');
         let extraItem = Object.assign({}, element, {extraLabel: '<p>test</p>'});

         comp.selectExtraLabel.subscribe(outputSelect);
         comp.editable = true;
         comp.item = extraItem;
         fixture.detectChanges();

         let extraLabel: DebugElement = fixture.debugElement.query(By.css('.extraLabel'));
         expect(extraLabel).toBeDefined();
         expect((extraLabel.nativeElement as HTMLSpanElement).innerHTML).toEqual(extraItem.extraLabel);
         (extraLabel.nativeElement as HTMLSpanElement).click();
         fixture.detectChanges();
         expect(outputSelect).toHaveBeenCalled();
      });
   });
});
