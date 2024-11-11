interface PowerCreep {
    init(): void;
    PowerEnabled(): boolean;
    transferOPS(): boolean;
    withdrawOPS(): boolean;
    ToRenew(): boolean;
    
    Generate_OPS(): boolean;
    Operate_Factory(): boolean;
    Operate_Spawn(): boolean;
    Operate_Power(): boolean;
    Operate_Extension(): boolean;
    Regen_Source(): boolean;
    Shield(pos: RoomPosition): boolean;
    
}