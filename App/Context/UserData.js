// UserData.js
class UserData {
  constructor() {
    this.userId = null;
    this.email = null;
    this.firstName = null;
    this.profilePicture = null;
    this.lastName = null;
    this.gender = null;
    this.phoneNumber = null;
    this.dob = null;
    this.walletAddress = null;
    this.password = null;
    this.verificationCode = null;
    this.bio = null;
    this.profession = null;
    this.city = null;
    this.states = null;
  }

  static getInstance() {
    if (!UserData.instance) {
      UserData.instance = new UserData();
    }
    return UserData.instance;
  }

  setUserData(
    userId,
    email,
    firstName,
    profilePicture,
    lastName,
    gender,
    phoneNumber,
    dob,
    walletAddress,
    password,
    verificationCode,
    bio,
    profession,
    city,
    states
  ) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.profilePicture = profilePicture;
    this.lastName = lastName;
    this.gender = gender;
    this.phoneNumber = phoneNumber;
    this.dob = dob;
    this.walletAddress = walletAddress;
    this.password = password;
    this.verificationCode = verificationCode;
    this.bio = bio;
    this.profession = profession;
    this.city = city;
    this.states = states;
  }
}

export default UserData.getInstance();
