export class Sort{

  actualSorting: string;
  sortingStatus: 'Asc' | 'Desc' | 'None';

  constructor() {
    this.actualSorting = '';
    this.sortingStatus = 'None';
  }

  sort(columnToSort:string) {
    if(columnToSort === this.actualSorting) {
      if(this.sortingStatus === 'Asc') this.sortingStatus = 'Desc';
      else if(this.sortingStatus === 'Desc') {
        this.sortingStatus = 'None';
        this.actualSorting = '';
      }
    } else {
      this.actualSorting = columnToSort;
      this.sortingStatus = 'Asc';
    }
  }

}
