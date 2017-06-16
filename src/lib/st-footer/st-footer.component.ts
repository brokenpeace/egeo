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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { StFooterLink } from './st-footer.model';

@Component({
  selector: 'st-footer',
  templateUrl: './st-footer.component.html',
  styleUrls: ['./st-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StFooterComponent {

  @Input() rightsText: string;
  @Input() links: StFooterLink[] = [];
  @Input() qaTag: string;
  @Input() image: string;
  @Output() link: EventEmitter<StFooterLink> = new EventEmitter<StFooterLink>();

  constructor(
     private router: Router
  ) { }

  goToLink(link: StFooterLink): void {
     if (link.url) {
        window.open(link.url, '_blank');
     }

     if (link.router) {
        this.router.navigate([link.router]);
     }

     this.link.emit(link);
  }


}
