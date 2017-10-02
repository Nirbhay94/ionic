import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    createSuccess = false;
    registerCredentials = { email: '', password: '' };

    constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider, private alertCtrl: AlertController,public http: Http)
    {
    }

    register() {
        this.auth.register(this.registerCredentials).subscribe(success => {
                if (success) {
                    this.createSuccess = true;
                    this.showPopup("Success", "Account created.");
                } else {
                    this.showPopup("Error", "Problem creating account.");
                }
            },
            error => {
                this.showPopup("Error", error);
            });
    }

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        if (this.createSuccess) {
                            this.navCtrl.popToRoot();
                        }
                    }
                }
            ]
        });
        alert.present();
    }
    // claimStatus()
    // {
    //     let body = JSON.stringify({
    //         email: 'nirbhay@heypayless',
    //         password: '1234' });
    //     this.http.post('http://claimcheck.local/api/get-login-details',body,body).subscribe(res => {
    //         console.log(res);
    //     }, (err) => {
    //         console.log(err);
    //     });
    // }

}
