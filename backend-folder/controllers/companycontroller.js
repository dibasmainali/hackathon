// backend-folder/controllers/companyController.js
import mongoose from "mongoose";
import { Company } from "../models/Company.model.js";
import { Jobs } from "../models/Jobs.model.js";

const sanitizeCompany = (companyDoc) => {
  if (!companyDoc) return null;
  const company = companyDoc.toObject();
  return company;
};

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const createCompany = async (req, res) => {
  const { name, email, phone, address, industry, description } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Company name and email are required",
    });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingCompany = await Company.findOne({ email: normalizedEmail });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    const company = await Company.create({
      name,
      email: normalizedEmail,
      phone,
      address,
      industry,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      company: sanitizeCompany(company),
    });
  } catch (error) {
    console.error("Error in createCompany:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create company",
      error: error.message,
    });
  }
};

export const getCompanies = async (req, res) => {
  const { industry, search } = req.query;
  const query = {};

  if (industry) {
    query.industry = industry;
  }

  if (search) {
    query.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
      { industry: new RegExp(search, "i") },
    ];
  }

  try {
    const companies = await Company.find(query).populate({
      path: "jobs",
      select: "title status createdAt",
    });

    return res.status(200).json({
      success: true,
      companies: companies.map(sanitizeCompany),
    });
  } catch (error) {
    console.error("Error in getCompanies:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch companies",
      error: error.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid company id",
    });
  }

  try {
    const company = await Company.findById(id).populate({
      path: "jobs",
      select: "title status createdAt",
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company: sanitizeCompany(company),
    });
  } catch (error) {
    console.error("Error in getCompanyById:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch company",
      error: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, industry, description } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid company id",
    });
  }

  try {
    const updates = {
      ...(name && { name }),
      ...(email && { email: email.toLowerCase() }),
      ...(phone && { phone }),
      ...(address && { address }),
      ...(industry && { industry }),
      ...(description && { description }),
    };

    const company = await Company.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate({
      path: "jobs",
      select: "title status createdAt",
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: sanitizeCompany(company),
    });
  } catch (error) {
    console.error("Error in updateCompany:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update company",
      error: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid company id",
    });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const company = await Company.findById(id).session(session);

    if (!company) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    await Jobs.updateMany(
      { companyId: id },
      { $set: { companyId: null, status: "Close" } },
      { session }
    );

    await company.deleteOne({ session });

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error in deleteCompany:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete company",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};