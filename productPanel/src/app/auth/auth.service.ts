import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users:Array<{
    firstName: string;
    lastName: string;
    mobile: string;
    UserName: string;
    password: string;
    City: string;
  }> = [
    {
      firstName: 'Test',
      lastName: 'User',
      mobile: '09123456789',
      UserName: 'ayda',
      password: '123',
      City: 'تهران',
    },
    {
      firstName: 'Fateme',
      lastName: 'Doe',
      mobile: '09211234567',
      UserName: 'fateme',
      password: '123',
      City: 'مشهد',
    },
  ];
 

 
  constructor() {}
  login(UserName:string, password:string):Observable<{success:boolean;message:string}> {
    const user =this.users.find(user=>user.UserName===UserName && user.password===password);
  
  if(user){
    return of({success:true , message:'ورود موفق!'});

  } 
  else{
    return of ({success:false , message:'نام کاربری یا رمز عبور اشتباه است!'});
  }

}
signup(firstName:string, lastName:string,mobile:string, UserName:string, password:string,City:string):
Observable<{success:boolean, message:string}>{
  const NewUser=this.users.find(user=>user.UserName === UserName);
  if(NewUser){
    return of({success:false , message:'این نام کاربری قبلا ثبت شده'});
  }
  this.users.push({firstName, lastName,mobile, UserName, password,City});
  return of({success: true ,message:'ثبت نام با موفقیت انجام شد'})
}
getUsers() {
  return this.users;

}
}
