export class Assignment {
    id: string = '';
    title: string = '';
    description: string = '';
    // ...

    constructor(initialData: Partial<Assignment> = {}) {
        // Assign all properties from initialData to this object in one line:
        // Object.assign(this, initialData);

        // Or you can map each property from initialData:
        this.id = initialData?.id ?? this.id;
        this.title = initialData?.title ?? this.title;
        this.description = initialData?.description ?? this.description;
    }

    // Probably here should go some logic for the model if business logic is needed
    // Example with counting each word in the title if some statistics needed
    get titleWordCount(): number {
        return this.title.split(' ').length;
    }
    // ...
}
