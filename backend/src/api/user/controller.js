const { responsHandler, pagingParams } = require("../../utility/helpers.js");
const { StatusCodes } = require("http-status-codes");
const { NotFoundException } = require("../../utility/service-error.js");
const { Op } = require("sequelize");
const { User } = require("../../models/index.js");

class Controller {
  async remove(req, res, next){
    try {
      const user = await User.findByPk(req.params.id)
      if(!user) throw new NotFoundException("User not found")

      await User.destroy({ where: { id: req.params.id }})

      return responsHandler(res, "User removed successfully", StatusCodes.OK)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next){
    try {
      const user = await User.findByPk(req.params.id)
      if(!user) throw new NotFoundException("User not found")

      await User.update(req.body, { where: { id: req.params.id }})

      return responsHandler(res, "User updated successfully", StatusCodes.OK)
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next){
    try {
      const { offset, page, limit } = pagingParams(req)
      const filters = extractFilters(req.query)
      
      const { count, rows } = await User.findAndCountAll({ 
        where: { [Op.and]: filters },
        offset, limit,
        attributes: {exclude: ['password']}
      })

      const data = {
        total: count,
        page, 
        totalPage: Math.ceil(count / limit),
        data: rows
      }

      return responsHandler(res, "Users retrieved successfully", StatusCodes.OK, data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

function extractFilters(payload){
  const allowed = ["search"]
  const filters = []
  const entries = Object.entries(payload)

  for(let i = 0; i < entries.length; i ++){
    if(!allowed.includes(entries[i][0])) continue;
    // else if(entries[i][0] === "search") {
    //   filters.push({ description: { [Op.substring]: entries[i][1] }})
    // }
    else filters.push( { [entries[i][0]]: entries[i][1] } )
  }

  return filters
}

module.exports = new Controller()