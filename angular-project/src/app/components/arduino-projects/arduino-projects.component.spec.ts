import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArduinoProjectsComponent } from './arduino-projects.component';

describe('ArduinoProjectsComponent', () => {
  let component: ArduinoProjectsComponent;
  let fixture: ComponentFixture<ArduinoProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArduinoProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArduinoProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
