const { ApiError } = require('../utils/ApiErrors')
const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/user.model.js')
const { uploadOnCloudinary } = require('../utils/cloudinary.js')
const ApiResponse  = require('../utils/ApiResponse.js')

const generateAccessAndRefreshTokens = async (userId) => {
    try{

        const user = User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBefore : false})

        return {accessToken, refreshToken}

    }catch(error){
        throw new ApiError(500,"Something went wrong while generating refresh and access token!")
    }
}

const registerUser = asyncHandler( async (req,res) => {

    // get all data of user
    const {fullname, email, password, username} = req.body;

    // check the empty field
    if([fullname,email,password,username].some((field)=> field?.trim() === "")) { // if any field is empty then some method check and if it is true then throw an error
        throw new ApiError(400, "All Fields are requried!!")
    }

    //check user is already exists or not
    const existedUser = await User.findOne({ $or : [{ username } , { email }]})
    
    if(existedUser){
        throw new ApiError(409, "User with email or username already exist!!")
    }

    // extract the avatar and coveraImage localfile path
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //check avatar image is given or not
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is requried")
    }

    //upload on cloudinary and get response
    const avatarResponse = await uploadOnCloudinary(avatarLocalPath)
    const coverImgaeResponse = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatarResponse){
        throw new ApiError(400, "Avatar file is requried!!")
    }

    const user = await User.create({
        fullname,
        avatar : avatarResponse.url, // this is object so we requried only url
        coverImage : coverImgaeResponse?.url || "", // if it is empty then we keep empty 
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"something went wrong regsitering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User register successfully")
    )
})

const loginUser = asyncHandler(async (req,res) => {

    const {username, email, password} = req.body;

    if(!username || !email){
        throw new ApiError(400,"username or email is requried!")
    }

    const isUser = await User.findOne({ $or : [{username},{email}]})

    if(!isUser){
        throw new ApiError(404,"User is not exists!")
    }

    const isPasswordValid = await isUser.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(404,"Invalid User credentials!")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(isUser._id)

    const loggedInUser = await User.findById(isUser._id).select("-password -refreshToken")

    const options = {
        httpOnly : true, // if we send cookie normal way then any one can modify it but by httpOnly true cookie can change only from server
        secure : true 
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser, accessToken, refreshToken // if user want to store this token locally then he can -> good practice
            },
            "user logged successfully"
        ) 
    )
})

const logOutUser = asyncHandler(async (req,res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logout Successfully"))
})

module.exports = {
    registerUser , loginUser, logOutUser
}