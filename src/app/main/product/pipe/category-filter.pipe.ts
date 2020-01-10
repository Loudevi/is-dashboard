import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform {

    transform(array: any[], filteredCategoryId: string): any[] {
        if(!array) return [];
        if(!filteredCategoryId) return array;

        return array.filter ( it => {
            return it.categoryId == filteredCategoryId;
        });
    }
}