import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService {

    constructor(
        private _toastr: ToastrService,
        private _router: Router
    ) {}

    errorHandler(error: any) {
        switch(error.status) {

            case 400: {
                this._toastr.error('Hubo un error en la información enviada, revise la información e intentelo nuevamente!', 'Status 400', { timeOut: 5000 });
                break;
            };

            case 500: {
                this._toastr.error('Hubo un error de servidor, por favor intentelo mas tarde!', 'Status 500', { timeOut: 5000 });
                break;
            };

            case 401: {
                this._toastr.error('No tiene los privilegios para usar este servicio, por favor pongase en contacto con el administrador o intente conectarse nuevamente!', 'Status 401', { timeOut: 5000 });
                this._router.navigateByUrl('/login');
                break;
            };

            case 404: {
                this._toastr.error('El servicio al que quiere acceder no existe, por favor pongase en contacto con el administrador!', 'Status 404', { timeOut: 5000 });
                break;
            };
            
        }
    }
}
