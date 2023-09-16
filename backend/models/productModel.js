const mongoose = require('mongoose')

const productSchema = mongoose.Schema(

    {
        name:{
            type: String,
            required : [true, "Please enter a name"]
        },
        quantity:{

            type:Number,
            required : [true, "Please enter a quantity"], 
            default : 1

        },
        words:[{
            type: String,
            
            required : [true, "Please enter a word"],

            default : "Hello"

        }],
        definitions:[{

            type : String,
            required : [true, "Please enter a definition"],
            default : "used as a greeting or to begin a phone conversation."

        }]

    },
    {
        timestamps: true
    }

)

const Product = mongoose.model('Product', productSchema);
module.exports = Product;     