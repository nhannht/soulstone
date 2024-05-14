import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostDownloadedListComponent } from './most-downloaded-list.component';

describe('MostDownloadedListComponent', () => {
  let component: MostDownloadedListComponent;
  let fixture: ComponentFixture<MostDownloadedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostDownloadedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostDownloadedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
