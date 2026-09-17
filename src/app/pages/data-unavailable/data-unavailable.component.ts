import { Component } from '@angular/core';

@Component({
  selector: 'app-data-unavailable',
  templateUrl: './data-unavailable.component.html',
})
export class DataUnavailableComponent {
  reload(): void {
    window.location.reload();
  }
}
