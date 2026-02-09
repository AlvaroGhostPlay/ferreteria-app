import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pageable',
  imports: [],
  templateUrl: './pageable.component.html'
})
export class PageableComponent {

  
  @Input() page = 1;
  @Input() totalPages = 5;

  @Output() pageChange = new EventEmitter<number>();

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.pageChange.emit(newPage);
  }
}

