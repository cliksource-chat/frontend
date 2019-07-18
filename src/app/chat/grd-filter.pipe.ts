import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grdFilter'
})
export class GrdFilterPipe implements PipeTransform {
  transform(items: any, filter: any): any {
    console.log(items);
    console.log(filter);
    if (!filter || filter=="")
    {
      return items;
    }
  
    let obj = items.filter(chat=>chat.user2.firstName.toLowerCase().includes(filter))
    
    console.log(obj.length)
      
      return obj;
}
}