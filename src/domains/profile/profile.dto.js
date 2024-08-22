// preview search response DTO
export const getInfoDTO = (userData, fitData, styleData) => {
    const user = [];
    const fit = [];
    const style = [];

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
    return { "userData": user, "fit": fit, "style": style };
}