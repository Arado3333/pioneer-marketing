export class Campaign {
    campId;
    name;
    title;
    textContent;
    image;
    startDate;
    endDate;

    constructor(campId, name, title, content, image, startDate, endDate) {
        this.campId = campId;
        this.name = name;
        this.title = title;
        this.textContent = content;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}


