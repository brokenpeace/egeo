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
import {
   ChangeDetectionStrategy, Component, HostListener, Input
} from '@angular/core';

/**
 * @description {Component} [Table Row]
 *
 * This component is designed to be added to the table component
 *
 * @example
 *
 * {html}
 *
 * ```
 *  <tr st-table-row [selected] ="true" [standUpSelected] = "false">
 *      <!-- CELL LIST WILL BE HERE -->
 *  </tr>
 * ```
 *
 */

@Component({
   selector: '[st-table-row]',
   templateUrl: './st-table-row.component.html',
   styleUrls: ['./st-table-row.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   host: {
      'class': 'st-table-row',
      '[class.selected]' : 'selected && standUpSelected'
   }
})

export class StTableRowComponent {
   /** @Input {boolean} [selected=''] It indicates if row is selected or not */
   @Input() selected: boolean;
   /** @Input {boolean} [standUpSelected='true'] It indicates if when row is selected, it has to be displayed stood up */
   @Input() standUpSelected: boolean = true;

   public showHoverMenu: boolean = false;

   @HostListener('mouseover') onShowHoverMenu(): void {
      this.showHoverMenu = true;
   }

   @HostListener('mouseout') onHideHoverMenu(): void {
      this.showHoverMenu = false;
   }
}

