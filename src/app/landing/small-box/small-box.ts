import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-small-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-box.html',
  styleUrl: './small-box.css'
})
export class SmallBox {

  @Input() data: any;

  constructor(private router: Router) {}

  navigateTo(path: string) {
    if (path) {
      this.router.navigate([path]);
    }
  }
}
