export class Banner {
  heading;
  subHeading;
  ctaText;
  bgPicture;
  bgColor;
  width;
  height;
  font;

  constructor(heading, subHeading, ctaText, bgPicture, bgColor, width, height, font) {
    this.heading = heading;
    this.subHeading = subHeading;
    this.ctaText = ctaText;
    this.bgPicture = bgPicture;
    this.bgColor = bgColor;
    this.width = width;
    this.height = height;
    this.font = font;
  }
}
