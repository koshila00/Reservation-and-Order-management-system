"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallTypeService = void 0;
const HallType_1 = require("../entities/HallType");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
class HallTypeService {
    constructor(hallTypeRepository) {
        this.hallTypeRepository = hallTypeRepository;
    }
    async createHallType(createHallTypeDto) {
        var _a, _b, _c;
        const newHallType = new HallType_1.HallType();
        newHallType.hallTypeName = (_a = createHallTypeDto.hallTypeName) !== null && _a !== void 0 ? _a : "";
        newHallType.hallTypeCapacity = (_b = createHallTypeDto.hallTypeCapacity) !== null && _b !== void 0 ? _b : 0;
        newHallType.hallTypePrice = (_c = createHallTypeDto.hallTypePrice) !== null && _c !== void 0 ? _c : 0;
        return await this.hallTypeRepository.save(newHallType);
    }
    async updateHallType(hallTypeId, updateHallTypeDto) {
        try {
            const hallType = await this.findHallTypeById(hallTypeId);
            if (!hallType) {
                throw new NotFoundError_1.default(`Hall type with id ${hallTypeId} not found`);
            }
            Object.assign(hallType, updateHallTypeDto);
            return await this.hallTypeRepository.save(hallType);
        }
        catch (error) {
            console.error("Error updating hall type:", error);
            throw error;
        }
    }
    async findHallTypeById(hallTypeId) {
        const hallType = await this.hallTypeRepository.findOne({
            where: { hallTypeId },
        });
        return hallType || null;
    }
    async deleteHallType(hallTypeId) {
        const hallType = await this.findHallTypeById(hallTypeId);
        if (!hallType) {
            return false;
        }
        await this.hallTypeRepository.remove(hallType);
        return true;
    }
    async getAllHallTypes() {
        const hallTypes = await this.hallTypeRepository.find();
        return hallTypes.map((hallType) => ({
            hallTypeId: hallType.hallTypeId,
            hallTypeName: hallType.hallTypeName,
            hallTypeCapacity: hallType.hallTypeCapacity,
            hallTypePrice: hallType.hallTypePrice,
            createdDate: hallType.createdDate,
            updatedDate: hallType.updatedDate,
        }));
    }
    async getHallTypeById(hallTypeId) {
        const hallType = await this.findHallTypeById(hallTypeId);
        return hallType || null;
    }
}
exports.HallTypeService = HallTypeService;
