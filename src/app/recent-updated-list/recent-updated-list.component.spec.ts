import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentUpdatedListComponent } from './recent-updated-list.component';

describe('RecentUpdatedListComponent', () => {
  let component: RecentUpdatedListComponent;
  let fixture: ComponentFixture<RecentUpdatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentUpdatedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentUpdatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
