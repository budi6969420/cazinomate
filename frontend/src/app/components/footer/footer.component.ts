import {Component, HostBinding} from '@angular/core';
import {SidebarWidthService} from "../../services/sidebar-width.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @HostBinding('style.width') footerWidth: string = '100%';

  constructor(private sidebarService: SidebarWidthService) {}

  ngOnInit(): void {
    this.sidebarService.maxWidth$.subscribe(width => {
      this.footerWidth = `calc(100% - (var(--app-spacing-xsmall) * 2) - ${width}px)`;
    });
  }
}
