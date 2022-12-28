import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any, searchText: any, filters: any[]) {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    let filteredItems: any = [];
    items.forEach((item: any) => {
     filters ? filters.find((filter:any)=>{
        if (
          item[filter] !== null &&
          item[filter] !== undefined &&
          item[filter] !== '' &&
          item[filter].toString().toLowerCase().includes(searchText)
        ) {
          filteredItems.push(item);
          return true;
        }
      }) : items
    })
    return filteredItems;
  }
}
