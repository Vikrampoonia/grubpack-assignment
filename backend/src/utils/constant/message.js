class Message {
    constructor() {
        this.success = 'Success';
        this.apiRunning = 'API is running';
        this.validationError = 'Validation error';
        this.internalServerError = 'Internal server error';

        this.nameEmailPasswordRoleRequired = 'Name, email, password and role are required';
        this.emailPasswordRequired = 'Email and password are required';
        this.invalidRole = 'Role must be principal or teacher';
        this.invalidEmail = 'Please provide a valid email address';
        this.passwordMinLength = 'Password must be at least 6 characters long';
        this.userAlreadyExists = 'Email is already registered';
        this.signupSuccessful = 'User registered successfully';
        this.unableToSignup = 'Unable to register user';

        this.invalidEmailOrPassword = 'Invalid email or password';
        this.loginSuccessful = 'User logged in successfully';
        this.unableToLogin = 'Unable to login';
        this.logoutSuccessful = 'User logged out successfully';
        this.unableToLogout = 'Unable to logout';

        this.authorizationTokenRequired = 'Authorization token is required';
        this.userNotFound = 'User not found';
        this.invalidOrExpiredToken = 'Invalid or expired token';
        this.unauthorized = 'Unauthorized';
        this.forbidden = 'Forbidden';
        this.accessDenied = 'You do not have permission to access this resource';
        this.authenticatedUserFetched = 'Authenticated user fetched successfully';

        this.contentTitleSubjectFileRequired = 'Title, subject and file are required';
        this.contentUpdatedFieldsRequired = 'At least one field is required to update content';
        this.contentFileRequired = 'File is required';
        this.contentScheduleFieldsRequired = 'Start time and end time are required';
        this.invalidDateFormat = 'Start time and end time must be valid date values';
        this.invalidContentScheduleWindow = 'End time must be later than start time';
        this.invalidRotationDuration = 'Rotation duration must be greater than 0';
        this.invalidContentStatus = 'Status must be uploaded, pending, approved or rejected';
        this.invalidContentId = 'Content id must be a valid positive number';
        this.invalidFileType = 'Only JPG, PNG and GIF files are allowed';
        this.fileTooLarge = 'File size must be 10MB or less';
        this.contentNotFound = 'Content not found';
        this.contentAccessDenied = 'You can access only your own content';
        this.contentDeleteNotAllowed = 'Approved content cannot be deleted';
        this.contentUpdateNotAllowed = 'Approved content cannot be updated';
        this.contentResubmitNotAllowed = 'Only rejected content can be resubmitted';
        this.contentUploadedSuccessfully = 'Content uploaded successfully';
        this.teacherContentsFetchedSuccessfully = 'Teacher contents fetched successfully';
        this.teacherContentFetchedSuccessfully = 'Teacher content fetched successfully';
        this.contentUpdatedSuccessfully = 'Content updated successfully';
        this.contentFileUpdatedSuccessfully = 'Content file updated successfully';
        this.contentDeletedSuccessfully = 'Content deleted successfully';
        this.teacherContentSummaryFetchedSuccessfully = 'Teacher content summary fetched successfully';
        this.contentResubmittedSuccessfully = 'Content resubmitted successfully';
        this.unableToUploadContent = 'Unable to upload content';
        this.unableToFetchTeacherContents = 'Unable to fetch teacher contents';
        this.unableToFetchTeacherContent = 'Unable to fetch teacher content';
        this.unableToUpdateContent = 'Unable to update content';
        this.unableToDeleteContent = 'Unable to delete content';
        this.unableToFetchTeacherContentSummary = 'Unable to fetch teacher content summary';
        this.unableToResubmitContent = 'Unable to resubmit content';
    }
}

export default new Message();
