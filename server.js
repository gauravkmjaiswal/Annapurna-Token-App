require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
// const { checkForAuthenticationCookie } = require("./middleware/checkAuthToken");
const { connectToMongoDB } = require("./connect");
const User = require("./Models/userSchema");
const { createTokenForUser, validateToken } = require("./services/authJWT");
const { createHmac } = require("crypto");
const cors = require('cors')
// const communityRoutes = require("./routes/community");
// const memberRoutes = require("./routes/member");
// const roleRoutes = require("./routes/role");
// const userRoutes = require("./routes/user");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// -------------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
 // app.use(checkForAuthenticationCookie("token"));
(async () => {
    try{
        await connectToMongoDB(URL)
        console.log('MongoDB Connected...!')
        app.get("/", (req, res) => {
            res.send("Hi !");
        });
        app.post('/signup',async (req,res)=>{
            const { enrollmentNumber, password, studentType } = req.body;
            try{
                const val = await User.findOne({id:enrollmentNumber})
                if(val){
                    const error = new Error("Enrollment Id already Exists")
                    error.code = 11001
                    throw error;
                }
                const user = await User.create({
                    studentType,
                    id: enrollmentNumber,
                    password,
                });
                const userDetails = { id: user.id,studentType};
                const token = createTokenForUser(userDetails);
                return res.status(200).json({success:'New User Created...'});
            }catch(e){
                console.log(e)
                if(e.code === 11000) 
                    return res.status(404).json({message:"Duplicate Enrollment Number"})
                else if(e.code === 11001)
                    return res.status(404).json({message:"Enrollment Number Already Exists..!"})
            }
        })
        app.post("/signin", async (req, res) => {
            const { enrollmentNumber, password } = req.body;
            try {
                const user = await User.findOne({ id: enrollmentNumber });
                if (!user) {
                    const err = new Error('User not found..')
                    err.code = 11002
                    throw err;
                }
                const userProvidedHash = createHmac("sha256", 'MAJORPROJECT2023').update(password).digest("hex");
                if (user.password !== userProvidedHash) {
                    const err = new Error('Password Incorrect..')
                    err.code = 11003
                    throw err;
                }
                const token = createTokenForUser(user);
                const payload = validateToken(token);
                return res.status(200).cookie("token", token).json({status: true,content: {data: { ...payload },},});
            } catch (error) {
                console.log(error)
                if(error.code === 11002){
                    return res.status(404).json({errors: error.message});
                }else if(error.code === 11003){
                    return res.status(401).json({errors: error.message});
                }
            }
        });
    }catch(e){
        console.log(e)
    }
})();
// -------------------------------------------------------------------------------------------------

// app.use("/v1/auth", userRoutes);
// app.use("/v1/role", roleRoutes);
// app.use("/v1/member", memberRoutes);
// app.use("/v1/community", communityRoutes);
app.listen(PORT, () =>
    console.log(`Server Started at PORT:${PORT}  http://localhost:${PORT}/`),
);

module.exports = app;
