import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScheduleSync } from './match-schedule-sync';

describe('MatchScheduleSync', () => {
  let component: MatchScheduleSync;
  let fixture: ComponentFixture<MatchScheduleSync>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchScheduleSync],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchScheduleSync);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
