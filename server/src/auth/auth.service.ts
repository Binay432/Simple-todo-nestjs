import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
        return 'I have Signed Up' ;
    }
    singnin(){
        return 'I have Signed In';
    }
}