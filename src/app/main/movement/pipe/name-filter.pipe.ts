import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nameFilter'
})

export class NameFilterPipe implements PipeTransform {

    transform(array: any[], filteredName: string): any[] {
        if(!array) return [];
        if(!filteredName) return array;

        filteredName = filteredName.toLowerCase();

        return array.filter ( it => {
            return it.stakeholder.name.toLowerCase().includes(filteredName);
        });
    }
}