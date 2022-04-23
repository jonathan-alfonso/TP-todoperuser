export class Todos {
    constructor(
        public id: string,
        public description: string,
        public category: string,
        public done: boolean,
        public userId: string
    ) {}
}
