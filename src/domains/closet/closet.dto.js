// preview search response DTO
export const previewMyClosetResponseDTO = (data) => {
    
    const cloth = [];

    if(data.length == 0){
        cloth.push("해당 제품은 등록되어 있지 않아요.");
        return {"clothData": cloth}
    }else{
        for (let i = 0; i < data.length; i++) {
            cloth.push({
                "brand": data[i].brand_name,
                "cloth_name": data[i].name,
                "size": data[i].size,
                "fit": data[i].fit,
                "likes": data[i].likes
            })
        }
    }
    return {"clothData": cloth, "cursorId": data[data.length-1].id};
}

// preview cloth response DTO
export const previewMyClothResponseDTO = (data) => {
    
    const cloth = [];

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
            "memo": data[0][0].memo
        })
    }
    return {"clothData": cloth};
}