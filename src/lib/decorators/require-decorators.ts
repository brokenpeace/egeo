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
import * as ReflectMetadata from 'reflect-metadata';

import { EgeoUtils } from '../utils/egeo-utils';

const EGEO_METADATA = Symbol('EgeoLibraryMetadata');

export const enum METADATA_TYPE { PROPERTY }

export interface EgeoMetadata {
   type: METADATA_TYPE;
   required?: boolean;
   requireCondition?: string;
   deprecated?: boolean;
   initialValue?: any;
}

// tslint:disable:only-arrow-functions
export function StRequired(condition?: string): any {
   return function (target: any, name: string): any {
      const meta: any = Reflect.getOwnMetadata(EGEO_METADATA, target.constructor) || {};
      meta[name] = meta.hasOwnProperty(name) && meta[name] || { type: METADATA_TYPE.PROPERTY };
      meta[name].required = true;
      if (condition !== undefined) {
         meta[name].requireCondition = condition;
      }

      Reflect.defineMetadata(EGEO_METADATA, meta, target.constructor);
   };
}

export function StDeprecated(initialValue?: any): any {
   return function (target: any, name: string): any {
      const meta: any = Reflect.getOwnMetadata(EGEO_METADATA, target.constructor) || {};
      meta[name] = meta.hasOwnProperty(name) && meta[name] || { type: METADATA_TYPE.PROPERTY };
      meta[name].deprecated = true;
      if (initialValue !== undefined) {
         meta[name].initialValue = initialValue;
      }

      Reflect.defineMetadata(EGEO_METADATA, meta, target.constructor);
   };
}

export function StEgeo(params?: ''): any {
   return function (target: any): any {
      let _onInit = target.prototype.ngOnInit;
      if (_onInit !== undefined) {
         target.prototype.ngOnInit = function (...args: any[]): void {
            checkDeprecated(target, this);
            checkRequired(target, this);
            _onInit.apply(this, args);
         };
      } else {
         target.prototype.ngOnInit = function (): void {
            checkDeprecated(target, this);
            checkRequired(target, this);
         };
      }
   };
}

function checkDeprecated(target: any, scope: any): void {
   const meta: any = Reflect.getOwnMetadata(EGEO_METADATA, target);
   if (meta !== undefined) {
      Object.keys(meta).forEach((key) => {
         if (meta[key].deprecated) {
            if (scope[key] !== undefined) {
               console.warn(`${EgeoUtils.toDash(target.name)}: field ${key} is a deprecated field`);
            } else if (meta[key].initialValue) {
               scope[key] = meta[key].initialValue;
            }
         }
      });
   }
}

function checkRequired(target: any, scope: any): void {
   const meta: any = Reflect.getOwnMetadata(EGEO_METADATA, target);
   if (meta !== undefined) {
      let inputs: string[] = getKeys(Object.keys(meta), meta, scope);
      EgeoUtils.validateInputs(scope, inputs, target.name);
   }
}

function getKeys(inputs: string[], metadata: { [key: string]: EgeoMetadata }, scope: any): string[] {
   return inputs.reduce((prev, curr) => {
      if (metadata[curr].requireCondition !== undefined) {
         if (checkConditionMetadata(scope, metadata[curr].requireCondition)) {
            prev.push(curr);
         }
      } else if (metadata[curr].required) {
         prev.push(curr);
      }
      return prev;
   }, []);
}

function checkConditionMetadata(scope: any, key: string): boolean {
   if (typeof scope[key] === 'function') {
      return scope[key].apply(scope);
   } else {
      return scope[key];
   }
}

// tslint:enabled
