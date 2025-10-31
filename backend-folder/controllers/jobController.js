// backend-folder/controllers/jobController.js
import mongoose from "mongoose";
import { Jobs } from "../models/Jobs.model.js";
import { Company } from "../models/Company.model.js";

const sanitizeJob = (jobDoc) => {
  if (!jobDoc) return null;
  const job = jobDoc.toObject();
  return job;
};

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const createJob = async (req, res) => {
  const {
    title,
    tags,
    description,
    requirements,
    salaryRange,
    location,
    companyId,
    status = "Open",
  } = req.body;

  if (!title || !companyId) {
    return res.status(400).json({
      success: false,
      message: "Job title and companyId are required",
    });
  }

  if (!isValidObjectId(companyId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid companyId",
    });
  }

  try {
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const job = await Jobs.create({
      title,
      tags: Array.isArray(tags) ? tags : [],
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      salaryRange,
      location,
      companyId,
      status,
    });

    // NOTE: `Company.jobs` is defined as a single ObjectId. If you expect multiple jobs per company,
    // convert it to an array in the schema. For now we just store the latest job id.
    await Company.findByIdAndUpdate(companyId, { jobs: job._id });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: sanitizeJob(job),
    });
  } catch (error) {
    console.error("Error in createJob:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to create job",
      error: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  const { companyId, status, search, tag } = req.query;
  const query = {};

  if (companyId) {
    if (!isValidObjectId(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid companyId",
      });
    }
    query.companyId = companyId;
  }

  if (status) {
    query.status = status;
  }

  if (tag) {
    query.tags = tag;
  }

  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { location: new RegExp(search, "i") },
    ];
  }

  try {
    const jobs = await Jobs.find(query)
      .populate({ path: "companyId", select: "name email industry" })
      .populate({ path: "applicants", select: "name email" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs: jobs.map(sanitizeJob),
    });
  } catch (error) {
    console.error("Error in getJobs:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job id",
    });
  }

  try {
    const job = await Jobs.findById(id)
      .populate({ path: "companyId", select: "name email industry" })
      .populate({ path: "applicants", select: "name email" });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job: sanitizeJob(job),
    });
  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch job",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    tags,
    description,
    requirements,
    salaryRange,
    location,
    status,
    companyId,
  } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job id",
    });
  }

  if (companyId && !isValidObjectId(companyId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid companyId",
    });
  }

  try {
    if (companyId) {
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }
    }

    const updates = {
      ...(title && { title }),
      ...(Array.isArray(tags) && { tags }),
      ...(description && { description }),
      ...(Array.isArray(requirements) && { requirements }),
      ...(salaryRange && { salaryRange }),
      ...(location && { location }),
      ...(status && { status }),
      ...(companyId && { companyId }),
    };

    const job = await Jobs.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "companyId", select: "name email industry" })
      .populate({ path: "applicants", select: "name email" });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (companyId) {
      await Company.findByIdAndUpdate(companyId, { jobs: job._id });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: sanitizeJob(job),
    });
  } catch (error) {
    console.error("Error in updateJob:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update job",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job id",
    });
  }

  try {
    const job = await Jobs.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    if (job.companyId) {
      await Company.updateOne(
        { _id: job.companyId, jobs: job._id },
        { $unset: { jobs: "" } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteJob:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete job",
      error: error.message,
    });
  }
};