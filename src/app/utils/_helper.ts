export const validator = (data: any) => {
    if (!Array.isArray(data.items)) {
        return {isValid:false,message:"Items must be an array"};
    }
    
    return {isValid:true,message:""};

}