import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
 
    private rolepassed:string;

    constructor(role:string){
        this.rolepassed = role;
    }

    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        return this.rolepassed === request.user.role;
    }
}