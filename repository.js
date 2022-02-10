
class UserRepository {
  constructor() {
    this.connection = require('./models');
  }

  async getOne(id, addSecret = false, addResetDetails = false) {
    try{
      return await this.connection
        .findById(id)
    } catch(error){
      throw error;
    }
  }

  async getOneBy(query, addSecret = false, addResetDetails = false) {
    try {
      return await this.connection
        .findOne(query)
    } catch (error) {
      throw error;
    }
  }

  async persist(answer) {
    try {
      let data;

      if (answer._id) {
        data = await update.bind(this)(answer);
      } else {
        data = await save.bind(this)(answer);
      }

      data.__v = undefined;
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAll(skip = 0, limit = 20) {
    try {
      return await this.connection
        .findWithDeleted()
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    } catch (error) {
      throw error;
    }
  }

  async getAllBy(query, skip = 0, limit = 20) {
    try {
      return await this.connection
        .findWithDeleted(query)
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    } catch (error) {
      throw error;
    }
  }

  async search(searchText, skip = 0, limit = 20) {
    try {
      return await search.bind(this)(searchText, skip, limit);
    } catch (error) {
      throw error;
    }
  }
}

async function save(answer) {
  try {
    const data = await this.connection.create(answer);
    return await this.connection
      .findById(data._id)
  } catch (error) {
    if (error.name && error.name === 'ValidationError') {
      throw {
        status: 400,
        error: error.errors[Object.keys(error.errors)[0]].message,
      };
    }
    throw error;
  }
}

module.exports = UserRepository;
