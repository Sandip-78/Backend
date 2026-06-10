class ApiResponse {
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}


/*
|--------------------------------------------------------------------------
| ApiResponse
|--------------------------------------------------------------------------
|
| Why do we need this?
| -------------------
|
| This utility creates a consistent response structure for all successful
| API requests.
|
| Without ApiResponse, every controller might send data differently:
|
|     res.status(200).json({
|         user,
|         success: true,
|         message: "User fetched successfully"
|     })
|
| In another controller:
|
|     res.status(200).json({
|         data: posts,
|         ok: true
|     })
|
| And another:
|
|     res.status(200).json({
|         result: comments
|     })
|
| This creates confusion on the frontend.
|
| Using ApiResponse:
|
|     res.status(200).json(
|         new ApiResponse(
|             200,
|             user,
|             "User fetched successfully"
|         )
|     )
|
| Every API response looks like:
|
|     {
|         statusCode: 200,
|         data: {},
|         message: "User fetched successfully",
|         success: true
|     }
|
| Benefit:
|
| Frontend developers always know the structure:
|
|     response.data.data
|     response.data.message
|     response.data.success
|
| Using ApiResponse ensures every success response follows the same format.
|
| Benefits:
|     - Consistent API responses
|     - Easier frontend integration
|     - Cleaner and maintainable code
|
*/