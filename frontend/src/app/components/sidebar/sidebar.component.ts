import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import {GameMetadataService} from "../../services/game-metadata.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {
  menuIsExpanded: boolean = false;

  constructor(protected gameMetaDataService: GameMetadataService) {
  }

  @ViewChildren('menuItem') menuItems!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.calculateMaxWidth();
  }

  expandMenu(): void {
    this.menuIsExpanded = !this.menuIsExpanded;
    this.updateMenuWidth();
  }

  private calculateMaxWidth(): void {
    let maxWidth = 0;

    this.menuItems.forEach((menuItem) => {
      menuItem.nativeElement.classList.add('expanded');
      const width = menuItem.nativeElement.getBoundingClientRect().width;
      if (width > maxWidth) maxWidth = width;
      menuItem.nativeElement.classList.remove('expanded');
    });

    document.documentElement.style.setProperty('--expanded-menu-width', `${maxWidth}px`);
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
