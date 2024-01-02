import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl,FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuItem } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ICountry} from '../../interfaces/Country';
import {environment} from '../../../environments/environment'
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule , DropdownModule ,ReactiveFormsModule,
     InputTextModule, RadioButtonModule , CalendarModule,
      FileUploadModule, MenuModule, DialogModule, PasswordModule, DividerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {
  items?:MenuItem[];
  fromSubmitted = false;
  fNameValMsg="min length of first name is 3 litters";
  lNameValMsg="min length of last name is 3 litters";
  emailValMsg = "email invalid";
  flagSrc:any;
  imgSrc:string = '';
  selectedCountry?: ICountry;
  countries: ICountry[] = [];
  visible = false;
  userEmail = 'johnDoe@gmail';
  userPassword = 'Pa$$word122';
  profileForm = new FormGroup({
    fName:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    lName:new FormControl(null,[Validators.required, Validators.minLength(3)]),
    email:new FormControl({ value: this.userEmail, disabled: true },  [Validators.required, Validators.email]),
    address:new FormControl(null,[Validators.required, Validators.minLength(20)]),
    country:new FormControl(null),
    phone:new FormControl('')
  })

  constructor (private http: HttpClient){
  }

  showDialog() {
    this.visible = true;
  }

// handle uploading image
onUpload(event:any) {
  let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      };

}

// getting list of all countries
fetchCountries() {
  const {apiUrl, apiKey}  = environment;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  });
  
  this.http.get<any[]>( apiUrl+'countries', { headers }).subscribe({
    next:(response: any)=>{
      const countryList: any[] = response.data;
      console.log(countryList);
      countryList.forEach(countryData => {
        const country: ICountry = {
          name: countryData.name,
          phoneCode: countryData.phone_code,
          flag: countryData.href.flag
        };
        this.countries.push(country);
      });
    },
    error:(err)=> console.error('Error fetching countries:', err)
   });
  
  console.log(this.countries);
  
}


// handle selecting country
selectedCountryHandler(event:any) {
  let selectedCountryName = this.profileForm.controls.country.value;

  console.log(this.profileForm.controls.country.value);
  this.selectedCountry = this.countries.filter((country: any) => country.name === selectedCountryName)
  .map((country: any) => ({
    name: country.name,
    phoneCode: country.phoneCode,
    flag: country.flag
  }))[0];

  this.flagSrc = this.selectedCountry.flag;
  this.profileForm.controls.phone.setValue('+' + this.selectedCountry.phoneCode)
}


// handle form validations

  get isfirstNameValid(){    
    return this.profileForm.controls.fName.valid
  }
  

  get isLastNameValid(){
    
    return this.profileForm.controls.lName.valid
  }

 
  get isEmailValid(){
    return this.profileForm.controls.email.valid
  }

  

  get isSubmitted(){
    return this.fromSubmitted;
  }


  get firstNameValChanged() {
    return this.profileForm.controls.fName.dirty;
  }

  get lastNameValChanged() {
    
    return this.profileForm.controls.lName.dirty;
  }
  
  get emailValChanged() {
    return this.profileForm.controls.email.dirty;

  }
  

  // handle form subimission
  submitProfileData(){
    this.fromSubmitted = true;
    if(this.profileForm.valid){
      console.log(this.profileForm);
      this.profileForm.reset();
      this.fromSubmitted = false;              
    }
    else {
      console.log('invalid')
      if(!this.profileForm.controls.fName.valid) console.log(this.fNameValMsg)
      if(!this.profileForm.controls.lName.valid) console.log(this.lNameValMsg)
      if(!this.profileForm.controls.email.valid) console.log(this.emailValMsg)
    }

}





ngOnInit(){

  this.items = [
    {
      label: "Profile",
      icon: "pi pi-fw pi-user",
    },
    {
      label: "Security",
      icon: "pi pi-fw pi-lock",
    },
    {
      label: "Orders",
      icon: "pi pi-fw pi-bars",

    },
    {
      label: "Wishlists",
      icon: "pi pi-fw pi-heart",
    },
    {
      label: "Returns",
      icon: "pi pi-fw pi-spinner",
    },
];

this.fetchCountries();

} 

}




