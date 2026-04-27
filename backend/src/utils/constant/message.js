class Message {
    constructor() {
        this.success = 'Success';
        this.apiRunning = 'API is running';
        this.validationError = 'Validation error';
        this.internalServerError = 'Internal server error';

        this.nameEmailPasswordRoleRequired = 'Name, email, password and role are required';
        this.emailPasswordRequired = 'Email and password are required';
        this.invalidRole = 'Role must be principal or teacher';
        this.userAlreadyExists = 'Email is already registered';
        this.signupSuccessful = 'User registered successfully';
        this.unableToSignup = 'Unable to register user';

        this.invalidEmailOrPassword = 'Invalid email or password';
        this.loginSuccessful = 'User logged in successfully';
        this.unableToLogin = 'Unable to login';

        this.authorizationTokenRequired = 'Authorization token is required';
        this.userNotFound = 'User not found';
        this.invalidOrExpiredToken = 'Invalid or expired token';
        this.unauthorized = 'Unauthorized';
        this.forbidden = 'Forbidden';
        this.accessDenied = 'You do not have permission to access this resource';
        this.authenticatedUserFetched = 'Authenticated user fetched successfully';
    }
}

export default new Message();
