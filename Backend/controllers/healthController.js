import axios from "axios";
import dotenv from "dotenv";
dotenv.config()
export const health=async(req, res)=>{
    try{
        const pet=req.body.pet;
        const breed=req.body.breed;
        const age=req.body.age;

        if(!pet || !breed || !age){
            return res.status(400).json({error: "all field required"});

        }

        const response= await axios.post(
            `${process.env.AI_SERVICE_URL}/healthIn`,
            {
                pet,
                breed,
                age
            }
        );
        res.json({reply: response.data.reply});





    }catch(error){

        console.error(error);
        res.status(500).json({error:"Diet plan request fail"});

    }
};