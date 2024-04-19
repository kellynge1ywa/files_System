import { TestBed } from '@angular/core/testing';

import { UploadProfileImageService } from './upload-profile-image.service';

describe('UploadProfileImageService', () => {
  let service: UploadProfileImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadProfileImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
