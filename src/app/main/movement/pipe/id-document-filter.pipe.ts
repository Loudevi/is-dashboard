import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'idDocumentFilter'
})

export class IdDocumentFilterPipe implements PipeTransform {

    transform(array: any[], filteredIdDocument: string): any[] {
        if(!array) return [];
        if(!filteredIdDocument) return array;

        filteredIdDocument = filteredIdDocument.toLowerCase();

        return array.filter ( it => {
            return it.stakeholder.idDocument.toLowerCase().includes(filteredIdDocument);
        });
    }
}