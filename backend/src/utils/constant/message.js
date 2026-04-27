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
        this.rejectionReasonRequired = 'Rejection reason is required';
        this.invalidApprovalStatus = 'Status must be approved or rejected';
        this.contentStatusUpdatedSuccessfully = 'Content status updated successfully';
        this.contentsFetchedSuccessfully = 'Contents fetched successfully';
        this.pendingContentsFetchedSuccessfully = 'Pending contents fetched successfully';
        this.contentSummaryFetchedSuccessfully = 'Content summary fetched successfully';
        this.scheduleFieldsRequired = 'Content id, slot id, rotation order and duration are required';
        this.invalidScheduleId = 'Schedule id must be a valid positive number';
        this.invalidSlotId = 'Slot id must be a valid positive number';
        this.invalidScheduleDuration = 'Schedule duration must be greater than 0';
        this.invalidRotationOrder = 'Rotation order must be greater than 0';
        this.contentMustBeApprovedForSchedule = 'Only approved content can be scheduled';
        this.slotNotFound = 'Content slot not found';
        this.scheduleNotFound = 'Schedule not found';
        this.scheduleUpdateFieldsRequired = 'At least one schedule field is required to update';
        this.scheduleCreatedSuccessfully = 'Schedule created successfully';
        this.schedulesFetchedSuccessfully = 'Schedules fetched successfully';
        this.scheduleFetchedSuccessfully = 'Schedule fetched successfully';
        this.scheduleUpdatedSuccessfully = 'Schedule updated successfully';
        this.scheduleDeletedSuccessfully = 'Schedule deleted successfully';
        this.liveContentFetchedSuccessfully = 'Live content fetched successfully';
        this.noContentAvailable = 'No content available';
        this.unableToUploadContent = 'Unable to upload content';
        this.unableToFetchTeacherContents = 'Unable to fetch teacher contents';
        this.unableToFetchTeacherContent = 'Unable to fetch teacher content';
        this.unableToUpdateContent = 'Unable to update content';
        this.unableToDeleteContent = 'Unable to delete content';
        this.unableToFetchTeacherContentSummary = 'Unable to fetch teacher content summary';
        this.unableToResubmitContent = 'Unable to resubmit content';
        this.unableToUpdateContentStatus = 'Unable to update content status';
        this.unableToFetchContents = 'Unable to fetch contents';
        this.unableToFetchPendingContents = 'Unable to fetch pending contents';
        this.unableToFetchContentSummary = 'Unable to fetch content summary';
        this.unableToCreateSchedule = 'Unable to create schedule';
        this.unableToFetchSchedules = 'Unable to fetch schedules';
        this.unableToFetchSchedule = 'Unable to fetch schedule';
        this.unableToUpdateSchedule = 'Unable to update schedule';
        this.unableToDeleteSchedule = 'Unable to delete schedule';
        this.unableToFetchLiveContent = 'Unable to fetch live content';
    }
}

export default new Message();
