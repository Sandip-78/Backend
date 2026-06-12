const asyncHandler = (fn) => async (req, res, next) => {
    try {
         fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success : false,
            message : error.message
        })
    }
} 

module.exports = asyncHandler



// const asyncHandler = () => {} 
// const asyncHandler = (fun) => {() => {}}
// const asyncHandler = (fun) => async () => {} it is higher order function


/*
|--------------------------------------------------------------------------
| asyncHandler
|--------------------------------------------------------------------------
|
| Why do we need this?
| -------------------
| Express does not automatically catch errors thrown inside async
| functions.
|
| Without asyncHandler, every controller needs a try-catch block:
|
|    try {
|        const user = await User.findById(id)
|    } catch(error) {
|        next(error)
|    }
|
| Writing try-catch in every controller creates repetitive code.
|
| asyncHandler wraps async controllers and automatically forwards any
| errors to Express error middleware.
|
| Example:
|
|    const getUser = asyncHandler(async (req, res) => {
|        const user = await User.findById(req.params.id)
|        res.json(user)
|    })
|
| If any error occurs, it will automatically call:
|
|    next(error)
|
| Benefits:
|    - Removes repetitive try-catch blocks
|    - Cleaner controllers
|    - Centralized error handling
|    - Easier maintenance
|
*/