export class ProfileVm {
  name: string;
  oldPassword: string;
  newPassword: string;
  newPassword_confirmation: string;

  constructor() {
    this.name = '';
  }
}