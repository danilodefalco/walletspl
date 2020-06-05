import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

export class SecurityService {
    encrypt(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), environment.encryptHey).toString();
    }

    decypt(data) {
        const bytes = CryptoJS.AES.decrypt(data, environment.encryptHey);
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
    }
}