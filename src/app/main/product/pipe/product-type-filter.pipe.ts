import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productTypeFilter'
})

export class ProductTypeFilterPipe implements PipeTransform {

    transform(array: any[], filteredProductTypeId: string): any[] {
        if(!array) return [];
        if(!filteredProductTypeId) return array;

        return array.filter ( it => {
            return it.productTypeId == filteredProductTypeId;
        });
    }
}