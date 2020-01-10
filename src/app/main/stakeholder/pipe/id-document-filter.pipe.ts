import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'idDocumentFilter'
})

export class IdDocumentFilterPipe implements PipeTransform {

    transform(array: any[], filteredIdDocument: string): any[] {
        if(!array) return [];
        if(!filteredIdDocument) return array;

        return array.filter ( it => {
            return it.idDocument.includes(filteredIdDocument);
        });
    }
}