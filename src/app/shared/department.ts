export class Department {
    constructor(public name: string, public selected: boolean = false) {}

    compare(a: Department, b: Department): Number {
        return 1;
    }
}