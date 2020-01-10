import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'brandFilter'
})

export class BrandFilterPipe implements PipeTransform {

    transform(array: any[], filteredBrandId: string): any[] {
        if(!array) return [];
        if(!filteredBrandId) return array;

        return array.filter ( it => {
            return it.brandId == filteredBrandId;
        });
    }
}