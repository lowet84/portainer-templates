export interface Volume {
    container: string;
    bind: string;
}

export interface Label {
    name: string;
    value: string;
}

export interface Template {
    type: number;
    title: string;
    name: string;
    description: string;
    categories: string[];
    platform: string;
    logo: string;
    image: string;
    network: string;
    volumes: Volume[];
    labels: Label[];
}

export interface TemplateCollection {
    version: string;
    templates: Template[];
}
