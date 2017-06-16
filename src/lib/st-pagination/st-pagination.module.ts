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
import { NgModule } from '@angular/core';

import { StPaginationComponent } from './st-pagination.component';
import { StPaginationPipe } from './st-pagination.pipe';
import { StPaginationService } from './st-pagination.service';

import { StButtonModule } from '../st-button/st-button.module';
import { StDropdownModule } from '../st-dropdown/st-dropdown.module';

@NgModule({
   imports: [ CommonModule, StButtonModule, StDropdownModule ],
   exports: [ StPaginationComponent, StPaginationPipe ],
   declarations: [ StPaginationComponent, StPaginationPipe ],
   providers: [
      StPaginationService
   ]
})
export class StPaginationModule { }
