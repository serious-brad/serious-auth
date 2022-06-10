export default class UserDto {
  constructor(user) {
    this.id = user.id;
    this.activationLink = user.activationLink;
    this.email = user.email;
  }
}
