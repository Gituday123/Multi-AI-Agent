export const login =async(req,res)=>{
    try{

    }catch(error){
        console.error(" Error during login:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}