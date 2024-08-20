export class CompareSizeDTO {
    constructor(
      size,
      totalLength,
      shoulderWidth,
      chestWidth,
      armholeWidth,
      sleeveWidth,
      sleeveLength,
      hemWidth
    ) {
      this.size = size;
      this.totalLength = totalLength;
      this.shoulderWidth = shoulderWidth;
      this.chestWidth = chestWidth;
      this.armholeWidth = armholeWidth;
      this.sleeveWidth = sleeveWidth;
      this.sleeveLength = sleeveLength;
      this.hemWidth = hemWidth;
    }
  }
  