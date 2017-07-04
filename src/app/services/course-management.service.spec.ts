/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseManagementService } from './course-management.service';

describe('CourseManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseManagementService]
    });
  });

  it('should ...', inject([CourseManagementService], (service: CourseManagementService) => {
    expect(service).toBeTruthy();
  }));
});
