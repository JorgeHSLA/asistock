import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-big-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './big-box.html',
  styleUrl: './big-box.css'
})
export class BigBox {

  @Input() data: any;

  constructor(private router: Router) {}

  navigateTo(path: string) {
    if (path) {
      this.router.navigate([path]);
    }
  }
}
