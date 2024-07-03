const { validateRequest, responsHandler } = require("../../utility/helpers.js");
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
      console.log(error)
      next(error)
    }
  }

  async remove(req, res, next){
    try {
      const entry = await Entry.findByPk(req.params.id)
      if(!entry) throw new NotFoundException("Entry not found")

      await Entry.destroy({ where: { id: req.params.id, userId: req.user }})

      return responsHandler(res, "Entry removed successfully", StatusCodes.OK)
    } catch (error) {
      console.log(error)
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
      console.log(error)
      next(error)
    }
  }

  async getEntries(req, res, next){
    try {
      const filters = extractFilters(req.query)
      filters.push({userId: req.user})

      const data = await Entry.findAll({ where: { [Op.and]: filters } })

      return responsHandler(res, "User entry retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async getEntry(req, res, next){
    try {
      const data = await Entry.findOne({ where: { id: req.params.id } })
      if(!data) throw new NotFoundException("Entry not found")

      return responsHandler(res, "Entry retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async overview(_, res, next){
    try {
      const entries = await Entry.findAll({
        where: {
          date: {
            [Op.gte]: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          }
        }
      });

      const datasets = {};

      entries.forEach(entry => {
        const month = dayjs entry.date.toISOString();
        console.log(month)
        if (!datasets[month]) {
          datasets[month] = { income: 0, expense: 0 };
        }
        if (entry.category === 'income') {
          datasets[month].income += parseFloat(entry.amount);
        } else {
          datasets[month].expense += parseFloat(entry.amount);
        }
      });

      console.log(datasets)

      const labels = Object.keys(datasets).sort();
      const income_datasets = labels.map(label => datasets[label].income);
      const expense_datasets = labels.map(label => datasets[label].expense);

      return responsHandler(
        res, 
        "Entry overview retrieved successfully", 
        StatusCodes.OK, 
        { income_datasets, expense_datasets, recent_entries: entries.splice(0, 5) }
      )
    } catch (error) {
      console.log(error)
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