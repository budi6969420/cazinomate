import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPackageComponent } from './shopPackage.component';

describe('PackageComponent', () => {
  let component: ShopPackageComponent;
  let fixture: ComponentFixture<ShopPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
