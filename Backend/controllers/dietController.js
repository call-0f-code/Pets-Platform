import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const Diet=async (req, res)=>{
    try{
        const species=req.body.species;
        const breed=req.body.breed;
        const age=req.body.age;
        const weight=req.body.weight;


        if(!species || !breed  || !age || !weight){
            return res.status(400).json({error : "All fields are required"});
            
        }

        const response= await axios.post(
            `${process.env.AI_SERVICE_URL}/diet_plan`,
            {
                species, 
                breed,
                age,
                weight
            }
        );
        res.json({reply : response.data.reply});


    }catch(error){
        console.error(error);
        res.status(500).json({error:"Diet Plan request fails" });
    }

};