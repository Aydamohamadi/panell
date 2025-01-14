import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
user={
  firstName:'',
  lastName:'',
  mobile:'',
  UserName:'',
  password:'',
  City:'',
};
 message:string='';
 showCity: boolean = false;
  listsCity: string[] = [
    'آذربایجان شرقی', 'آذربایجان غربی', 'اردبیل', 'اصفهان', 'البرز',
    'ایلام', 'بوشهر', 'تهران', 'چهارمحال و بختیاری', 'خراسان جنوبی',
    'خراسان رضوی', 'خراسان شمالی', 'خوزستان', 'زنجان', 'سمنان',
    'سیستان و بلوچستان', 'فارس', 'قزوین', 'قم', 'کردستان', 'کرمان',
    'کرمانشاه', 'کهگیلویه و بویراحمد', 'گلستان', 'گیلان', 'لرستان',
    'مازندران', 'مرکزی', 'هرمزگان', 'همدان', 'یزد'
  ];
  signupVisible: boolean = true;
 constructor(private authService: AuthService){}
 signup(){
  const{firstName, lastName,mobile, UserName, password,City}=this.user;
  this.authService.signup(firstName, lastName,mobile, UserName, password,City).subscribe(respones=>{
    if(respones.success){
      this.message= respones.message;
      this.user={firstName:'', lastName:'',mobile:'', UserName:'', password:'',City:''};
      this.signupVisible = false;
    }
    else{
      this.message=respones.message;
    }
  });

 }
 toggleshowCity(){
  this.showCity=!this.showCity;
 }
 selectCity(City:string){
  this.user.City=City;
  this.showCity=false;
 }
}
