import { Department } from './department';

export class Item {
    constructor(private name: string, private done: boolean, private department: Department) {}
}