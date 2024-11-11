interface Creep {
    takeEnergy(): void;
    boostCreep(boostTypes: string[]): boolean;
    double_move(target: any, color?: string): void;
}