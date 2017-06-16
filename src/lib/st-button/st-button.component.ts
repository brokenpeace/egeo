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
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'st-button',
  templateUrl: './st-button.component.html',
  styleUrls: ['./st-button.component.scss']
})

export class StButtonComponent {
   @Input() inputType: string = 'button'; // button / submit / reset
   @Input() isDisabled: boolean = false;
   @Input() leftIcon: string;
   @Input() qaTag: string;
   @Input() rightIcon: string;
   @Input() subtypeClass: string = 'default';
   @Input() text: string = 'Click Me';
   @Input() themeClass: string;
   @Input() typeClass: string = 'btnMain';

   @Output() onClick: EventEmitter<any> = new EventEmitter();

   constructor() {}

   public getButtonTypeClass(): string {
      let cssClass: string;

      if (this.typeClass) {
        cssClass = 'st-button--' + this.typeClass + ' sth-button--' + this.typeClass;
      }

      if (this.subtypeClass) {
        cssClass = cssClass + ' ' +  'st-button--' + this.typeClass + '-'
                   + this.subtypeClass + ' sth-button--' + this.typeClass + '-' + this.subtypeClass;
      }

      if (this.themeClass) {
        cssClass = cssClass + ' ' + 'st-button--' + this.themeClass + ' sth-button--' + this.themeClass;
      }

      return cssClass;
   }

   public onClickEvent(event: any): void {
     this.onClick.emit(event);
   }
}
