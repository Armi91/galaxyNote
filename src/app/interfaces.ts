export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    agreement: boolean;
    scanned: {
        design: boolean;
        efficiency: boolean;
        camera: boolean;
        spen: boolean;
    };
}
