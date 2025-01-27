"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallMenuPackageController = void 0;
const http_status_codes_1 = require("http-status-codes");
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const ErrorHandler_1 = __importDefault(require("../utills/error/ErrorHandler"));
const responce_1 = __importDefault(require("../utills/responce"));
const storage_config_1 = __importDefault(require("../config/storage_config"));
const constants_1 = __importDefault(require("../utills/constants"));
class HallMenuPackageController {
    constructor(hallMenuPackageService) {
        this.hallMenuPackageService = hallMenuPackageService;
    }
    async createHallMenuPackage(req, res) {
        const body = req.body;
        let file = req.file;
        try {
            const createHallMenuPackageDto = {
                hallMenuPackageName: body.hallMenuPackageName,
                hallMenuPackagePrice: body.hallMenuPackagePrice,
                hallMenuPackageImage: body.hallMenuPackageImage,
            };
            let uploadedObj = null;
            if (file) {
                uploadedObj = await storage_config_1.default.uploadImageAndGetUri(file, constants_1.default.CLOUDINARY.FILE_NAME + "/Hall_Menu_Package");
            }
            if (uploadedObj != null) {
                createHallMenuPackageDto.hallMenuPackageImage =
                    uploadedObj.uri.toString();
            }
            const createdHallMenuPackage = await this.hallMenuPackageService.createHallMenuPackage(createHallMenuPackageDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Hall menu package created successfully!", createdHallMenuPackage);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async updateHallMenuPackage(req, res) {
        try {
            const hallMenuPackageId = req.params.hallMenuPackageId;
            const updateHallMenuPackageDto = req.body;
            const updatedHallMenuPackage = await this.hallMenuPackageService.updateHallMenuPackage(+hallMenuPackageId, updateHallMenuPackageDto);
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu package updated successfully!", updatedHallMenuPackage);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async deleteHallMenuPackage(req, res) {
        try {
            const hallMenuPackageId = req.params.hallMenuPackageId;
            const deleted = await this.hallMenuPackageService.deleteHallMenuPackage(+hallMenuPackageId);
            if (!deleted) {
                throw new NotFoundError_1.default(`Hall menu package with ID ${hallMenuPackageId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu package deleted successfully!", "");
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getAllHallMenuPackages(req, res) {
        try {
            const hallMenuPackages = await this.hallMenuPackageService.getAllHallMenuPackages();
            if (!hallMenuPackages || hallMenuPackages.length === 0) {
                throw new NotFoundError_1.default("No hall menu packages found!");
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu packages fetched successfully!", hallMenuPackages);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
    async getOneHallMenuPackage(req, res) {
        try {
            const hallMenuPackageId = parseInt(req.params.hallMenuPackageId, 10);
            const hallMenuPackage = await this.hallMenuPackageService.findHallMenuPackageById(hallMenuPackageId);
            if (!hallMenuPackage) {
                throw new NotFoundError_1.default(`Hall menu package with ID ${hallMenuPackageId} not found`);
            }
            return (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Hall menu package retrieved successfully", hallMenuPackage);
        }
        catch (error) {
            ErrorHandler_1.default.handle(res, error);
        }
    }
}
exports.HallMenuPackageController = HallMenuPackageController;
