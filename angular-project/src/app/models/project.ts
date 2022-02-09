export class Project{
    constructor(

        public _id: string,
        public name: string,
        public description: string,
        public category: string,
        public year: number,
        public langs: string,
        public youtube: string,
        public github: string,
        public arduino: boolean,
        public imagefront: string,
        public image: string,
        public image2: string,
        public image3: string,
    ){

    }
}