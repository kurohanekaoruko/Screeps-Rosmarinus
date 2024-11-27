const Scout = {
    target: function(creep: Creep) {
        if (!creep.memory.targetRoom) {return;}
        creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom));
        return false;
    },
    source: function(creep: Creep) {
        return true;
    }
}

export default Scout;