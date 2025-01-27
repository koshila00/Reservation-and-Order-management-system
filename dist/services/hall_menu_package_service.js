"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallMenuPackageService = void 0;
const HallMenuPackage_1 = require("../entities/HallMenuPackage");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class HallMenuPackageService {
    constructor(hallMenuPackageRepository) {
        this.hallMenuPackageRepository = hallMenuPackageRepository;
    }
    async createHallMenuPackage(createHallMenuPackageDto) {
        var _a, _b, _c;
        const newHallMenuPackage = new HallMenuPackage_1.HallMenuPackage();
        newHallMenuPackage.hallMenuPackageName =
            (_a = createHallMenuPackageDto.hallMenuPackageName) !== null && _a !== void 0 ? _a : "";
        newHallMenuPackage.hallMenuPackagePrice =
            (_b = createHallMenuPackageDto.hallMenuPackagePrice) !== null && _b !== void 0 ? _b : "";
        newHallMenuPackage.hallMenuPackageImage =
            (_c = createHallMenuPackageDto.hallMenuPackageImage) !== null && _c !== void 0 ? _c : "";
        return await this.hallMenuPackageRepository.save(newHallMenuPackage);
    }
    async updateHallMenuPackage(hallMenuPackageId, updateHallMenuPackageDto) {
        try {
            const hallMenuPackage = await this.findHallMenuPackageById(hallMenuPackageId);
            if (!hallMenuPackage) {
                throw new NotFoundError_1.default(`Hall menu package with id ${hallMenuPackageId} not found`);
            }
            Object.assign(hallMenuPackage, updateHallMenuPackageDto);
            return await this.hallMenuPackageRepository.save(hallMenuPackage);
        }
        catch (error) {
            console.error("Error updating hall menu package:", error);
            throw error;
        }
    }
    async findHallMenuPackageById(hallMenuPackageId) {
        const hallMenuPackage = await this.hallMenuPackageRepository.findOne({
            where: { hallMenuPackageId },
        });
        return hallMenuPackage || null;
    }
    async deleteHallMenuPackage(hallMenuPackageId) {
        const hallMenuPackage = await this.findHallMenuPackageById(hallMenuPackageId);
        if (!hallMenuPackage) {
            return false;
        }
        await this.hallMenuPackageRepository.remove(hallMenuPackage);
        return true;
    }
    async getAllHallMenuPackages() {
        const hallMenuPackages = await this.hallMenuPackageRepository.find();
        return hallMenuPackages.map((hallMenuPackage) => ({
            hallMenuPackageId: hallMenuPackage.hallMenuPackageId,
            hallMenuPackageName: hallMenuPackage.hallMenuPackageName,
            hallMenuPackagePrice: hallMenuPackage.hallMenuPackagePrice,
            hallMenuPackageImage: hallMenuPackage.hallMenuPackageImage,
        }));
    }
}
exports.HallMenuPackageService = HallMenuPackageService;
