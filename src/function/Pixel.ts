/**
 * 搓Pixel
 */
export const GeneratePixel = {
    tickEnd: function () {
        try {
            if(Game.cpu.bucket < 10000) return;
            Game.cpu.generatePixel();
        } catch (e) { };
    }
}
