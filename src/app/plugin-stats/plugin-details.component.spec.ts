import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginDetailsComponent } from './plugin-details.component';

describe('PluginStatsComponent', () => {
  let component: PluginDetailsComponent;
  let fixture: ComponentFixture<PluginDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PluginDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PluginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
