export interface App{
    name: string,
    image: string,
    logo: string,
    description: string,
    categories?: string[],
    storage: string,
    port: number
}
