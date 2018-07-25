import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsontableComponent } from './jsontable.component';

describe('JsontableComponent', () => {
  let component: JsontableComponent;
  let fixture: ComponentFixture<JsontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsontableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
