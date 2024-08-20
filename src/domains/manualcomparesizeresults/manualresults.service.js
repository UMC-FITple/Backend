import { getRealSize, getCompareSizes } from './manualresults.dao.js';
import { createSizeComparisonDto } from './manualresults.dto.js';

const findBestFit = async (userId) => {
    const realSizes = await getRealSize(userId);
    const compareSizes = await getCompareSizes();

    let bestFit = null;
    let smallestDifference = Infinity;

    for (const realSize of realSizes) {
        for (const compareSize of compareSizes) {
            // 오차 계산
            const totalDifference =
                Math.abs(compareSize.total_length - realSize.length) +
                Math.abs(compareSize.shoulder_width - realSize.shoulder) +
                Math.abs(compareSize.chest_width - realSize.chest) +
                Math.abs(compareSize.armhole_width - realSize.armhole) +
                Math.abs(compareSize.sleeve_width - realSize.sleeve) +
                Math.abs(compareSize.sleeve_length - realSize.sleeve_length) +
                Math.abs(compareSize.hem_width - realSize.hem);

            if (totalDifference < smallestDifference) {
                smallestDifference = totalDifference;
                bestFit = createSizeComparisonDto(compareSize);
            }
        }
    }

    return bestFit;
};

export { findBestFit };
