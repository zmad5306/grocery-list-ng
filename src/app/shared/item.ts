import { Department } from './department';

export class Item {
    constructor(public name: string, public done: boolean, public department: Department) {}
}