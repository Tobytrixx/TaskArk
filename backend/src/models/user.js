import mongoose from 'mongoose';
import validator from 'validator';

// Create a user schema
const userSchema = new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: "Full name is required",
        trim: true
      },
      emailAddress: {
        type: String,
        unique: true,
        required: "email address is required",
        trim: true,
        lowercase: true,
        /*validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }
        }*/
      },
      password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes("password")) {
            throw new Error('Password can not contain "password"');
          }
        }
      },
      age: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) {
            throw new Error("Age must be a positive number");
          }
        }
      },
      /*tokens: [
        {
          token: {
            type: String,
            required: true
          }
        }
      ],*/
      /*avatar: {
        type: Buffer
      }*/
    },
    {
      timestamps: true
    }
  );
  
  // Create a user model from the user schema
  const User = mongoose.model("User", userSchema);

  //export user model
  export default User;