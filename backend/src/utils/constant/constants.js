class Constants {
    constructor() {
        this.httpStatus = {
            success: 200,
            created: 201,
            accepted: 202,
            unauthorized: 401,
            forbidden: 403,
            serverError: 500,
            noContent: 204,
            notFound: 404,
            badRequest: 400,
            conflict: 409,
            notAllowed: 405,
            serviceUnavailable: 503,
            modified: 302,
        };

        this.roles = {
            principal: 'principal',
            teacher: 'teacher',
        };

        this.contentStatus = {
            uploaded: 'uploaded',
            pending: 'pending',
            approved: 'approved',
            rejected: 'rejected',
        };

        this.token = {
            prefix: 'Bearer',
            expiresIn: '1d',
        };
    }
}

export default new Constants();
