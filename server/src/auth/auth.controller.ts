import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')  //'auth' is a global route to make routing standard so instead of calling POST /signup , call will be POST /auth/signup
export class AuthController{
    //creating an instance for service , Nest js will handle it down the hood to manage the dependency 
    constructor (private authService : AuthService){}
    //creating route 
    @Post('signup')
    signup(){
        return this.authService.signup();
    }

    @Post('signin')
    singnin(){
        return this.authService.singnin();
    }
}