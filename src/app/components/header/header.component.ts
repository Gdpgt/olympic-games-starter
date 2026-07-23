import { Component, Input } from '@angular/core';
import { StatItem } from '../../core/models/stat-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() stats: StatItem[] = [];
}
