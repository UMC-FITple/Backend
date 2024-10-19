// preview search response DTO
export const previewSearchResponseDTO = (data) => {
    
    const cloth = [];

    if(data.length == 0){
        cloth.push("해당 제품은 등록되어 있지 않아요.");
        return {"clothData": cloth}
    }else{
        for (let i = 0; i < data.length; i++) {
            cloth.push({
                "cloth_id": data[i].id,
                "nickname": data[i].nickname,
                "user_image": data[i].img_url,
                "brand": data[i].brand_name,
                "cloth_name": data[i].name,
                "size": data[i].size,
                "fit": data[i].fit,
                "cloth_image": data[i].cloth_img
            })
        }
    }
    return {"clothData": cloth};
}

// preview cloth response DTO
export const previewClothResponseDTO = (data, userData) => {
    const cloth = [];
    const user = [];
    const fit = [];
    const style = [];

    if(data.length == 0){
        cloth.push("해당 제품은 등록되어 있지 않아요.");
    }else{
        cloth.push({
            "brand": data[0][0].brand_name,
            "cloth_name": data[0][0].name,
            "product_code": data[0][0].product_code,
            "size": data[0][0].size,
            "fit": data[0][0].fit,
            "color": data[0][0].color,
            "URL": data[0][0].url,
            "memo": data[0][0].memo,
            "cloth_image": data[0][0].cloth_img
        })
    }
    if(userData.length == 0){
        user.push("해당 유저는 등록되어 있지 않아요.");
    }else{
        user.push({
            "user_id": userData[0][0][0].uuid,
            "nickname": userData[0][0][0].nickname,
            "user_image": userData[0][0][0].img_url,
            "height": userData[0][0][0].height,
            "weight": userData[0][0][0].weight
        })
        for (let i = 0; i < userData[1][0].length; i++) {
            fit.push(userData[1][0][i].pf_name);
        }
        for (let i = 0; i < userData[2][0].length; i++) {
            style.push(userData[2][0][i].style_name);
        }
    }
    return {"clothData": cloth, "userData": user, "prefer_fit": fit, "prefer_style": style};
}

// search result response DTO
export const SearchResultResponseDTO = (clothData, brandData, userData) => {
    
    const cloth = [];
    const brand = [];
    const user = [];

    if(clothData.length == 0){
        cloth.push("해당 제품은 등록되어 있지 않아요.");
    }else{
        for (let i = 0; i < clothData.length; i++) {
            cloth.push({
                "cloth_id": clothData[i].id,
                "nickname": clothData[i].nickname,
                "user_image": clothData[i].img_url,
                "brand": clothData[i].brand_name,
                "cloth_name": clothData[i].name,
                "size": clothData[i].size,
                "fit": clothData[i].fit,
                "cloth_image": clothData[i].cloth_img,
            })
        }
    }

    if(brandData.length == 0){
        brand.push("해당 브랜드는 등록되어 있지 않아요.");
    }else{
        for (let i = 0; i < brandData.length; i++) {
            brand.push({
                "brand_id": brandData[i].id,
                "brand_name": brandData[i].name,
                "eng_name": brandData[i].eng_name,
                "brand_image": brandData[i].brand_img
            })
        }
    }

    if(userData == -1){
        user.push("해당 유저는 등록되어 있지 않아요.");
    }else{
        for (let i = 0; i < userData.length; i++) {
            user.push({
                "user_id": userData[i].user[0].uuid,
                "nickname": userData[i].user[0].nickname,
                "user_image": userData[i].user[0].img_url,
                "height": userData[i].user[0].height,
                "weight": userData[i].user[0].weight,
                "prefer_fit": userData[i].fit.map(fitItem => fitItem.pf_name),
                "prefer_style": userData[i].style.map(styleItem => styleItem.style_name)
            })
        }
    }
    return { "clothData": cloth, "brandData": brand, "userData": user };

}

// search result response DTO
export const SearchBrandResponseDTO = (brand, clothData) => {
    const cloth = [];

    if(clothData.length == 0){
        cloth.push("해당 제품은 등록되어 있지 않아요.");
    }else{
        for (let i = 0; i < clothData.length; i++) {
            cloth.push({
                "nickname": clothData[i].nickname,
                "user_image": clothData[i].img_url,
                "brand": clothData[i].brand_name,
                "cloth_name": clothData[i].name,
                "size": clothData[i].size,
                "fit": clothData[i].fit,
                "cloth_image": clothData[i].cloth_img,
                "category_id": clothData[i].category_id
            })
        }
    }
    return {"brand_name": brand[0][0].name, "eng_name": brand[0][0].eng_name, "brand_image":brand[0][0].brand_img, "clothData": cloth};
}

export const previewMyClothResponseDTO = (data) => {

    const cloth = [];

    cloth.push({
        "brand": data[0][0].brand_name,
        "cloth_name": data[0][0].name,
        "product_code": data[0][0].product_code,
        "cloth_image": data[0][0].cloth_img,
        "category_id": data[0][0].category_id
    })

    return { "clothData": cloth };
}

export const addClothResponseDTO = (data) => {
    
    const cloth = [];
    if(data.length == 0){
        cloth.push("제품이 등록되지 않았어요.");
    }else{
        cloth.push({
            "cloth_id": data[0][0].id
        })
    }
    return {"clothData": cloth};
}

export const addWishDTO = (wish) => {
    return {"wish_id": wish};
}

export const delWishDTO = (wish) => {
    let wish_id;
    if(wish[0].length == 0){
        wish_id = 0;
    }

    return {"wish_id": wish_id};
}

export const getWishDTO = (wish) => {

    let wish_id;
    if(wish[0].length == 0){
        wish_id = 0;
    } else if(wish[0].length == 1){
        wish_id = wish[0][0].id
    }

    return {"wish_id": wish_id};
}

export const addFollowDTO = (follow) => {
    return {"follow_id": follow};
}

export const delFollowDTO = (follow) => {
    let follow_id;
    if(follow[0].length == 0){
        follow_id = 0;
    }

    return {"follow_id": follow_id};
}

export const getFollowDTO = (follow) => {

    let follow_id;
    if(follow[0].length == 0){
        follow_id = 0;
    } else if(follow[0].length == 1){
        follow_id = follow[0][0].id
    }

    return {"follow_id": follow_id};
}