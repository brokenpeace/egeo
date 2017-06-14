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
import {
   AfterViewInit,
   Directive,
   ElementRef,
   Input,
   Renderer
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
   selector: '[StInputAdjustable]'
})
export class StInputAdjustable implements AfterViewInit {
   @Input() placeholder: string;

   private text: string;

   constructor(
      private el: ElementRef,
      private ngModel: NgModel,
      private renderer: Renderer
   ) {}

   ngAfterViewInit(): void {
      this.ngModel.valueChanges.subscribe(value => {
         this.text = value || this.placeholder;

         if (!value) {
            this.el.nativeElement.value = null;
            this.el.nativeElement.placeholder = this.placeholder;
         }

         if (this.el.nativeElement.parentNode.querySelector('.title-hidden')) {
            this.el.nativeElement.parentNode.removeChild(
               this.el.nativeElement.parentNode.querySelector('.title-hidden')
            );
         }

         this.el.nativeElement.parentNode.insertAdjacentHTML(
            'beforeend',
            '<span class="title-hidden">' + this.text + '</span>'
         );

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.visibility =
            'hidden';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.position =
            'absolute';
         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.textTransform =
            'none';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.whiteSpace =
            'nowrap';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.width =
            'auto';

         this.el.nativeElement.parentNode.querySelector(
            '.title-hidden'
         ).style.height =
            'auto';

         this.el.nativeElement.style.width =
            this.el.nativeElement.parentNode.querySelector('.title-hidden')
               .offsetWidth +
            10 +
            'px';
      });
   }
}
