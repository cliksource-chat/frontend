import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grdFilter'
})
export class GrdFilterPipe implements PipeTransform {
  transform(items: any, filter: any, isEmployer: boolean): any {
 
    if (!filter || filter=="") {
      return items;
    }
  
    let obj;
    if(isEmployer){
      obj = items.filter(chat=> {
        return chat.user2.firstname.toLowerCase().startsWith(filter) || chat.user2.lastname.toLowerCase().startsWith(filter)
      })
    } else {
      obj = items.filter(chat=> {
        return chat.user1.firstname.toLowerCase().startsWith(filter) || chat.user1.lastname.toLowerCase().startsWith(filter)
      })
    }
   
    return obj;
  }
}