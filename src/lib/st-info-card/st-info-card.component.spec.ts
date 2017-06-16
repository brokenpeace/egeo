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
  TestBed
} from '@angular/core/testing';

import {Http} from '@angular/http';
import {
  RouterTestingModule
} from '@angular/router/testing';
import {StInfoCardComponent} from './st-info-card.component';


describe('StInfoCardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StInfoCardComponent],
      imports: [RouterTestingModule],
      providers: []
    });
  });

  let stInfoCardComponent: StInfoCardComponent;
  let fakeOptions: string[] = ['tab 1', 'tab 2', 'tab 3'];

  beforeEach(() => {
    stInfoCardComponent = new StInfoCardComponent();
  });

  it ('Should be able to change the photo to default photo when photo url is broken', () => {
    stInfoCardComponent.photo = 'broken/img/url';
    stInfoCardComponent.onPhotoError();

    expect(stInfoCardComponent.photo).toBe(stInfoCardComponent.defaultPhoto);
  });
  it ('if qaTag is defined generateQaTag returns this string', () => {
    stInfoCardComponent.qaTag = 'test';
    let id = stInfoCardComponent.generateQaTag();

    expect(id).toEqual('qaTag-test');
  });
  it ('if qaTag is not defined generateQaTag returns title', () => {
    stInfoCardComponent.qaTag = undefined;
    stInfoCardComponent.title = 'title';
    let id = stInfoCardComponent.generateQaTag();

    expect(id).toEqual('qaTag-title');
  });
});
