import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'idTypeFilter'
})

export class IdTypeFilterPipe implements PipeTransform {

    transform(array: any[], filteredIdDocumentTypeId: string): any[] {
        if(!array) return [];
        if(!filteredIdDocumentTypeId) return array;

        return array.filter ( it => {
            return it.idDocumentTypeId == filteredIdDocumentTypeId;
        });
    }
}