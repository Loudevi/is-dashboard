import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'lastNameFilter'
})

export class LastNameFilterPipe implements PipeTransform {

    transform(array: any[], filteredLastName: string): any[] {
        if(!array) return [];
        if(!filteredLastName) return array;

        filteredLastName = filteredLastName.toLowerCase();

        return array.filter ( it => {
            return it.applicationUser.family_name.toLowerCase().includes(filteredLastName);
        });
    }
}