import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emailFilter'
})

export class EmailFilterPipe implements PipeTransform {

    transform(array: any[], filteredEmail: string): any[] {
        if(!array) return [];
        if(!filteredEmail) return array;

        filteredEmail = filteredEmail.toLowerCase();

        return array.filter ( it => {
            return it.applicationUser.email.toLowerCase().includes(filteredEmail);
        });
    }
}