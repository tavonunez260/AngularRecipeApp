import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {AuthResponseData} from "../shared/auth-response-data";
import {Router} from "@angular/router";
import {AlertComponent} from '../shared/alert/alert.component'
import {PlaceholderDirective} from "../shared/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.closeSubscription) {
      this.closeSubscription.unsubscribe()
    }
  }

  onHandleError() {
    this.error = '';
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authOrbs: Observable<AuthResponseData>

    this.isLoading = true;
    if (this.isLoginMode) {
      authOrbs = this.authService.login(email, password);
    } else {
      authOrbs = this.authService.signup(email, password);
    }

    authOrbs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, err => {
        console.log(err);
        this.error  = err;
        this.showErrorAlert(err);
        this.isLoading = false;
      });

    form.reset();
  }

  private showErrorAlert(message: string) {
    //const alertComponent: AlertComponent = new AlertComponent();
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
