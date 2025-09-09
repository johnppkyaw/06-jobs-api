const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllJobs = async(req, res) => {
  res.sent('get all jobs')
}

const getJob = async(req, res) => {
  res.sent('get job')
}

const createJob = async(req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job});
}

const updateJob = async(req, res) => {
  res.sent('update job')
}

const deleteJob = async(req, res) => {
  res.sent('delete job')
}

module.exports = {
  getAllJobs,
  getJob, 
  createJob,
  updateJob,
  deleteJob
}
