export default class BaseFunction extends PowerCreep {
    PowerEnabled(): boolean {
        const controller = this.room?.controller;
        if(controller?.my && !controller.isPowerEnabled) {
            if(this.pos.isNearTo(controller)) this.enableRoom(controller);
            else this.moveTo(controller)
            return true;
        }
        return false
    }
    transferOPS(): boolean {
        if (this.store.getFreeCapacity(RESOURCE_OPS) === 0 && this.store[RESOURCE_OPS] > 0) {
            const halfOps = Math.floor(this.store[RESOURCE_OPS] / 2);
            if (this.pos.isNearTo(this.room.storage)) {
                this.transfer(this.room.storage, RESOURCE_OPS, halfOps);
            } else {
                this.moveTo(this.room.storage);
            }
            return true;
        }
        if(this.ticksToLive < 50 && this.store[RESOURCE_OPS] > 0) {
            if (this.pos.isNearTo(this.room.storage)) {
                this.transfer(this.room.storage, RESOURCE_OPS);
            } else {
                this.moveTo(this.room.storage);
            }
        }
        return false;
    }
    withdrawOPS(): boolean {
        if(this.store[RESOURCE_OPS] < 200 && 
            (this.room.storage?.store[RESOURCE_OPS] > 200 || this.room.terminal?.store[RESOURCE_OPS] > 200)) {
            const target = this.room.storage?.store[RESOURCE_OPS] > 200 ? this.room.storage : this.room.terminal;
            if(this.pos.isNearTo(target)) {
                this.withdraw(target, RESOURCE_OPS, 200 - this.store[RESOURCE_OPS]);
            } else {
                this.moveTo(target);
            }
            return true;
        }
        return false
    }
    ToRenew(): boolean {
        if(this.ticksToLive > 300) return false;
        if(this.room.controller?.my && this.room.powerSpawn) {
            const powerSpawn = this.room.powerSpawn;
            if(this.pos.isNearTo(powerSpawn)) {
                this.renew(powerSpawn);
            } else {
                this.moveTo(powerSpawn);
            }
            return true;
        }
        if(!(/^[EW]\d*[1-9][NS]\d*[1-9]$/.test(this.room.name))) {
            const powerBank = this.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_POWER_BANK})[0] as StructurePowerBank;
            if(this.pos.isNearTo(powerBank)) {
                this.renew(powerBank);
            } else {
                this.moveTo(powerBank);
            }
            return true;
        }
        return false;
    }
}