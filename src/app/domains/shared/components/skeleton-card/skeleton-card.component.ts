import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [],
  templateUrl: './skeleton-card.component.html',
  styleUrl: './skeleton-card.component.scss'
})
export class SkeletonCardComponent {

  @Input() actionsCount: number = 2;
  @Input() isLargeCard: boolean = false;
  @Input() isShowingTitle: boolean = true;

  get actionsArray(): number[] {
    return Array(Math.max(0, this.actionsCount)).fill(0);
  }
}
