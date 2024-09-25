export const getInfoDTO = (userData, fitData, styleData, followData) => {
    const user = [];
    const fit = [];
    const style = [];
    const follower = followData.follower[0][0]['count(*)'];
    const following = followData.following[0][0]['count(*)'];

    if(userData == -1){
        user.push("해당 유저는 등록되어 있지 않아요.");
    }else{
        user.push({
            "user_id": userData[0][0].uuid,
            "nickname": userData[0][0].nickname,
            "user_image": userData[0][0].img_url,
            "one_line_info": userData[0][0].one_line_info,
            "height": userData[0][0].height,
            "weight": userData[0][0].weight
        })
    }
    for (let i = 0; i < fitData[0].length; i++) {
        fit.push(fitData[0][i].pf_name);
    }
    for (let i = 0; i < styleData[0].length; i++) {
        style.push(styleData[0][i].style_name);
    }
    return { "userData": user, "fit": fit, "style": style, "follower": follower, "following": following };
}

export const getMyFitDTO = (data) => {
    const cloth = [];
    if(data.length == 0){
        cloth.push("해당 제품은 등록되어 있지 않아요.");
        return {"clothData": cloth}
    }else{
        for (let i = 0; i < data.length; i++) {
            cloth.push({
                "cloth_id": data[i].id,
                "brand": data[i].brand_name,
                "cloth_name": data[i].name,
                "size": data[i].size,
                "fit": data[i].fit,
                "likes": data[i].likes,
                "cloth_image": data[i].cloth_img
            })
        }
    }
    return {"clothData": cloth};
}

export const getWishDTO = (data) => {
    const cloth = [];
    if(data.length == 0){
        cloth.push("해당 제품은 등록되어 있지 않아요.");
        return {"clothData": cloth}
    }else{
        for (let i = 0; i < data.length; i++) {
            cloth.push({
                "user_id": data[i].uuid,
                "nickname": data[i].nickname,
                "user_image": data[i].img_url,
                "cloth_id": data[i].id,
                "brand": data[i].brand_name,
                "cloth_name": data[i].name,
                "size": data[i].size,
                "fit": data[i].fit,
                "likes": data[i].likes,
                "cloth_image": data[i].cloth_img
            })
        }
    }
    return {"clothData": cloth};
}

export const getBodyInfoDTO = (data) => {

    return {"height": data[0][0].height, "weight": data[0][0].weight, "shoulder_width": data[0][0].shoulder_width, "chest_circumference": data[0][0].chest_circumference, 
        "arm_length": data[0][0].arm_length, "waist_circumference": data[0][0].waist_circumference, "thigh_circumference": data[0][0].thigh_circumference, "hip_circumference": data[0][0].hip_circumference};
}

export const getSetUpDTO = (userData, fitData, styleData) => {
    const user = [];
    const fit = [];
    const style = [];

    if(userData == -1){
        user.push("해당 유저는 등록되어 있지 않아요.");
    }else{
        user.push({
            "user_image": userData[0][0].img_url,
            "nickname": userData[0][0].nickname,
            "gender": userData[0][0].gender,
            "one_line_info": userData[0][0].one_line_info,
            "email": userData[0][0].email
        })
    }
    for (let i = 0; i < fitData[0].length; i++) {
        fit.push(fitData[0][i].pf_name);
    }
    for (let i = 0; i < styleData[0].length; i++) {
        style.push(styleData[0][i].style_name);
    }
    return { "userData": user, "fit": fit, "style": style };
}