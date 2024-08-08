import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient({
  keyFilename: 'YOUR_KEY_FILE_PATH', // Google Cloud Vision API 키 파일 경로
});

// 유저 체형 정보 (예시 데이터, 실제로는 데이터베이스에서 가져올 수 있음)
const userSize = {
  length: 50.5, // 총장
  shoulderWidth: 15.0, // 어깨너비
  chest: 35.75, // 가슴단면
  armhole: 12.0, // 암홀단면
  sleeve: 12.2, // 소매단면
  sleeveLength: 12.2, // 소매길이
  hem: 35.0, // 밑단단면
  size: 'M', // 사이즈
};

// 이미지에서 텍스트를 추출하는 함수
async function detectText(imagePath) {
  try {
    const [result] = await client.textDetection(imagePath);
    const annotations = result.textAnnotations;
    return annotations.map((annotation) => annotation.description).join(' ');
  } catch (error) {
    console.error('텍스트 추출 중 오류가 발생했습니다.', error);
    throw error;
  }
}

// 추천 체형 정보를 찾는 함수
function findRecommendedSizes(extractedValues) {
  const recommendations = [];

  extractedValues.forEach(item => {
    const lengthDiff = Math.abs(userSize.length - item.length);
    const shoulderDiff = Math.abs(userSize.shoulderWidth - item.shoulderWidth);
    const chestDiff = Math.abs(userSize.chest - item.chest);
    const armholeDiff = Math.abs(userSize.armhole - item.armhole);
    const sleeveDiff = Math.abs(userSize.sleeve - item.sleeve);
    const sleeveLengthDiff = Math.abs(userSize.sleeveLength - item.sleeveLength);
    const hemDiff = Math.abs(userSize.hem - item.hem);

    // 오차 범위 내에 있는지 확인 (0.12의 오차 허용)
    if (
      lengthDiff <= 0.12 &&
      shoulderDiff <= 0.12 &&
      chestDiff <= 0.12 &&
      armholeDiff <= 0.12 &&
      sleeveDiff <= 0.12 &&
      sleeveLengthDiff <= 0.12 &&
      hemDiff <= 0.12 &&
      userSize.size === item.size
    ) {
      recommendations.push(item);
    }
  });

  return recommendations;
}

// 텍스트에서 측정값을 파싱하는 함수
function parseMeasuredValues(text) {
  const regex = /총장\s*(\d+\.?\d*)\s*cm.*?어깨너비\s*(\d+\.?\d*)\s*cm.*?가슴단면\s*(\d+\.?\d*)\s*cm.*?암홀단면\s*(\d+\.?\d*)\s*cm.*?소매단면\s*(\d+\.?\d*)\s*cm.*?소매길이\s*(\d+\.?\d*)\s*cm.*?밑단단면\s*(\d+\.?\d*)\s*cm/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push({
      length: parseFloat(match[1]),
      shoulderWidth: parseFloat(match[2]),
      chest: parseFloat(match[3]),
      armhole: parseFloat(match[4]),
      sleeve: parseFloat(match[5]),
      sleeveLength: parseFloat(match[6]),
      hem: parseFloat(match[7]),
      size: match[8] || null, // 사이즈가 있는 경우
    });
  }

  return matches;
}

// 찾은 체형 정보를 리턴하는 함수
export const detectSizeFromImage = async (imagePath) => {
  try {
    const textResult = await detectText(imagePath);
    console.log('추출된 텍스트:', textResult); // 추출된 텍스트 출력
    const extractedValues = parseMeasuredValues(textResult); // 텍스트에서 측정값 파싱

    const recommendedSizes = findRecommendedSizes(extractedValues); // 추천 사이즈 찾기

    if (recommendedSizes.length > 0) {
      console.log('추천 체형 정보:');
      recommendedSizes.forEach(size => {
        console.log(`총장: ${size.length}, 어깨너비: ${size.shoulderWidth}, 가슴 단면: ${size.chest}, 암홀단면: ${size.armhole}, 소매단면: ${size.sleeve}, 소매길이: ${size.sleeveLength}, 밑단단면: ${size.hem}, 사이즈: ${size.size}`);
      });
      return recommendedSizes; // 추천 사이즈를 반환
    } else {
      console.log('추천할 체형 정보가 없습니다.');
      return []; // 추천 사이즈가 없을 경우 빈 배열 반환
    }
  } catch (error) {
    console.error('오류가 발생했습니다.', error);
    throw error; // 오류 발생 시 다시 던짐
  }
};
