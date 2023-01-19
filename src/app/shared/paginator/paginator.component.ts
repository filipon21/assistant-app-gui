import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Klasa służąca do obsługi związanej z komoponentem do paginacji tabel
 */
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  public pageSizeTable: number[] = [10,25,50];
  public searchString: string = '';
  public pageSize: number = 10;

  @Input() page: number;
  @Input() pageAmount: number;
  @Input() size: string;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();


  ngOnInit(): void {
    if(this.pageAmount === 0){
      this.page = 0;
    }
  }

  nextPage() {
    this.page++;
    this.pageChange.emit(this.page);
  }

  previousPage()  {
    this.page--;
    this.pageChange.emit(this.page);
  }

  previousCheck() {
    if(this.page <= 1) return true;
    else return null;
  }

  nextCheck() {
    if(this.page === this.pageAmount) return true;
    else return null;
  }

  changePageSize() {
    this.pageSizeChange.emit(this.pageSize);
  }

}
