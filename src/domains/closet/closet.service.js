import { addClothResponseDTO } from "./closet.dto.js";
import { clothAdd, getAddCloth } from "./closet.dao.js";

export const addMyCloth = async (userId, body) => {
    console.log("서비스 도착");
    const clothData = await clothAdd({
        'uuid': userId,
        'brand': body.brand,
        'name': body.name,
        'product_code': body.product_code,
        'category': body.category,
        'size': body.size,
        'fit': body.fit,
        'color': body.color,
        'url': body.url,
        'rating': body.rating,
        'memo': body.memo
    });
    console.log("옷 삽입");
    return addClothResponseDTO(await getAddCloth(clothData));
}