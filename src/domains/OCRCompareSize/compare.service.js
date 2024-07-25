import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient({
  keyFilename: '', //키 넣기
});

// 유저 체형 정보 (한 개의 데이터)
const userSize = { length: 50.5, chest: 35.75, sleeve: 12.2, size: 'M' };

// 이미지 경로
let imagePath = '무신사1.png';

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
    const chestDiff = Math.abs(userSize.chest - item.chest);
    const sleeveDiff = Math.abs(userSize.sleeve - item.sleeve);

    // 오차 범위 내에 있는지 확인
    if (lengthDiff === 0 && chestDiff === 0 && sleeveDiff === 0 && userSize.size === item.size) {
      recommendations.push(item);
    }
  });

  return recommendations;
}

// 텍스트에서 측정값을 파싱하는 함수
function parseMeasuredValues(text) {
  const regex = /총장\s*(\d+\.?\d*)\s*cm.*?가슴단면\s*(\d+\.?\d*).*?소매길이\s*(\d+\.?\d*)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push({
      length: parseFloat(match[1]),
      chest: parseFloat(match[2]),
      sleeve: parseFloat(match[3]),
      size: match[4] || null, // 사이즈가 있는 경우
    });
  }

  return matches;
}

// 찾은 체형 정보를 리턴하는 함수
async function detectSizeFromImage(imagePath) {
  try {
    const textResult = await detectText(imagePath);
    console.log('추출된 텍스트:', textResult); // 추출된 텍스트 출력
    const extractedValues = parseMeasuredValues(textResult); // 텍스트에서 측정값 파싱

    const recommendedSizes = findRecommendedSizes(extractedValues);

    if (recommendedSizes.length > 0) {
      console.log('추천 체형 정보:');
      recommendedSizes.forEach(size => {
        console.log(`총장: ${size.length}, 가슴 단면: ${size.chest}, 소매 길이: ${size.sleeve}, 사이즈: ${size.size}`);
      });
    } else {
      console.log('추천할 체형 정보가 없습니다.');
    }
  } catch (error) {
    console.error('오류가 발생했습니다.', error);
  }
}

detectSizeFromImage(imagePath);

