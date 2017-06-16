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
export class EgeoUtils {

   static isDefined(value: any): boolean {
      return value !== undefined && value !== null;
   }

   static validateInputs(scope: any, inputs: string[], component: string): void {
      inputs.forEach((input) => {
         if (!this.isDefined(scope[input])) {
            throw new Error(`${this.toDash(component)}: field ${input} is a required field`);
         }
      });
   }

   static toDash(value: string): string {
      try {
         return value.replace(/([A-Z])/g, ($1) => '-' + $1.toLowerCase()).substring(1);
      } catch (err) {
         return value;
      }
   }
}
