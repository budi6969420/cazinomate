import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import {RouterLink} from "@angular/router";
import {GameMetadataService} from "../../services/game-metadata.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuIsExpanded: boolean = false;
  private menuItemsChangesSubscription: Subscription | null = null;
  dataLoadedSubscription: Subscription | null = null;

  constructor(protected gameMetaDataService: GameMetadataService) {}

  @ViewChildren('menuItem') menuItems!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.menuItemsChangesSubscription = this.menuItems.changes.subscribe(() => {
      setTimeout(() => this.calculateMaxWidth(), 0);
    });
  }

  ngOnDestroy(): void {
    this.menuItemsChangesSubscription?.unsubscribe();
  }

  expandMenu(): void {
    this.menuIsExpanded = !this.menuIsExpanded;
    this.updateMenuWidth();
  }

  private calculateMaxWidth(): void {
    let maxWidth = 0;

    this.menuItems.forEach((menuItemRef: ElementRef) => {
      const menuItem = menuItemRef.nativeElement as HTMLElement;
      const clone = menuItem.cloneNode(true) as HTMLElement;
      clone.style.visibility = 'hidden';
      clone.style.position = 'absolute';
      clone.style.width = 'auto';
      const span = clone.querySelector('span');
      if (span) span.style.display = 'inline';

      document.body.appendChild(clone);
      const width = clone.getBoundingClientRect().width;
      document.body.removeChild(clone);

      if (width > maxWidth) {
        maxWidth = width;
      }
    });

    if (maxWidth > 0) {
      const buffer = 10;
      document.documentElement.style.setProperty('--expanded-menu-width', `${maxWidth + buffer}px`);
    } else {
      document.documentElement.style.setProperty('--expanded-menu-width', `200px`);
    }
  }

  private updateMenuWidth(): void {
    this.menuItems.forEach((menuItem) => {
      if (this.menuIsExpanded) {
        menuItem.nativeElement.classList.add('expanded');
      } else {
        menuItem.nativeElement.classList.remove('expanded');
      }
    });
  }
}
