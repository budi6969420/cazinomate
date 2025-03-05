import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {SidebarWidthService} from "../../services/sidebar-width.service";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements AfterViewInit {
    menuIsExpanded: boolean = false;
    private _maxWidth: number = 0;

    @ViewChildren('menuItem') menuItems!: QueryList<ElementRef>;

    constructor(private sidebarService: SidebarWidthService) {}

    ngAfterViewInit(): void {
        this.calculateMaxWidth();
    }

    expandMenu(): void {
        this.menuIsExpanded = !this.menuIsExpanded;
        this.updateMenuWidth();
    }

    private calculateMaxWidth(): void {
        this.menuItems.forEach((menuItem) => {
            menuItem.nativeElement.classList.add('expanded');
            const width = menuItem.nativeElement.getBoundingClientRect().width;
            if (width > this._maxWidth) {
                this._maxWidth = width;
            }
            menuItem.nativeElement.classList.remove('expanded');
        });

        document.documentElement.style.setProperty('--expanded-menu-width', `${this._maxWidth}px`);

        this.sidebarService.setMaxWidth(this._maxWidth);
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
