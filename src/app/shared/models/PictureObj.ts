export class Picture{
    userId: number;
    pictureName: string;
    base64: string;
    timestamp: Date;


    constructor(ID: number, Name: string, base: string, Time: Date){
        this.userId = ID;
        this.pictureName = Name;
        this.base64 = base
        this.timestamp = Time;
    }
}