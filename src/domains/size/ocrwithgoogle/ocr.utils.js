

// export const getTextFromImage = async (imageId) => {
//   // Google Vision API를 사용하여 이미지에서 텍스트 추출
//   const client = new vision.ImageAnnotatorClient();
//   const [result] = await client.textDetection(`${process.env.UPLOAD_DIR}/${imageId}`);
//   const detections = result.textAnnotations;

//   // 추출된 텍스트를 사이즈 정보로 변환
//   return {
//     length: getValueFromText(detections, '총장'),
//     shoulder: getValueFromText(detections, '어깨너비'),
//     chest: getValueFromText(detections, '가슴단면'),
//     armhole: getValueFromText(detections, '암홀단면'),
//     sleeve: getValueFromText(detections, '소매단면'),
//     sleeveLength: getValueFromText(detections, '소매길이'),
//     hem: getValueFromText(detections, '밑단단면'),
//   };
// };

// const getValueFromText = (detections, keyword) => {
//   // 키워드가 포함된 텍스트에서 숫자 값 추출
//   const detection = detections.find((text) => text.description.includes(keyword));
//   if (detection) {
//     const value = parseFloat(detection.description.replace(keyword, '').trim());
//     return isNaN(value) ? null : value;
//   }
//   return null;
// };

import vision from '@google-cloud/vision';
export const parseProductSizeData = (textData) => {
  // 텍스트 데이터를 줄 단위로 분리
  const lines = textData.split('\n');

  // 데이터를 저장할 배열 초기화
  const sizeData = [];

  // 각 줄을 처리하여 데이터 구조 생성
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const [size, length, shoulder, chest, sleeveLength] = line.split(/\s+/);
      sizeData.push({
        size: size,
        length: parseFloat(length),
        shoulder: parseFloat(shoulder),
        chest: parseFloat(chest),
        sleeve_length: parseFloat(sleeveLength)
      });
    }
  }

  return sizeData;
};

// export const getTextFromImage = async (imageId) => {
//   // Google Vision API를 사용하여 이미지에서 텍스트 추출
//   const client = new vision.ImageAnnotatorClient();
//   const [result] = await client.textDetection(`${process.env.UPLOAD_DIR}/${imageId}`);
//   const detections = result.textAnnotations;
//   console.log('Text Detections:', detections);

//   // 추출된 텍스트를 사이즈 정보로 변환
//   return {
//     length: getValueFromText(detections, '총장'),
//     shoulder: getValueFromText(detections, '어깨너비'),
//     chest: getValueFromText(detections, '가슴단면'),
//     armhole: getValueFromText(detections, '암홀단면'),
//     sleeve: getValueFromText(detections, '소매단면'),
//     sleeveLength: getValueFromText(detections, '소매길이'),
//     hem: getValueFromText(detections, '밑단단면'),
//   };
// };

export const getTextFromImage = async (imageId) => {
  try {
    // Google Vision API를 사용하여 이미지에서 텍스트 추출
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(`${process.env.UPLOAD_DIR}/${imageId}`);
    const detections = result.textAnnotations;
    console.log('Text Detections:', detections);

    // 추출된 텍스트를 사이즈 정보로 변환
    return {
      length: getValueFromText(detections, '총장'),
      shoulder: getValueFromText(detections, '어깨너비'),
      chest: getValueFromText(detections, '가슴단면'),
      armhole: getValueFromText(detections, '암홀단면'),
      sleeve: getValueFromText(detections, '소매단면'),
      sleeveLength: getValueFromText(detections, '소매길이'),
      hem: getValueFromText(detections, '밑단단면'),
    };
  } catch (error) {
    console.error('Error in getTextFromImage:', error);
    throw error;
  }
};


// const getValueFromText = (detections, keyword) => {
//   // 키워드가 포함된 텍스트에서 숫자 값 추출
//   const detection = detections.find((text) => text.description.includes(keyword));
//   if (detection) {
//     const value = parseFloat(detection.description.replace(keyword, '').trim());
//     return isNaN(value) ? null : value;
//   }
//   return null;
// };
const getValueFromText = (detections, keyword) => {
  try {
    // 키워드가 포함된 텍스트에서 숫자 값 추출
    const detection = detections.find((text) => text.description.includes(keyword));
    if (detection) {
      const value = parseFloat(detection.description.replace(keyword, '').trim());
      console.log(`Keyword "${keyword}": ${detection.description}`);
      return isNaN(value) ? null : value;
    }
    console.log(`Keyword "${keyword}" not found.`);
    return null;
  } catch (error) {
    console.error('Error in getValueFromText:', error);
    throw error;
  }
};
