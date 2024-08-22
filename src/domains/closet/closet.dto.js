// preview search response DTO
export const previewMyClosetResponseDTO = (data) => {
    
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
                "likes": data[i].likes
            })
        }
    }
    return {"clothData": cloth, "cursorId": data[data.length-1].id};
}

// preview cloth response DTO
export const previewMyClothResponseDTO = (data) => {

    const cloth = [];

    const createCloth = (item, size = {}) => ({
        "cloth_id": item.id,
        "brand": item.brand_name,
        "cloth_name": item.name,
        "product_code": item.product_code,
        "size": item.size,
        "fit": item.fit,
        "color": item.color,
        "URL": item.url,
        "memo": item.memo,
        "length": size.length || null,
        "shoulder": size.shoulder || null,
        "chest": size.chest || null,
        "armhole": size.armhole || null,
        "sleeve": size.sleeve || null,
        "sleeve_length": size.sleeve_length || null,
        "hem": size.hem || null
    });

    if (data.cloth.length === 0) {
        cloth.push("해당 제품은 등록되어 있지 않아요.");
    } else {
        const item = data.cloth[0][0];
        const size = data.size[0][0] || {};
        cloth.push(createCloth(item, size));
    }

    return { "clothData": cloth };
}

// search brand response DTO
export const SearchBrandResponseDTO = (data) => {
    
    const brand = [];

    if(data.length == 0){
        brand.push("해당 브랜드는 등록되어 있지 않아요.");
    }else{
        for (let i = 0; i < data.length; i++) {
            brand.push({
                "brand_id": data[i].id,
                "brand_name": data[i].name,
                "eng_name": data[i].eng_name
            })
        }
    }
    return {"brandData": brand};
}

export const addBrandResponseDTO = (data) => {
    
    const brand = [];
    if(data == -1){
        brand.push("브랜드가 등록되지 않았어요.");
    }else{
        brand.push({
            "brand_id": data[0][0].id,
            "brand_name": data[0][0].name
        })
    }
    return {"brandData": brand};
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