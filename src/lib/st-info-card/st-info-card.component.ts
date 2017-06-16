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
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'st-info-card',
  templateUrl: './st-info-card.component.html',
  styleUrls: ['./st-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInfoCardComponent {
  @Input() photo: string;
  @Input() defaultPhoto: string;
  @Input() title: string;
  @Input() description: string;
  @Input() qaTag: string;

  constructor() {
  }

  onPhotoError(): boolean {
    this.photo = this.defaultPhoto;
    return true;
  }

  generateQaTag(): string {
   return this.qaTag ? 'qaTag-' + this.qaTag : 'qaTag-' + this.title.split(' ').join('-');
  }
}
