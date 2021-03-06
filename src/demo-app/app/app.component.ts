/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StVerticalTabsModule } from '@stratio/egeo';
import { EGEO_DEMO_MENU, EgeoDemoMenu } from '@stratio/egeo-demo';

import { AppService } from './app.service';
import { environment } from '../environments/environment';

@Component({
   selector: 'app',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   public menu: EgeoDemoMenu[] = EGEO_DEMO_MENU || [];
   public options: Array<string> = EGEO_DEMO_MENU.map(_ => _.name);
   public active: string = this.menu[0].name;
   public areNewVersion: boolean = false;

   constructor(private _router: Router, private _appService: AppService) {
      if (environment.production) {
         this._appService.getLastUpdateDate().subscribe(masterDate => this.checkNewVersion(masterDate));
      }
   }

   public onChangeOption(active: string): void {
      this.active = active;
      const selectedOption: EgeoDemoMenu | undefined = this.menu.find(_ => _.name === active);
      this._router.navigate([selectedOption ? selectedOption.path : '']);
   }

   public hideNotification(): void {
      this.areNewVersion = false;
   }

   private checkNewVersion(masterDate: Date): void {
      this.areNewVersion = masterDate.getTime() > window.egeo_demo.CREATION_DATE.getTime();
   }
}
