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
import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export enum StModalType { INFO, WARNING, NEUTRAL }
export enum StModalWidth { COMPACT, REGULAR, LARGE }
export enum StModalMainTextSize { BIG, MEDIUM }
export enum StModalResponse { YES, NO, CLOSE }

export interface StModalButton {
   icon?: string;
   iconLeft?: boolean;
   primary?: boolean;
   label: string;
   response: StModalResponse;
}

export interface StModalConfig {
   contextualTitle?: string;
   modalTitle?: string;
   message?: string;
   html?: string;
   mainText?: StModalMainTextSize;
   modalType?: StModalType;
   modalWidth?: StModalWidth;
   inputs?: Object;
   outputs?: Object;
   buttons?: StModalButton[];
   closeOnAccept?: boolean;
   qaTag: string;
}
