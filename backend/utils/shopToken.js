const sendShopToken=async(shop, statusCode, res)=>{
    //creat a jwt token 
    const token= await shop.getJwtToken(); 
    // option for cookies
    const options={
        expires:new Date(Date.now()+90*24*60*60*1000),
        httpOnly:true, 
        SameSite:"None",
        Secure:true
    }

    res.status(statusCode).cookie("sellerToken", token , options).json({
        sucess:true,
        shop,
        token
    })
}

module.exports=sendShopToken 