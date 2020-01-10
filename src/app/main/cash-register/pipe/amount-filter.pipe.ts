import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'amountFilter'
})

export class AmountFilterPipe implements PipeTransform {

    transform(array: any[], filteredAmount: string): any[] {
        if(!array) return [];
        if(!filteredAmount) return array;

        return array.filter ( it => {
            return it.paymentDeposit.toString().includes(filteredAmount);
        });
    }
}