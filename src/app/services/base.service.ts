import { environment } from 'src/environments/environment';

export abstract class BaseService { 
    protected urlService: string = `${environment.api.server}:${environment.api.port}/`;
}