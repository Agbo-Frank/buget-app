const { validateRequest, responsHandler, pagingParams } = require("../../utility/helpers.js");
const { Entry } = require("../../models/index.js");
const { StatusCodes } = require("http-status-codes");
const { NotFoundException } = require("../../utility/service-error.js");
const { Op } = require("sequelize");

class Controller {
  async create(req, res, next){
    try {
      validateRequest(req)
      const entry = await Entry.create({ ...req.body, userId: Number(req.user) })

      return responsHandler(res, "Entry added successfully", StatusCodes.CREATED, entry)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next){
    try {
      const entry = await Entry.findByPk(req.params.id)
      if(!entry) throw new NotFoundException("Entry not found")

      await Entry.destroy({ where: { id: req.params.id }})

      return responsHandler(res, "Entry removed successfully", StatusCodes.OK)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next){
    try {
      const entry = await Entry.findByPk(req.params.id)
      if(!entry) throw new NotFoundException("Entry not found")

      await entry.update(req.body)
      await entry.reload()

      return responsHandler(res, "Entry updated successfully", StatusCodes.OK, entry)
    } catch (error) {
      next(error)
    }
  }

  async getEntries(req, res, next){
    try {
      const { offset, page, limit } = pagingParams(req)
      const filters = extractFilters(req.query)
      if(req.role !== 'admin'){
        filters.push({userId: req.user})
      } 

      const { count, rows } = await Entry.findAndCountAll({ where: { [Op.and]: filters }, offset, limit })
      const data = {
        total: count,
        page, data: rows,
        totalPage: Math.ceil(count / limit)
      }

      return responsHandler(res, "User entry retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      next(error)
    }
  }

  async getEntry(req, res, next){
    try {
      const data = await Entry.findOne({ where: { id: req.params.id } })
      if(!data) throw new NotFoundException("Entry not found")

      return responsHandler(res, "Entry retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      next(error)
    }
  }

  async overview(req, res, next){
    try { 
      const filters = [] //{ date: { [Op.gte]: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }}
      if(req.role !== "admin"){
        filters.push({userId: req.user})
      }
      const entries = await Entry.findAll({ where: { [Op.and]: filters } });

      const month_index = new Date().getMonth()
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      const labels = months.splice(0, month_index + 1)

      //initializing datasets 
      const datasets = labels.reduce((acc, month) => {
        acc[month] = { income: 0, expense: 0 }
        return acc
      }, {});

      entries.forEach(entry => {
        const month_index = new Date(entry.date).getMonth()
        const month = labels[month_index];

        if(!month) return;
        if (entry.category === 'income') {
          datasets[month].income += parseFloat(entry.amount);
        } else {
          datasets[month].expense += parseFloat(entry.amount);
        }
      });

      const data = Object.values(datasets)
      const income = data.map(d => d.income);
      const expense = data.map(d => d.expense);

      return responsHandler(
        res, 
        "Entry overview retrieved successfully", 
        StatusCodes.OK, 
        { 
          income, expense, 
          recent_entries: entries.splice(0, 4),
          labels
        }
      )
    } catch (error) {
      next(error)
    }
  }
}

function extractFilters(payload){
  const allowed = ['category', "search"]
  const filters = []
  const entries = Object.entries(payload)

  for(let i = 0; i < entries.length; i ++){
    if(!allowed.includes(entries[i][0])) continue;
    else if(entries[i][0] === "search") {
      filters.push({ description: { [Op.substring]: entries[i][1] }})
    }
    else filters.push( { [entries[i][0]]: entries[i][1] } )
  }

  return filters
}

module.exports = new Controller()