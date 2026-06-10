class ApiErrors extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

module.exports = {
    ApiErrors
}

/*
|--------------------------------------------------------------------------
| ApiErrors
|--------------------------------------------------------------------------
|
| Why do we need this?
| -------------------
|
| Instead of throwing normal JavaScript errors, we use ApiErrors to send
| structured error information throughout the application.
|
| A normal Error only contains a message:
|
|     throw new Error("User not found")
|
| The error only contains:
|
|     {
|         message: "User not found"
|     }
|
| But in APIs we usually need:
|
|     - HTTP status code (404, 401, 500, etc.)
|     - Error message
|     - Additional validation errors
|     - Success flag
|
| Example:
|
|     throw new ApiErrors(404, "User not found")
|
| Now Express can send:
|
|     {
|         success: false,
|         message: "User not found",
|         statusCode: 404
|     }
|
| Instead of writing:
|
|     return res.status(404).json({
|         success: false,
|         message: "User not found"
|     })
|
| everywhere, you can simply:
|
|     throw new ApiErrors(404, "User not found")
|
| and let the global error handler handle it.
|
| This makes error handling consistent and allows our global error
| middleware to send standardized responses to the frontend.
|
*/