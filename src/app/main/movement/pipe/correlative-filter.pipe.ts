import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'correlativeFilter'
})

export class CorrelativeFilterPipe implements PipeTransform {

    transform(array: any[], filteredCorrelative: string): any[] {
        if(!array) return [];
        if(!filteredCorrelative) return array;

        return array.filter ( it => {
            return it.correlative.toString().includes(filteredCorrelative);
        });
    }
}