import { Component, Input, inject } from '@angular/core';
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
import { AuthStore } from '../../stores/auth.store';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule , DropdownModule ,ReactiveFormsModule,
     InputTextModule, RadioButtonModule , CalendarModule,
      FileUploadModule, MenuModule, DialogModule, PasswordModule, DividerModule],
  providers: [AuthStore, UserService],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent {
  readonly authStore = inject(AuthStore)
  currentUser = this.authStore.currentUser() as any
  items?:MenuItem[];
  fromSubmitted = false;
  validtionMsg = {
    fNameValMsg:"min length of first name is 3 litters",
    lNameValMsg:"min length of last name is 3 litters",
    birthDateValMsg: 'BirthDate is invalid',
    addressValMsg: 'too short address',
    countryValMsg: 'Must select a country',
    stateValMsg: 'state is required',
    cityValMsg: 'city is required',
    zipCodeValMsg: 'zip code is invalid',
    phoneValMsg: 'phone is invalid',
  };

  flagSrc:any;
  imgSrc:string = '';
  selectedCountry?: ICountry;
  countries: ICountry[] = [];
  visible = false;

  profileForm = new FormGroup({
    fName:new FormControl(this.currentUser.firstName, [Validators.required, Validators.minLength(3)]),
    lName:new FormControl(this.currentUser.lastName, [Validators.required, Validators.minLength(3)]),
    email:new FormControl({ value: this.currentUser.email, disabled: true}, { updateOn: 'change' }),
    birthDate: new FormControl(this.currentUser.birthDate,[Validators.required]),
    address:new FormControl(this.currentUser.address.address,[Validators.required, Validators.minLength(5)]),
    country:new FormControl(this.currentUser.address.country,[Validators.required] ),
    state:new FormControl(this.currentUser.address.state, [Validators.required]),
    city:new FormControl(this.currentUser.address.city, [Validators.required]),
    zipCode: new FormControl(this.currentUser.address.postalCode, [Validators.required, Validators.pattern(/^\d{5}$/)]),
    phone:new FormControl(this.currentUser.phone, [Validators.required])    
  })

constructor (private http: HttpClient,private router: Router,private userService: UserService){}

  showDialog() {
    this.visible = true;
  }



  
// handle form validations

get isfirstNameValid(){
  return this.profileForm.controls.fName.valid
}

get isLastNameValid(){
  return this.profileForm.controls.lName.valid
}

get isBirthDateValid(){
  return this.profileForm.controls.birthDate.valid
}

get isAddressValid(){
  return this.profileForm.controls.address.valid
}

get isCountryValid(){
  return this.profileForm.controls.country.valid
}

get isStateValid(){
  return this.profileForm.controls.state.valid
}

get isCityValid(){
  return this.profileForm.controls.city.valid
}

get isZipCodeValid(){
  return this.profileForm.controls.zipCode.valid
}

get isPhoneValid(){
  return this.profileForm.controls.phone.valid
}


////////////////////////////////

get firstNameValChanged() {
  return this.profileForm.controls.fName.dirty;
}

get lastNameValChanged() {
  return this.profileForm.controls.lName.dirty;
}

get birthDateValChanged(){
  return this.profileForm.controls.birthDate.dirty
}

get addressValChanged(){
  return this.profileForm.controls.address.dirty
}

get CountryValChanged(){
  return this.profileForm.controls.country.dirty
}

get stateValChanged(){
  return this.profileForm.controls.state.dirty
}

get cityValChanged(){
  return this.profileForm.controls.city.dirty
}

get zipCodeValChanged(){
  return this.profileForm.controls.zipCode.dirty
}

get phoneValChanged(){
  return this.profileForm.controls.phone.dirty
}


//////////////////
get isSubmitted(){
  return this.fromSubmitted;
}


  // handle form subimission
  submitProfileData(){
    this.fromSubmitted = true;
    this.profileForm.controls.email.enable();
    
    // post data
    if(this.profileForm.valid){
      console.log('valid');
      const formData = { ...this.profileForm.value, email: this.currentUser.email, password: 'password' };  
      console.log(formData);
      this.userService.updateUserData(this.currentUser.id, formData).subscribe({
        next: (response:any) => {
          console.log('return from service')
          console.log(response);
         this.authStore.updateCurrentUser(response)

          
        },
        error: (err:any) => {
          console.log(err);
        }
      })


      // this.router.navigate(["/"]);


      // this.profileForm.reset();
      this.fromSubmitted = false;
    }
    else {
      console.log('invalid')
      console.log(this.profileForm);

      // if(!this.profileForm.controls.fName.valid) console.log(this.fNameValMsg)
      // if(!this.profileForm.controls.lName.valid) console.log(this.lNameValMsg)    
      // if(!this.profileForm.controls.email.valid) console.log(this.emailValMsg)

      console.log(this.profileForm.controls.fName.valid) 
      console.log(this.profileForm.controls.lName.valid)     
      console.log(this.profileForm.controls.email.valid)


      console.log(this.profileForm.controls.address.valid)
      console.log(this.profileForm.controls.country.valid)
      console.log(this.profileForm.controls.phone.valid)

      


      // console.log(this.profileForm.controls.email)
      // console.log(this.profileForm.controls.email.value)
      // console.log(this.profileForm.controls.email.valid)
    }

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



  



ngOnInit(){
  console.log(this.currentUser.address.country);
  console.log(this.currentUser.address.postalCode);
  console.log(this.currentUser.birthDate)
  console.log(this.currentUser);
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


// this.selectedCountry = this.countries.filter((country: any) => country.name === this.currentUser.address.country)
// .map((country: any) => ({
//   name: country.name,
//   phoneCode: country.phoneCode,
//   flag: country.flag
// }))[0];
// console.log(this.selectedCountry);

// this.flagSrc = this.selectedCountry.flag;


}

}




