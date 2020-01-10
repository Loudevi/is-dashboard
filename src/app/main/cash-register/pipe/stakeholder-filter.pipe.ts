import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stakeholderFilter'
})

export class StakeholderFilterPipe implements PipeTransform {

    transform(array: any[], filteredStakeholder: string): any[] {
        if(!array) return [];
        if(!filteredStakeholder) return array;

        filteredStakeholder = filteredStakeholder.toLowerCase();

        return array.filter ( it => {
            return it.document.stakeholder.name.toLowerCase().includes(filteredStakeholder);
        });
    }
}