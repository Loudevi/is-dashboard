import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'documentFilter'
})

export class DocumentFilterPipe implements PipeTransform {

    transform(array: any[], filteredDocument: string): any[] {
        if(!array) return [];
        if(!filteredDocument) return array;

        return array.filter ( it => {
            return it.document.correlative.toString().includes(filteredDocument);
        });
    }
}