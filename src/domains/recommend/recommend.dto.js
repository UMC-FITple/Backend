export const getBodyInfoDTO = (data) => {
    const user = [];
    if(data == -1){
        user.push("해당 유저는 등록되어 있지 않아요.");
    }else{
        for (let i = 0; i < data.length; i++) {
            user.push({
                "user_id": data[i].user[0][0].uuid,
                "nickname": data[i].user[0][0].nickname,
                "user_image": data[i].user[0][0].img_url,
                "height": data[i].user[0][0].height,
                "weight": data[i].user[0][0].weight,
                "prefer_fit": data[i].fit[0].map(fitItem => fitItem.pf_name),
                "prefer_style": data[i].style[0].map(styleItem => styleItem.style_name)
            })
        }
    }
    return {"userData": user};
}